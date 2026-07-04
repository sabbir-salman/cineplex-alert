<script lang="ts">
  const { onPrevious, onNext } = $props<{
    onPrevious: () => void;
    onNext: () => void;
  }>();
</script>

<div class="movie-navigation">
  <button type="button" onclick={onPrevious} aria-label="Previous movie">Prev</button>
  <button type="button" onclick={onNext} aria-label="Next movie">Next</button>
</div>

<style>
  .movie-navigation {
    display: flex;
    gap: 1rem;
    justify-content: center;
    align-items: center;
  }

  button {
    min-width: 120px;
    padding: 0.9rem 1.25rem;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.14);
    background: rgba(15, 23, 42, 0.78);
    color: #f8fafc;
    font-weight: 700;
    cursor: pointer;
    transition: transform 0.2s ease, background 0.2s ease;
  }

  button:hover {
    background: rgba(255, 255, 255, 0.12);
    transform: translateY(-1px);
  }
</style>
