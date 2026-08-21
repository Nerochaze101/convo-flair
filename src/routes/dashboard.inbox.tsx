import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Send,
  Search,
  UserCheck,
  Bot,
  Phone,
  Mail,
  MapPin,
  Target,
  Wallet,
  Star,
  CheckCheck,
  ArrowLeft,
  MailOpen,
  Inbox as InboxIcon,
  Archive,
  Sparkles,
  Filter,
} from "lucide-react";
import { toast } from "sonner";

import { ChannelChip, StatusPill } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { conversations as seed, type Conversation, type ChannelKey } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/inbox")({
  validateSearch: (
    search: Record<string, unknown>,
  ): { thread?: string; from?: "notifications"; filter?: "all" | "unread" } => ({
    ...(typeof search["thread"] === "string" ? { thread: search["thread"] } : {}),
    ...(search["from"] === "notifications" ? { from: "notifications" as const } : {}),
    ...(search["filter"] === "unread"
      ? { filter: "unread" as const }
      : search["filter"] === "all"
        ? { filter: "all" as const }
        : {}),
  }),
  head: () => ({
    meta: [
      { title: "Unified Inbox — AutoAgent AI" },
      {
        name: "description",
        content:
          "Every Instagram, WhatsApp, TikTok, web and email conversation in one AI-handled thread view with live human takeover.",
      },
      { property: "og:title", content: "Unified Inbox — AutoAgent AI" },
      { property: "og:description", content: "One inbox for every channel, answered by your AI agent." },
    ],
  }),
  component: InboxPage,
});

type Assignee = "ai" | "human";

type Thread = Conversation & {
  starred?: boolean;
  resolved?: boolean;
  archived?: boolean;
  assignedTo?: Assignee;
};

type FilterKey = "all" | "unread" | "human" | "starred" | "resolved";

const assigneeOf = (t: Thread): Assignee => t.assignedTo ?? (t.humanActive ? "human" : "ai");

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "unread", label: "Unread" },
  { key: "human", label: "Mine" },
  { key: "starred", label: "Starred" },
  { key: "resolved", label: "Done" },
];

const QUICK_REPLIES = [
  "Thanks for reaching out! Let me check that for you.",
  "Sure — what date and time works best for you?",
  "I've sent the payment link to your email 👍",
];

const initials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

