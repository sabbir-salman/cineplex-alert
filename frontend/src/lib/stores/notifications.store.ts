import { writable } from "svelte/store";

type NotificationRequest = {
  movieId: string;
  title: string;
  createdAt: string;
};

const stored =
  typeof localStorage !== "undefined"
    ? localStorage.getItem("cine_notifications")
    : null;
const initial: NotificationRequest[] = stored ? JSON.parse(stored) : [];

export const notifications = writable<NotificationRequest[]>(initial);

notifications.subscribe((val) => {
  if (typeof localStorage !== "undefined")
    localStorage.setItem("cine_notifications", JSON.stringify(val));
});

export function addNotification(req: NotificationRequest) {
  notifications.update((s) => [req, ...s]);
}
