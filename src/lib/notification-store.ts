import { useSyncExternalStore } from "react";

export type AppNotification = {
  id: string;
  title: string;
  body: string;
  time: string;
  /** Route to open when the notification is tapped */
  to: string;
  /** Conversation to focus when the target is the inbox */
  threadId?: string;
  read: boolean;
};

const seed: AppNotification[] = [
  {
    id: "n1",
    title: "New qualified lead",
    body: "Emeka Nwosu asked for bulk pricing on WhatsApp.",
    time: "2m ago",
    to: "/dashboard/inbox",
    threadId: "c2",
    read: false,
  },
  {
    id: "n2",
    title: "Appointment booked",
    body: "Tuesday 2:00 PM fitting with Sarah Okonkwo.",
    time: "18m ago",
    to: "/dashboard/inbox",
    threadId: "c1",
    read: false,
  },
  {
    id: "n3",
    title: "Human takeover requested",
    body: "Daniel Ajayi's TikTok thread needs an agent.",
    time: "1h ago",
    to: "/dashboard/inbox",
    threadId: "c4",
    read: false,
  },
  {
    id: "n4",
    title: "Usage at 74%",
    body: "1,840 of 2,500 DMs used this billing cycle.",
    time: "5h ago",
    to: "/dashboard/billing",
    read: true,
  },
];

let state: AppNotification[] = seed;
const listeners = new Set<() => void>();

const emit = () => listeners.forEach((l) => l());

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export const getNotifications = () => state;

export const markNotificationRead = (id: string) => {
  if (!state.some((n) => n.id === id && !n.read)) return;
  state = state.map((n) => (n.id === id ? { ...n, read: true } : n));
  emit();
};

export const markNotificationUnread = (id: string) => {
  state = state.map((n) => (n.id === id ? { ...n, read: false } : n));
  emit();
};

export const markAllNotificationsRead = () => {
  state = state.map((n) => (n.read ? n : { ...n, read: true }));
  emit();
};

export function useNotifications() {
  return useSyncExternalStore(subscribe, getNotifications, getNotifications);
}

export function useUnreadNotificationCount() {
  return useNotifications().filter((n) => !n.read).length;
}