function InboxPage() {
  const { thread: threadParam } = Route.useSearch();
  const [threads, setThreads] = useState<Thread[]>(seed);
  const [activeId, setActiveId] = useState<string | null>(
    threadParam && seed.some((t) => t.id === threadParam) ? threadParam : seed[0]!.id,
  );
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterKey>("all");
  const [channels, setChannels] = useState<ChannelKey[]>([]);
  const [draft, setDraft] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const allChannels = useMemo(
    () => Array.from(new Set(seed.map((t) => t.channel))) as ChannelKey[],
    [],
  );

  const filtered = useMemo(
    () =>
      threads.filter((t) => {
        if (t.archived) return false;
        if (filter === "unread" && t.unread === 0) return false;
        if (filter === "human" && assigneeOf(t) !== "human") return false;
        if (filter === "starred" && !t.starred) return false;
        if (filter === "resolved" && !t.resolved) return false;
        if (filter !== "resolved" && t.resolved) return false;
        if (channels.length && !channels.includes(t.channel)) return false;
        return (t.name + t.handle + t.snippet).toLowerCase().includes(query.toLowerCase());
      }),
    [threads, query, filter, channels],
  );

  const active = threads.find((t) => t.id === activeId) ?? null;
  const unreadTotal = threads.filter((t) => t.unread > 0 && !t.archived && !t.resolved).length;

  const patch = (id: string, data: Partial<Thread>) =>
    setThreads((prev) => prev.map((t) => (t.id === id ? { ...t, ...data } : t)));

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [activeId, active?.messages.length]);

  useEffect(() => {
    if (!threadParam) return;
    if (!seed.some((t) => t.id === threadParam)) return;
    setActiveId(threadParam);
    setThreads((prev) => prev.map((t) => (t.id === threadParam ? { ...t, unread: 0 } : t)));
  }, [threadParam]);

  const open = (id: string) => {
    setActiveId(id);
    patch(id, { unread: 0 });
  };

  const assign = (id: string, to: Assignee) => {
    patch(id, { assignedTo: to, humanActive: to === "human" });
    toast.success(
      to === "human" ? "You took over — AI paused on this thread" : "Handed back to the AI agent",
    );
  };

  const send = () => {
    if (!draft.trim() || !active) return;
    patch(active.id, {
      humanActive: true,
      assignedTo: "human",
      resolved: false,
      snippet: draft,
      time: "now",
      unread: 0,
      messages: [...active.messages, { from: "agent" as const, text: draft, time: "now" }],
    });
    setDraft("");
    toast.success("Message sent — AI paused on this thread");
  };

  return (
    <div className="grid h-[calc(100vh-3.5rem)] grid-cols-1 lg:grid-cols-[340px_minmax(0,1fr)_300px]">
      {/* Thread list */}
      <aside
        className={cn(
          "min-h-0 flex-col border-r border-border bg-card/40 lg:flex",
          active ? "hidden lg:flex" : "flex",
        )}
      >

        <div className="space-y-3 border-b border-border p-3">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search conversations"
                className="pl-9"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Filter by channel">
                  <Filter className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Channels</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {allChannels.map((c) => (
                  <DropdownMenuCheckboxItem
                    key={c}
                    checked={channels.includes(c)}
                    onCheckedChange={(v) =>
                      setChannels((prev) => (v ? [...prev, c] : prev.filter((x) => x !== c)))
                    }
                    className="capitalize"
                  >
                    {c}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Tabs value={filter} onValueChange={(v) => setFilter(v as FilterKey)}>
            <TabsList className="w-full">
              {FILTERS.map((f) => (
                <TabsTrigger key={f.key} value={f.key} className="flex-1 text-xs">
                  {f.label}
                  {f.key === "unread" && unreadTotal > 0 && (
                    <span className="ml-1 rounded-full bg-primary px-1.5 text-[10px] font-semibold text-primary-foreground">
                      {unreadTotal}
                    </span>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          {filtered.map((t) => (
            <button
              key={t.id}
              onClick={() => open(t.id)}
              className={cn(
                "flex w-full gap-3 border-b border-border/60 p-3 text-left transition-colors hover:bg-secondary/60",
                t.id === activeId && "bg-secondary",
              )}
            >
              <span className="relative mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-primary/15 text-xs font-semibold text-primary">
                {initials(t.name)}
                {t.unread > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 size-2.5 rounded-full bg-primary ring-2 ring-card" />
                )}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between gap-2">
                  <span
                    className={cn(
                      "truncate text-sm",
                      t.unread > 0 ? "font-semibold" : "font-medium text-foreground/90",
                    )}
                  >
                    {t.name}
                  </span>
                  <span className="shrink-0 text-[11px] text-muted-foreground">{t.time}</span>
                </span>
                <span className="mt-0.5 block truncate text-xs text-muted-foreground">{t.snippet}</span>
                <span className="mt-2 flex items-center gap-2">
                  <ChannelChip channel={t.channel} />
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-[10px] font-medium",
                      assigneeOf(t) === "human"
                        ? "border-amber-500/30 bg-amber-500/10 text-amber-600"
                        : "border-border bg-secondary/60 text-muted-foreground",
                    )}
                  >
                    {assigneeOf(t) === "human" ? (
                      <UserCheck className="size-3" />
                    ) : (
                      <Bot className="size-3" />
                    )}
                    {assigneeOf(t) === "human" ? "You" : "AI"}
                  </span>
                  {t.starred && <Star className="size-3.5 fill-amber-400 text-amber-400" />}
                  {t.resolved && <CheckCheck className="size-3.5 text-accent" />}
                </span>

              </span>
            </button>
          ))}
          {filtered.length === 0 && (
            <div className="flex flex-col items-center gap-2 p-10 text-center">
              <InboxIcon className="size-7 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">No conversations here.</p>
            </div>
          )}
        </div>
      </aside>

      {/* Thread view */}
      <section
        className={cn(
          "min-h-0 flex-col border-r border-border lg:flex",
          active ? "flex" : "hidden lg:flex",
        )}
      >

        {!active ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 p-8 text-center">
            <InboxIcon className="size-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Select a conversation to get started.</p>
          </div>
        ) : (
          <>
            <header className="flex items-center justify-between gap-3 border-b border-border p-3 sm:p-4">
              <div className="flex min-w-0 items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  aria-label="Back to conversations"
                  onClick={() => setActiveId(null)}
                >
                  <ArrowLeft className="size-4" />
                </Button>
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary/15 text-xs font-semibold text-primary">
                  {initials(active.name)}
                </span>
                <div className="min-w-0">
                  <h1 className="truncate text-sm font-semibold">{active.name}</h1>
                  <p className="flex items-center gap-2 truncate text-xs text-muted-foreground">
                    {active.handle}
                    <ChannelChip channel={active.channel} />
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <StatusPill tone={assigneeOf(active) === "human" ? "warning" : "accent"}>
                  {assigneeOf(active) === "human" ? "Human active" : "AI replying"}
                </StatusPill>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={active.starred ? "Unstar conversation" : "Star conversation"}
                  onClick={() => patch(active.id, { starred: !active.starred })}
                >
                  <Star className={cn("size-4", active.starred && "fill-amber-400 text-amber-400")} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Mark as unread"
                  onClick={() => {
                    patch(active.id, { unread: 1 });
                    setActiveId(null);
                    toast("Marked as unread");
                  }}
                >
                  <MailOpen className="size-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Archive conversation"
                  onClick={() => {
                    patch(active.id, { archived: true });
                    setActiveId(null);
                    toast("Conversation archived");
                  }}
                >
                  <Archive className="size-4" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="sm" variant="outline" className="hidden sm:inline-flex">
                      {assigneeOf(active) === "human" ? (
                        <UserCheck className="size-4" />
                      ) : (
                        <Bot className="size-4" />
                      )}
                      Assign
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-52">
                    <DropdownMenuLabel>Handle this conversation</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem
                      checked={assigneeOf(active) === "ai"}
                      onCheckedChange={() => assign(active.id, "ai")}
                    >
                      <Bot className="mr-2 size-4" /> AI agent
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={assigneeOf(active) === "human"}
                      onCheckedChange={() => assign(active.id, "human")}
                    >
                      <UserCheck className="mr-2 size-4" /> Human takeover
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => assign(active.id, assigneeOf(active) === "human" ? "ai" : "human")}
                >
                  <UserCheck className="size-4" />
                  <span className="hidden sm:inline">
                    {assigneeOf(active) === "human" ? "Resume AI" : "Take over"}
                  </span>
                </Button>

                <Button
                  size="sm"
                  variant={active.resolved ? "secondary" : "default"}
                  onClick={() => {
                    patch(active.id, { resolved: !active.resolved, unread: 0 });
                    toast.success(active.resolved ? "Conversation reopened" : "Conversation resolved");
                  }}
                >
                  <CheckCheck className="size-4" />
                  <span className="hidden sm:inline">{active.resolved ? "Reopen" : "Resolve"}</span>
                </Button>
              </div>
            </header>

            <div ref={scrollRef} className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4">
              <p className="text-center text-[11px] tracking-wide text-muted-foreground uppercase">
                Today
              </p>
              {active.messages.map((m, i) => (
                <div key={i} className={cn("flex", m.from === "customer" ? "justify-start" : "justify-end")}>
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm sm:max-w-[70%]",
                      m.from === "customer"
                        ? "rounded-tl-sm bg-secondary text-foreground"
                        : m.from === "ai"
                          ? "rounded-tr-sm bg-primary text-primary-foreground"
                          : "rounded-tr-sm border border-accent/30 bg-accent/10 text-foreground",
                    )}
                  >
                    {m.from !== "customer" && (
                      <span className="mb-1 flex items-center gap-1.5 text-[11px] opacity-80">
                        {m.from === "ai" ? <Bot className="size-3" /> : <UserCheck className="size-3" />}
                        {m.from === "ai" ? "AI Agent" : "You"}
                      </span>
                    )}
                    <p className="break-words whitespace-pre-wrap">{m.text}</p>
                    <span className="mt-1 flex items-center justify-end gap-1 text-[10px] opacity-70">
                      {m.time}
                      {m.from !== "customer" && <CheckCheck className="size-3" />}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 border-t border-border p-3">
              <div className="flex flex-wrap gap-1.5">
                {QUICK_REPLIES.map((q) => (
                  <button
                    key={q}
                    onClick={() => setDraft(q)}
                    className="flex items-center gap-1 rounded-full border border-border bg-secondary/50 px-2.5 py-1 text-[11px] text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    <Sparkles className="size-3" />
                    {q.length > 34 ? `${q.slice(0, 34)}…` : q}
                  </button>
                ))}
              </div>
              <div className="flex items-end gap-2">
                <Textarea
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  rows={1}
                  placeholder="Reply as a human agent…  (tap Send to deliver)"
                  className="max-h-32 min-h-[42px] resize-none"
                />
                <Button onClick={send} disabled={!draft.trim()} aria-label="Send reply">
                  <Send className="size-4" />
                  <span className="hidden sm:inline">Send</span>
                </Button>
              </div>
            </div>
          </>
        )}
      </section>

      {/* Lead details */}
      <aside className="hidden min-h-0 flex-col gap-3 overflow-y-auto border-l border-border bg-card/40 p-4 lg:flex">
        <h2 className="text-sm font-semibold">Lead details</h2>
        {active ? (
          <>
            {[
              { icon: Phone, label: "Phone", value: active.lead.phone },
              { icon: Mail, label: "Email", value: active.lead.email },
              { icon: Target, label: "Intent", value: active.lead.intent },
              { icon: Wallet, label: "Budget", value: active.lead.budget },
              { icon: MapPin, label: "Location", value: active.lead.location },
            ].map((f) => (
              <div key={f.label} className="rounded-xl border border-border bg-secondary/40 p-3">
                <p className="flex items-center gap-1.5 text-[11px] tracking-wide text-muted-foreground uppercase">
                  <f.icon className="size-3.5" />
                  {f.label}
                </p>
                <p className="mt-1 text-sm break-words">{f.value}</p>
              </div>
            ))}
            <Button variant="outline" onClick={() => toast.success("Lead saved to CRM")}>
              Save to leads
            </Button>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">No conversation selected.</p>
        )}
      </aside>
    </div>
  );
}
