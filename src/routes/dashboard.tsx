import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import {
  BarChart3,
  Bell,
  Brain,
  CalendarDays,
  CreditCard,
  Inbox,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Plug,
  Search,
  Settings,
  Sparkles,
  Users,
} from "lucide-react";

import { BrandLogo, StatusPill } from "@/components/brand";
import { TestAgentModal } from "@/components/test-agent-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { markNotificationRead, useNotifications } from "@/lib/notification-store";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/dashboard/inbox", label: "Inbox", icon: Inbox },
  { to: "/dashboard/leads", label: "Leads", icon: Users },
  { to: "/dashboard/calendar", label: "Calendar", icon: CalendarDays },
  { to: "/dashboard/ai-brain", label: "AI Brain", icon: Brain },
  { to: "/dashboard/integrations", label: "Integrations", icon: Plug },
  { to: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/dashboard/billing", label: "Billing", icon: CreditCard },
  { to: "/dashboard/settings", label: "Settings", icon: Settings },
] as const;

export const Route = createFileRoute("/dashboard")({
  component: DashboardLayout,
});

function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const notifications = useNotifications();
  const unreadNotifications = notifications.filter((n) => !n.read).length;
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const title = nav.find((n) => pathname.startsWith(n.to))?.label ?? "Dashboard";

  return (
    <div className="flex min-h-screen">
      <aside
        className={cn(
          "sticky top-0 hidden h-screen shrink-0 flex-col border-r border-sidebar-border bg-sidebar transition-[width] duration-200 lg:flex",
          collapsed ? "w-[76px]" : "w-64",
        )}
      >
        <div className={cn("flex h-14 items-center border-b border-sidebar-border px-4", collapsed && "justify-center px-0")}>
          <BrandLogo compact={collapsed} />
        </div>
        <SidebarNav collapsed={collapsed} />
        <div className="border-t border-sidebar-border p-3">
          <div className={cn("flex items-center gap-2.5 rounded-xl bg-secondary/60 p-2", collapsed && "justify-center")}>
            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary/20 text-xs font-semibold text-foreground">
              LB
            </span>
            {!collapsed && (
              <span className="min-w-0">
                <span className="block truncate text-xs font-medium">@lagos_boutique</span>
                <span className="block truncate text-[11px] text-muted-foreground">Growth Plan</span>
              </span>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className={cn("mt-2 w-full justify-start text-muted-foreground", collapsed && "justify-center px-0")}
            onClick={() => setCollapsed((c) => !c)}
          >
            {collapsed ? <PanelLeftOpen className="size-4" /> : <PanelLeftClose className="size-4" />}
            {!collapsed && "Collapse"}
          </Button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-background/85 px-4 backdrop-blur-xl">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open navigation">
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 border-sidebar-border bg-sidebar p-0">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <div className="flex h-14 items-center border-b border-sidebar-border px-4">
                <BrandLogo />
              </div>
              <SidebarNav collapsed={false} />
            </SheetContent>
          </Sheet>

          <h1 className="truncate text-sm font-semibold">{title}</h1>

          <div className="relative ml-auto hidden max-w-xs flex-1 md:block">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search conversations, leads…" className="h-9 pl-9" />
          </div>

          <StatusPill className="hidden sm:inline-flex">System Operational</StatusPill>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
                <Bell className="size-4" />
                {unreadNotifications > 0 && (
                  <span className="absolute top-1 right-1 grid min-w-4 place-items-center rounded-full bg-accent px-1 text-[10px] font-semibold text-accent-foreground">
                    {unreadNotifications}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications.map((n) => (
                <DropdownMenuItem
                  key={n.id}
                  asChild
                  className={cn("flex-col items-start gap-0.5 py-2.5", !n.read && "bg-primary/5")}
                >
                  <Link
                    to={n.to}
                    search={
                      n.threadId
                        ? { thread: n.threadId, from: "notifications" as const, filter: "all" as const }
                        : undefined
                    }
                    onClick={() => markNotificationRead(n.id)}
                  >
                    <span className="flex w-full items-center gap-2 text-xs font-medium">
                      {n.title}
                      {!n.read && <span className="ml-auto size-2 rounded-full bg-primary" />}
                    </span>
                    <span className="text-[11px] text-muted-foreground">{n.body}</span>
                    <span className="text-[10px] text-muted-foreground">{n.time}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="justify-center py-2 text-xs font-medium">
                <Link to="/dashboard/notifications">View all notifications</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <TestAgentModal>
            <Button size="sm" className="hidden sm:inline-flex">
              <Sparkles className="size-4" /> Test AI Agent
            </Button>
          </TestAgentModal>
        </header>

        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function SidebarNav({ collapsed }: { collapsed: boolean }) {
  return (
    <nav className="flex-1 space-y-1 overflow-y-auto p-3">
      {nav.map((n) => (
        <Link
          key={n.to}
          to={n.to}
          title={n.label}
          activeProps={{ className: "bg-primary/15 text-foreground border-primary/40" }}
          className={cn(
            "flex items-center gap-3 rounded-xl border border-transparent px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary/70 hover:text-foreground",
            collapsed && "justify-center px-0",
          )}
        >
          <n.icon className="size-4 shrink-0" />
          {!collapsed && n.label}
        </Link>
      ))}
    </nav>
  );
}
