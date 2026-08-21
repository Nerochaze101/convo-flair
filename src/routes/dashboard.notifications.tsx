import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Bell, CheckCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  markAllNotificationsRead,
  markNotificationRead,
  useNotifications,
} from "@/lib/notification-store";
import { cn } from "@/lib/utils";

type NotifFilter = "all" | "unread";

export const Route = createFileRoute("/dashboard/notifications")({
  validateSearch: (search: Record<string, unknown>): { filter?: NotifFilter } =>
    search["filter"] === "unread" ? { filter: "unread" } : {},
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
  const { filter = "all" } = Route.useSearch();
  const navigate = useNavigate();
  const notifications = useNotifications();

  const shown = notifications.filter((n) => (filter === "unread" ? !n.read : true));
  const unread = notifications.filter((n) => !n.read).length;

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
        {unread > 0 && (
          <span className="rounded-full bg-primary px-2 py-0.5 text-[11px] font-semibold text-primary-foreground">
            {unread} new
          </span>
        )}
        <Button
          variant="ghost"
          size="sm"
          className="ml-auto text-xs"
          onClick={markAllNotificationsRead}
          disabled={unread === 0}
        >
          <CheckCheck className="size-4" />
          Mark all read
        </Button>
      </div>

      <Tabs
        value={filter}
        onValueChange={(v) =>
          navigate({
            to: "/dashboard/notifications",
            search: v === "unread" ? { filter: "unread" as const } : {},
          })
        }
        className="mb-4"
      >
        <TabsList>
          <TabsTrigger value="all" className="text-xs">
            All
          </TabsTrigger>
          <TabsTrigger value="unread" className="text-xs">
            Unread{unread > 0 ? ` (${unread})` : ""}
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border">
        {shown.map((n) => (
          <li key={n.id}>
            <Link
              to={n.to}
              search={
                n.threadId
                  ? { thread: n.threadId, from: "notifications" as const, filter }
                  : undefined
              }
              onClick={() => markNotificationRead(n.id)}
              className={cn(
                "flex gap-3 p-4 transition-colors hover:bg-secondary/60",
                n.read ? "bg-card" : "bg-primary/5",
              )}
            >
              <span
                className={cn(
                  "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full",
                  n.read ? "bg-secondary text-muted-foreground" : "bg-primary/20 text-primary",
                )}
              >
                <Bell className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className={cn("text-sm", n.read ? "font-medium" : "font-semibold")}>{n.title}</p>
                <p className="text-sm text-muted-foreground">{n.body}</p>
                <p className="mt-1 text-[11px] text-muted-foreground">{n.time}</p>
              </div>
              {!n.read && <span className="mt-2 size-2 shrink-0 rounded-full bg-primary" />}
            </Link>
          </li>
        ))}
        {shown.length === 0 && (
          <li className="p-10 text-center text-sm text-muted-foreground">
            You're all caught up — no unread notifications.
          </li>
        )}
      </ul>
    </div>
  );
}
