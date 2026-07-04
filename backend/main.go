package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strings"
)

func main() {
	// Load basic .env if present (do not override already set env vars)
	loadDotEnv(".env")

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(200)
		w.Write([]byte("ok"))
	})

	http.HandleFunc("/movies", moviesHandler)

	http.HandleFunc("/webhook/auth", authWebhookHandler)

	log.Printf("listening on :%s", port)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%s", port), nil))
}

// authWebhookHandler accepts a Supabase Auth webhook payload and inserts a row into
// the `user_logins` table using the Supabase REST API and SERVICE ROLE key.
func authWebhookHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Optional webhook secret validation: set `WEBHOOK_SECRET` in backend/.env
	// and include the same value in the `x-webhook-secret` header on the Supabase
	// webhook configuration. This prevents unauthenticated inserts.
	expected := os.Getenv("WEBHOOK_SECRET")
	if expected != "" {
		got := r.Header.Get("x-webhook-secret")
		if got == "" || got != expected {
			http.Error(w, "forbidden", http.StatusForbidden)
			return
		}
	}

	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "bad request", http.StatusBadRequest)
		return
	}

	var payload map[string]any
	if err := json.Unmarshal(body, &payload); err != nil {
		http.Error(w, "invalid json", http.StatusBadRequest)
		return
	}

	// Extract fields we care about. Supabase webhook shapes can vary; be defensive.
	var authUserID string
	if u, ok := payload["user"].(map[string]any); ok {
		if idv, ok := u["id"].(string); ok {
			authUserID = idv
		}
	}

	var provider string
	if p, ok := payload["provider"].(string); ok && p != "" {
		provider = p
	} else if id, ok := payload["identity"].(map[string]any); ok {
		if pv, ok := id["provider"].(string); ok {
			provider = pv
		}
	}

	ip := r.Header.Get("x-forwarded-for")
	if ip == "" {
		// strip port if present
		ip = strings.Split(r.RemoteAddr, ":")[0]
	}
	ua := r.Header.Get("user-agent")

	// Build insert payload
	insert := map[string]any{
		"auth_user_id": authUserID,
		"provider":     provider,
		"ip":           ip,
		"user_agent":   ua,
		"metadata":     payload,
	}

	insertBody, err := json.Marshal(insert)
	if err != nil {
		http.Error(w, "server error", http.StatusInternalServerError)
		return
	}

	supabaseURL := os.Getenv("SUPABASE_URL")
	if supabaseURL == "" {
		http.Error(w, "supabase url not configured", http.StatusInternalServerError)
		return
	}
	// Ensure URL ends with / if not present
	if !strings.HasSuffix(supabaseURL, "/") {
		supabaseURL += "/"
	}

	serviceKey := os.Getenv("SUPABASE_SERVICE_ROLE_KEY")
	if serviceKey == "" {
		http.Error(w, "service role key not configured", http.StatusInternalServerError)
		return
	}

	endpoint := supabaseURL + "user_logins"
	req, err := http.NewRequest(http.MethodPost, endpoint, bytes.NewReader(insertBody))
	if err != nil {
		http.Error(w, "server error", http.StatusInternalServerError)
		return
	}
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("apikey", serviceKey)
	req.Header.Set("Authorization", "Bearer "+serviceKey)

	client := http.DefaultClient
	resp, err := client.Do(req)
	if err != nil {
		log.Printf("error inserting login: %v", err)
		http.Error(w, "upstream error", http.StatusBadGateway)
		return
	}
	defer resp.Body.Close()

	respBody, _ := io.ReadAll(resp.Body)
	if resp.StatusCode >= 400 {
		log.Printf("supabase insert failed: status=%d body=%s", resp.StatusCode, string(respBody))
		http.Error(w, "upstream error", http.StatusBadGateway)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("ok"))
}

// moviesHandler proxies a simple GET to the Supabase `movies` table and returns JSON.
func moviesHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodOptions {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		w.WriteHeader(http.StatusNoContent)
		return
	}

	if r.Method != http.MethodGet {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	supabaseURL := os.Getenv("SUPABASE_URL")
	if supabaseURL == "" {
		http.Error(w, "supabase url not configured", http.StatusInternalServerError)
		return
	}
	if !strings.HasSuffix(supabaseURL, "/") {
		supabaseURL += "/"
	}

	serviceKey := os.Getenv("SUPABASE_SERVICE_ROLE_KEY")
	if serviceKey == "" {
		http.Error(w, "service role key not configured", http.StatusInternalServerError)
		return
	}

	// Build the REST endpoint for movies. Query params can be forwarded if needed.
	endpoint := supabaseURL + "movies?select=*"

	req, err := http.NewRequest(http.MethodGet, endpoint, nil)
	if err != nil {
		http.Error(w, "server error", http.StatusInternalServerError)
		return
	}
	req.Header.Set("apikey", serviceKey)
	req.Header.Set("Authorization", "Bearer "+serviceKey)

	client := http.DefaultClient
	resp, err := client.Do(req)
	if err != nil {
		http.Error(w, "upstream error", http.StatusBadGateway)
		return
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		http.Error(w, "upstream read error", http.StatusBadGateway)
		return
	}

	// Forward CORS for dev convenience
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(resp.StatusCode)
	w.Write(body)
}

// loadDotEnv loads KEY=VALUE lines from file into environment if not already set.
func loadDotEnv(path string) {
	b, err := os.ReadFile(path)
	if err != nil {
		return
	}
	for _, line := range strings.Split(string(b), "\n") {
		line = strings.TrimSpace(line)
		if line == "" || strings.HasPrefix(line, "#") {
			continue
		}
		parts := strings.SplitN(line, "=", 2)
		if len(parts) != 2 {
			continue
		}
		k := strings.TrimSpace(parts[0])
		v := strings.TrimSpace(parts[1])
		// strip quotes
		v = strings.Trim(v, "\"'")
		if os.Getenv(k) == "" {
			os.Setenv(k, v)
		}
	}
}

