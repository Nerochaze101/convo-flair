import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Brain, Plus, Save, Sparkles, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { SectionTitle, StatusPill } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { faqSeed } from "@/lib/mock-data";

const defaultPrompt = `You are the AI sales assistant for Lagos Boutique, a ready-to-wear and custom ankara fashion brand in Lekki, Lagos.

Tone: friendly, polite and warm. Use natural Nigerian English with light Pidgin phrases where it feels human ("no wahala", "I dey here for you"). Never sound robotic.

Always:
- Reply within one short paragraph plus a clear next step.
- Quote prices in Naira and mention delivery cost when relevant.
- Ask for the customer's phone number before ending a sales conversation.
- Offer a fitting slot when the customer shows buying intent.
- Escalate to a human agent for complaints, refunds or bulk orders above ₦500,000.`;

export const Route = createFileRoute("/dashboard/ai-brain")({
  head: () => ({
    meta: [
      { title: "AI Brain — AutoAgent AI" },
      {
        name: "description",
        content:
          "Configure your agent's system prompt, tone and dialect, manage the FAQ knowledge base and tune response creativity.",
      },
      { property: "og:title", content: "AI Brain — AutoAgent AI" },
      { property: "og:description", content: "Train the tone, knowledge and behaviour of your AI agent." },
    ],
  }),
  component: AiBrainPage,
});

function AiBrainPage() {
  const [prompt, setPrompt] = useState(defaultPrompt);
  const [temp, setTemp] = useState([0.4]);
  const [autoReply, setAutoReply] = useState(true);
  const [faqs, setFaqs] = useState(faqSeed);
  const [draft, setDraft] = useState({ q: "", a: "", c: "General" });

  const addFaq = () => {
    if (!draft.q.trim() || !draft.a.trim()) {
      toast.error("Add both a question and an answer");
      return;
    }
    setFaqs((f) => [{ ...draft }, ...f]);
    setDraft({ q: "", a: "", c: "General" });
    toast.success("FAQ added to knowledge base");
  };

  const creativity = temp[0]! <= 0.3 ? "Precise" : temp[0]! <= 0.55 ? "Balanced" : "Creative";

  return (
    <div className="mx-auto max-w-6xl px-5 py-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionTitle
          eyebrow="Knowledge base"
          title="AI Brain"
          subtitle="Everything your agent knows and how it sounds when it speaks to customers."
        />
        <StatusPill tone={autoReply ? "accent" : "warning"}>
          Auto-reply {autoReply ? "ON" : "OFF"}
        </StatusPill>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <section className="rounded-2xl border border-border bg-card p-6 lg:col-span-2">
          <h2 className="flex items-center gap-2 text-sm font-semibold">
            <Brain className="size-4 text-primary" /> System prompt
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Defines personality, dialect and escalation rules.
          </p>
          <Textarea
            className="mt-4 min-h-72 font-mono text-xs leading-relaxed"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </section>

        <section className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="flex items-center gap-2 text-sm font-semibold">
              <Sparkles className="size-4 text-accent" /> AI controls
            </h2>

            <div className="mt-5 space-y-2">
              <div className="flex items-center justify-between">
                <Label>Temperature</Label>
                <span className="text-xs text-muted-foreground">
                  {temp[0]!.toFixed(2)} · {creativity}
                </span>
              </div>
              <Slider value={temp} onValueChange={setTemp} min={0.1} max={0.8} step={0.05} />
              <div className="flex justify-between text-[11px] text-muted-foreground">
                <span>0.1 Precise</span>
                <span>0.8 Creative</span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between rounded-xl border border-border bg-background/50 p-3">
              <span>
                <span className="block text-sm font-medium">Auto-reply</span>
                <span className="block text-xs text-muted-foreground">Answer DMs without approval</span>
              </span>
              <Switch checked={autoReply} onCheckedChange={setAutoReply} />
            </div>

            <div className="mt-3 flex items-center justify-between rounded-xl border border-border bg-background/50 p-3">
              <span>
                <span className="block text-sm font-medium">Abandoned chat recovery</span>
                <span className="block text-xs text-muted-foreground">Nudge after 6 hours of silence</span>
              </span>
              <Switch defaultChecked />
            </div>

            <Button
              className="mt-5 w-full"
              onClick={() =>
                toast.success("Brain settings saved", {
                  description: `Temperature ${temp[0]!.toFixed(2)} · Auto-reply ${autoReply ? "ON" : "OFF"}`,
                })
              }
            >
              <Save className="size-4" /> Save Brain Settings
            </Button>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-sm font-semibold">Model</h2>
            <p className="mt-1 text-xs text-muted-foreground">Gemini 2.5 Flash · 2.1s median latency</p>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-secondary">
              <div className="h-full w-[74%] rounded-full bg-primary" />
            </div>
            <p className="mt-2 text-[11px] text-muted-foreground">1,840 / 2,500 DMs used this cycle</p>
          </div>
        </section>
      </div>

      <section className="mt-6 rounded-2xl border border-border bg-card p-6">
        <h2 className="text-sm font-semibold">FAQ knowledge base</h2>
        <p className="mt-1 text-xs text-muted-foreground">{faqs.length} entries indexed</p>

        <div className="mt-4 grid gap-2 sm:grid-cols-[1fr_1fr_140px_auto]">
          <Input
            placeholder="Question"
            value={draft.q}
            onChange={(e) => setDraft((d) => ({ ...d, q: e.target.value }))}
          />
          <Input
            placeholder="Answer"
            value={draft.a}
            onChange={(e) => setDraft((d) => ({ ...d, a: e.target.value }))}
          />
          <Input
            placeholder="Category"
            value={draft.c}
            onChange={(e) => setDraft((d) => ({ ...d, c: e.target.value }))}
          />
          <Button onClick={addFaq}>
            <Plus className="size-4" /> Add
          </Button>
        </div>

        <div className="mt-5 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[28%]">Question</TableHead>
                <TableHead>Answer</TableHead>
                <TableHead className="w-32">Category</TableHead>
                <TableHead className="w-14" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {faqs.map((f, i) => (
                <TableRow key={`${f.q}-${i}`}>
                  <TableCell className="align-top text-sm font-medium">{f.q}</TableCell>
                  <TableCell className="align-top text-sm text-muted-foreground">{f.a}</TableCell>
                  <TableCell className="align-top">
                    <span className="rounded-full border border-border bg-secondary px-2 py-0.5 text-[11px] text-muted-foreground">
                      {f.c}
                    </span>
                  </TableCell>
                  <TableCell className="align-top">
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={`Remove ${f.q}`}
                      onClick={() => setFaqs((p) => p.filter((_, xi) => xi !== i))}
                    >
                      <Trash2 className="size-4 text-muted-foreground" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </div>
  );
}
