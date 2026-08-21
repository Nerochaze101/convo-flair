import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Bell } from "lucide-react";

import { notifications } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/notifications")({
  component: NotificationsPage,
  head: () => ({
    meta: [
      { title: "Notifications — AutoAgent Inbox Alerts" },
      {
        name: "description",
        content:
          "Review every AutoAgent alert: new qualified leads, booked appointments, human takeover requests and usage warnings.",
      },
      { property: "og:title", content: "Notifications — AutoAgent Inbox Alerts" },
      {
        property: "og:description",
        content: "All your AutoAgent alerts in one full-page feed.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

function NotificationsPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-6">
      <div className="mb-5 flex items-center gap-3">
        <Link
          to="/dashboard"
          className="flex size-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Back to dashboard"
        >
          <ArrowLeft className="size-4" />
        </Link>
        <h1 className="text-lg font-semibold">Notifications</h1>
      </div>

      <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border">
        {notifications.map((n) => (
          <li key={n.title} className="flex gap-3 bg-card p-4">
            <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-muted-foreground">
              <Bell className="size-4" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-medium">{n.title}</p>
              <p className="text-sm text-muted-foreground">{n.body}</p>
              <p className="mt-1 text-[11px] text-muted-foreground">{n.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
