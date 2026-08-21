import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, PartyPopper, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { BrandLogo, ChannelChip, StatusPill } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { channelMeta, faqSeed, type ChannelKey } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const steps = ["Business Info", "Working Hours", "FAQ Base", "Connect Channels"] as const;
const industries = ["Fashion", "Services", "Real Estate", "Medical", "Beauty", "Food & Drinks"];
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const connectable: ChannelKey[] = ["instagram", "whatsapp", "tiktok", "web", "email", "messenger"];

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Set up your AI agent — AutoAgent AI" },
      {
        name: "description",
        content:
          "A guided 4-step setup: business details, working hours, FAQ knowledge base and channel connections for your AutoAgent AI assistant.",
      },
      { property: "og:title", content: "Set up your AI agent — AutoAgent AI" },
      {
        property: "og:description",
        content: "Four quick steps to a fully trained AI agent answering your DMs 24/7.",
      },
    ],
  }),
  component: OnboardingPage,
});

function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [business, setBusiness] = useState("Lagos Boutique");
  const [tags, setTags] = useState<string[]>(["Fashion"]);
  const [hours, setHours] = useState(
    days.map((d) => ({ day: d, open: d !== "Sunday", from: d === "Saturday" ? "09:00" : "09:00", to: d === "Saturday" ? "17:00" : "19:00" })),
  );
  const [faqs, setFaqs] = useState(faqSeed.slice(0, 3).map((f) => ({ q: f.q, a: f.a })));
  const [connected, setConnected] = useState<ChannelKey[]>(["instagram", "whatsapp"]);

  const toggleTag = (t: string) =>
    setTags((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]));
  const toggleChannel = (c: ChannelKey) =>
    setConnected((p) => (p.includes(c) ? p.filter((x) => x !== c) : [...p, c]));

  return (
    <div className="min-h-screen">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-4">
          <BrandLogo />
          <StatusPill tone="primary">Step {step + 1} of 4</StatusPill>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-10">
        <ol className="flex items-center gap-2">
          {steps.map((s, i) => (
            <li key={s} className="flex flex-1 items-center gap-2">
              <button
                onClick={() => setStep(i)}
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold transition-colors",
                  i < step
                    ? "border-accent/40 bg-accent/15 text-accent"
                    : i === step
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-secondary text-muted-foreground",
                )}
                aria-label={s}
              >
                {i < step ? <Check className="size-3.5" /> : i + 1}
              </button>
              <span
                className={cn(
                  "hidden text-xs sm:block",
                  i === step ? "font-medium text-foreground" : "text-muted-foreground",
                )}
              >
                {s}
              </span>
              {i < steps.length - 1 && (
                <span
                  className={cn("h-px flex-1", i < step ? "bg-accent/50" : "bg-border")}
                  aria-hidden
                />
              )}
            </li>
          ))}
        </ol>

        <section key={step} className="animate-rise mt-8 rounded-2xl border border-border bg-card p-6 sm:p-8">
          {step === 0 && (
            <div className="space-y-6">
              <Header
                title="Tell us about your business"
                sub="Your agent uses this to introduce itself to customers."
              />
              <div className="space-y-1.5">
                <Label htmlFor="biz">Business name</Label>
                <Input id="biz" value={business} onChange={(e) => setBusiness(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="desc">One-line description</Label>
                <Input id="desc" defaultValue="Ready-to-wear and custom ankara fashion in Lekki, Lagos." />
              </div>
              <div className="space-y-2.5">
                <Label>Industry</Label>
                <div className="flex flex-wrap gap-2">
                  {industries.map((t) => (
                    <button
                      key={t}
                      onClick={() => toggleTag(t)}
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                        tags.includes(t)
                          ? "border-primary/50 bg-primary/15 text-foreground"
                          : "border-border bg-secondary text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <Header title="When are you open?" sub="Outside these hours the agent replies with your away message." />
              <div className="divide-y divide-border overflow-hidden rounded-xl border border-border">
                {hours.map((h, i) => (
                  <div key={h.day} className="flex flex-wrap items-center gap-3 bg-background/40 px-4 py-3">
                    <Switch
                      checked={h.open}
                      onCheckedChange={(v) =>
                        setHours((p) => p.map((x, xi) => (xi === i ? { ...x, open: v } : x)))
                      }
                    />
                    <span className="w-24 text-sm">{h.day}</span>
                    {h.open ? (
                      <div className="flex items-center gap-2">
                        <Input
                          type="time"
                          value={h.from}
                          className="h-8 w-28"
                          onChange={(e) =>
                            setHours((p) => p.map((x, xi) => (xi === i ? { ...x, from: e.target.value } : x)))
                          }
                        />
                        <span className="text-xs text-muted-foreground">to</span>
                        <Input
                          type="time"
                          value={h.to}
                          className="h-8 w-28"
                          onChange={(e) =>
                            setHours((p) => p.map((x, xi) => (xi === i ? { ...x, to: e.target.value } : x)))
                          }
                        />
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">Closed</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <Header title="Teach your agent" sub="Paste the questions customers ask you every single day." />
              <div className="space-y-4">
                {faqs.map((f, i) => (
                  <div key={i} className="rounded-xl border border-border bg-background/40 p-4">
                    <div className="flex items-start gap-2">
                      <Input
                        value={f.q}
                        placeholder="Question"
                        onChange={(e) =>
                          setFaqs((p) => p.map((x, xi) => (xi === i ? { ...x, q: e.target.value } : x)))
                        }
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Remove FAQ"
                        onClick={() => setFaqs((p) => p.filter((_, xi) => xi !== i))}
                      >
                        <Trash2 className="size-4 text-muted-foreground" />
                      </Button>
                    </div>
                    <Textarea
                      className="mt-2"
                      rows={2}
                      value={f.a}
                      placeholder="Answer"
                      onChange={(e) =>
                        setFaqs((p) => p.map((x, xi) => (xi === i ? { ...x, a: e.target.value } : x)))
                      }
                    />
                  </div>
                ))}
              </div>
              <Button variant="outline" onClick={() => setFaqs((p) => [...p, { q: "", a: "" }])}>
                <Plus className="size-4" /> Add FAQ
              </Button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <Header title="Connect your channels" sub="Toggle a channel to simulate the OAuth handshake." />
              <div className="grid gap-3 sm:grid-cols-2">
                {connectable.map((c) => {
                  const on = connected.includes(c);
                  return (
                    <button
                      key={c}
                      onClick={() => toggleChannel(c)}
                      className={cn(
                        "flex items-center justify-between rounded-xl border p-4 text-left transition-colors",
                        on ? "border-accent/40 bg-accent/5" : "border-border bg-background/40 hover:border-primary/40",
                      )}
                    >
                      <span>
                        <span className="block text-sm font-medium">{channelMeta[c].label}</span>
                        <span className="mt-1 block text-xs text-muted-foreground">
                          {on ? "Active & listening" : "Not connected"}
                        </span>
                      </span>
                      <ChannelChip channel={c} />
                    </button>
                  );
                })}
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 p-4 text-sm">
                <PartyPopper className="size-4 text-accent" />
                {connected.length} channel{connected.length === 1 ? "" : "s"} ready for {business}.
              </div>
            </div>
          )}

          <div className="mt-8 flex items-center justify-between gap-3 border-t border-border pt-6">
            <Button
              variant="ghost"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
            >
              <ArrowLeft className="size-4" /> Back
            </Button>

            {step < 3 ? (
              <Button onClick={() => setStep((s) => s + 1)}>
                Continue <ArrowRight className="size-4" />
              </Button>
            ) : (
              <Button
                asChild
                onClick={() => toast.success("Setup complete", { description: "Your agent is now live." })}
              >
                <Link to="/dashboard/integrations">
                  Finish setup <Check className="size-4" />
                </Link>
              </Button>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

function Header({ title, sub }: { title: string; sub: string }) {
  return (
    <div>
      <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-1 text-sm text-muted-foreground">{sub}</p>
    </div>
  );
}
