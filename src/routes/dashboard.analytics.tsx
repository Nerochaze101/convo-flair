import { createFileRoute } from "@tanstack/react-router";
import { MessageSquare, Users, CalendarCheck, Timer, TrendingUp } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { StatusPill } from "@/components/brand";

const traffic = [
  { day: "Mon", conversations: 182, leads: 41 },
  { day: "Tue", conversations: 214, leads: 55 },
  { day: "Wed", conversations: 268, leads: 62 },
  { day: "Thu", conversations: 241, leads: 58 },
  { day: "Fri", conversations: 312, leads: 77 },
  { day: "Sat", conversations: 356, leads: 92 },
  { day: "Sun", conversations: 198, leads: 44 },
];

const byChannel = [
  { name: "Instagram", value: 612, fill: "var(--color-brand-instagram)" },
  { name: "WhatsApp", value: 738, fill: "var(--color-brand-whatsapp)" },
  { name: "TikTok", value: 264, fill: "var(--color-brand-tiktok)" },
  { name: "Website", value: 197, fill: "var(--color-brand-web)" },
  { name: "Email", value: 160, fill: "var(--color-brand-email)" },
];

const intents = [
  { intent: "Pricing", count: 486 },
  { intent: "Availability", count: 372 },
  { intent: "Delivery", count: 298 },
  { intent: "Booking", count: 254 },
  { intent: "Complaints", count: 88 },
];

const kpis = [
  { label: "Conversations", value: "1,971", delta: "+18.4%", icon: MessageSquare },
  { label: "Leads captured", value: "429", delta: "+12.1%", icon: Users },
  { label: "Appointments booked", value: "137", delta: "+9.6%", icon: CalendarCheck },
  { label: "Avg. response time", value: "3.2s", delta: "-0.8s", icon: Timer },
];

export const Route = createFileRoute("/dashboard/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics — AutoAgent AI" },
      {
        name: "description",
        content:
          "Conversations, leads, booking rate and response time across Instagram, WhatsApp, TikTok, web and email.",
      },
      { property: "og:title", content: "Analytics — AutoAgent AI" },
      { property: "og:description", content: "Measure how much revenue your AI agent is unlocking." },
    ],
  }),
  component: AnalyticsPage,
});

function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Analytics</h1>
          <p className="mt-1 text-sm text-muted-foreground">Last 7 days · all channels</p>
        </div>
        <StatusPill>Live data</StatusPill>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.label} className="glass rounded-2xl border border-border p-5">
            <p className="flex items-center gap-2 text-xs text-muted-foreground">
              <k.icon className="size-3.5" />
              {k.label}
            </p>
            <p className="mt-2 text-2xl font-semibold">{k.value}</p>
            <p className="mt-1 flex items-center gap-1 text-xs text-accent">
              <TrendingUp className="size-3.5" />
              {k.delta} vs last week
            </p>
          </div>
        ))}
      </div>

      <div className="glass rounded-2xl border border-border p-5">
        <h2 className="text-sm font-semibold">Conversations vs leads</h2>
        <div className="mt-4 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={traffic}>
              <defs>
                <linearGradient id="gConv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.55} />
                  <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gLeads" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-accent)" stopOpacity={0.55} />
                  <stop offset="100%" stopColor="var(--color-accent)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="day" stroke="var(--color-muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
              <Tooltip
                contentStyle={{
                  background: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 12,
                  color: "var(--color-foreground)",
                }}
              />
              <Area
                type="monotone"
                dataKey="conversations"
                stroke="var(--color-primary)"
                fill="url(#gConv)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="leads"
                stroke="var(--color-accent)"
                fill="url(#gLeads)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="glass rounded-2xl border border-border p-5">
          <h2 className="text-sm font-semibold">Conversations by channel</h2>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={byChannel} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90}>
                  {byChannel.map((c) => (
                    <Cell key={c.name} fill={c.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 12,
                    color: "var(--color-foreground)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="mt-2 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
            {byChannel.map((c) => (
              <li key={c.name} className="flex items-center gap-2">
                <span className="size-2 rounded-full" style={{ background: c.fill }} />
                {c.name} · {c.value}
              </li>
            ))}
          </ul>
        </div>

        <div className="glass rounded-2xl border border-border p-5">
          <h2 className="text-sm font-semibold">Top customer intents</h2>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={intents} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" horizontal={false} />
                <XAxis type="number" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis
                  type="category"
                  dataKey="intent"
                  width={90}
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <Tooltip
                  cursor={{ fill: "var(--color-secondary)" }}
                  contentStyle={{
                    background: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 12,
                    color: "var(--color-foreground)",
                  }}
                />
                <Bar dataKey="count" fill="var(--color-primary)" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
