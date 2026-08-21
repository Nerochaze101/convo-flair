import { useState } from "react";
import { Send, Sparkles, Bot } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const canned = [
  "Our ready-to-wear pieces start at ₦18,000 and custom outfits from ₦45,000. Want me to send the full catalogue?",
  "Yes we deliver nationwide 🚚 Lagos is ₦3,500 (24 hrs) and other states ₦6,000 (2–4 days).",
  "I can book you a free fitting at our Lekki store — Tuesday 2:00 PM or Wednesday 11:00 AM works. Which do you prefer?",
  "We're open Mon–Fri 9AM–7PM and Saturdays 9AM–5PM. Closed on Sundays 🕒",
];

export function TestAgentModal({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [turns, setTurns] = useState<{ from: "you" | "ai"; text: string }[]>([
    { from: "ai", text: "Hi 👋 I'm your AutoAgent. Ask me anything a customer would ask." },
  ]);

  const send = () => {
    if (!input.trim()) return;
    const reply = canned[turns.filter((t) => t.from === "ai").length % canned.length] ?? canned[0]!;
    setTurns((t) => [...t, { from: "you", text: input.trim() }, { from: "ai", text: reply }]);
    setInput("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="border-border bg-card sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bot className="size-4 text-accent" /> Test AI Agent
          </DialogTitle>
          <DialogDescription>Sandbox playground — replies are simulated, nothing is sent to customers.</DialogDescription>
        </DialogHeader>
        <div className="flex max-h-72 flex-col gap-2.5 overflow-y-auto rounded-xl border border-border bg-background/60 p-3">
          {turns.map((t, i) => (
            <div key={i} className={cn("max-w-[85%]", t.from === "ai" ? "self-start" : "self-end")}>
              <div
                className={cn(
                  "rounded-2xl px-3 py-2 text-sm",
                  t.from === "ai" ? "bg-secondary" : "bg-primary text-primary-foreground",
                )}
              >
                {t.text}
              </div>
              {t.from === "ai" && (
                <p className="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground">
                  <Sparkles className="size-2.5" /> AI Generated · Gemini 2.5 Flash
                </p>
              )}
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            value={input}
            placeholder="e.g. how much is delivery to Abuja?"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
          />
          <Button onClick={send} size="icon" aria-label="Send test message">
            <Send className="size-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
