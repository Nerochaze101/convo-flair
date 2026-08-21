import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Copy, Loader2, Lock, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import { ChannelChip, SectionTitle, StatusPill } from "@/components/brand";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { channelMeta, type ChannelKey } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

type Platform = {
  id: string;
  name: string;
  channel: ChannelKey;
  detail: string;
  cta: string;
  state: "active" | "idle" | "locked" | "snippet";
};

const platforms: Platform[] = [
  { id: "ig", name: "Instagram DMs & Comments", channel: "instagram", detail: "@lagos_boutique_official", cta: "Connect Account", state: "active" },
  { id: "wa", name: "WhatsApp Business", channel: "whatsapp", detail: "+234 812 *** 4567", cta: "Connect Number", state: "active" },
  { id: "tt", name: "TikTok Business DMs", channel: "tiktok", detail: "Reply to DMs and video comments", cta: "Connect Account", state: "idle" },
  { id: "web", name: "Website Live Chat Widget", channel: "web", detail: "Embed on any page in 30 seconds", cta: "Copy Script", state: "snippet" },
  { id: "em", name: "Email Support", channel: "email", detail: "support@lagosboutique.com", cta: "Connect Inbox", state: "active" },
  { id: "fb", name: "Facebook Messenger", channel: "messenger", detail: "Page inbox + comment replies", cta: "Connect Page", state: "idle" },
  { id: "gb", name: "Google Business Profile", channel: "google", detail: "Messages, reviews & Q&A", cta: "Connect Profile", state: "idle" },
  { id: "tg", name: "Telegram Bot API", channel: "telegram", detail: "Bot token handshake", cta: "Connect Bot", state: "idle" },
  { id: "x", name: "X (Twitter) DMs", channel: "x", detail: "Enterprise Plan Required", cta: "Upgrade to unlock", state: "locked" },
];

const snippet = `<script src="https://cdn.autoagent.ai/widget.js"
  data-workspace="lagos-boutique"
  data-theme="dark" async></script>`;

export const Route = createFileRoute("/dashboard/integrations")({
  head: () => ({
    meta: [
      { title: "Integrations — AutoAgent AI" },
      {
        name: "description",
        content:
          "Connect Instagram, WhatsApp, TikTok, Messenger, Telegram, email, Google Business and your website chat widget to one AI agent.",
      },
      { property: "og:title", content: "Integrations — AutoAgent AI" },
      { property: "og:description", content: "Nine channels, one AI agent — connect them all in a few clicks." },
    ],
  }),
  component: IntegrationsPage,
});

function IntegrationsPage() {
  const [states, setStates] = useState<Record<string, Platform["state"]>>(
    Object.fromEntries(platforms.map((p) => [p.id, p.state])),
  );
  const [pending, setPending] = useState<Platform | null>(null);
  const [authorizing, setAuthorizing] = useState(false);

  const authorize = () => {
    if (!pending) return;
    setAuthorizing(true);
    setTimeout(() => {
      setStates((s) => ({ ...s, [pending.id]: "active" }));
      setAuthorizing(false);
      toast.success(`${pending.name} connected`, { description: "Agent is now listening on this channel." });
      setPending(null);
    }, 900);
  };

  const connectedCount = Object.values(states).filter((s) => s === "active").length;

  return (
    <div className="mx-auto max-w-6xl px-5 py-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionTitle
          eyebrow="Channels hub"
          title="Integrations"
          subtitle="Every place a customer can message you — wired into a single AI inbox."
        />
        <StatusPill>{connectedCount} of 9 channels live</StatusPill>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {platforms.map((p) => {
          const state = states[p.id]!;
          return (
            <article
              key={p.id}
              className={cn(
                "flex flex-col rounded-2xl border bg-card p-5 transition-colors",
                state === "active" ? "border-accent/30" : "border-border",
                state === "locked" && "opacity-70",
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <ChannelChip channel={p.channel} />
                {state === "active" ? (
                  <StatusPill>Active &amp; Listening</StatusPill>
                ) : state === "locked" ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-2.5 py-1 text-[11px] text-muted-foreground">
                    <Lock className="size-3" /> Enterprise
                  </span>
                ) : (
                  <span className="rounded-full border border-border bg-secondary px-2.5 py-1 text-[11px] text-muted-foreground">
                    Not connected
                  </span>
                )}
              </div>

              <h3 className="mt-4 text-sm font-semibold">{p.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{p.detail}</p>

              {p.state === "snippet" && (
                <pre className="mt-3 overflow-x-auto rounded-lg border border-border bg-background/60 p-3 text-[10.5px] leading-relaxed text-muted-foreground">
                  <code>{snippet}</code>
                </pre>
              )}

              <div className="mt-auto pt-4">
                {p.state === "snippet" ? (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      void navigator.clipboard?.writeText(snippet);
                      toast.success("Script copied to clipboard");
                    }}
                  >
                    <Copy className="size-4" /> Copy Script
                  </Button>
                ) : state === "active" ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      setStates((s) => ({ ...s, [p.id]: "idle" }));
                      toast("Disconnected", { description: `${p.name} is no longer listening.` });
                    }}
                  >
                    <Check className="size-4 text-accent" /> Connected — manage
                  </Button>
                ) : state === "locked" ? (
                  <Button variant="secondary" size="sm" className="w-full" disabled>
                    <Lock className="size-4" /> {p.cta}
                  </Button>
                ) : (
                  <Button size="sm" className="w-full" onClick={() => setPending(p)}>
                    {p.cta}
                  </Button>
                )}
              </div>
            </article>
          );
        })}
      </div>

      <Dialog open={!!pending} onOpenChange={(o) => !o && setPending(null)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-accent" /> Authorize {pending?.name}
            </DialogTitle>
            <DialogDescription>
              AutoAgent AI is requesting permission to read and send messages on your behalf. This is a
              simulated OAuth screen.
            </DialogDescription>
          </DialogHeader>
          <ul className="space-y-2 rounded-xl border border-border bg-background/50 p-4 text-xs text-muted-foreground">
            <li className="flex gap-2"><Check className="size-3.5 text-accent" /> Read incoming messages &amp; comments</li>
            <li className="flex gap-2"><Check className="size-3.5 text-accent" /> Send replies as your business account</li>
            <li className="flex gap-2"><Check className="size-3.5 text-accent" /> Access basic profile information</li>
          </ul>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setPending(null)}>Cancel</Button>
            <Button onClick={authorize} disabled={authorizing}>
              {authorizing && <Loader2 className="size-4 animate-spin" />} Authorize
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
