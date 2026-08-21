import { useEffect, useState } from "react";
import { CalendarCheck, Instagram, Phone, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { PulseDot } from "@/components/brand";

type Turn = { from: "customer" | "ai"; text: string; tag?: string };

const script: Turn[] = [
  { from: "customer", text: "Hi! How much is the blue ankara gown in your last post? 😍" },
  {
    from: "ai",
    text: "Hey 👋 The Royal Blue Ankara gown is ₦45,000, sizes 8–16 in stock. Lagos delivery is ₦3,500.",
    tag: "Replied in 1.8s",
  },
  { from: "customer", text: "Can I try it on before paying?" },
  {
    from: "ai",
    text: "Absolutely! Free fitting at our Lekki store — Tuesday 2:00 PM or Wednesday 11:00 AM?",
    tag: "Lead intent: purchase",
  },
  { from: "customer", text: "Tuesday 2PM. My number is 0812 445 4567" },
  {
    from: "ai",
    text: "Booked ✅ Tuesday 2:00 PM fitting confirmed. I've saved your number and sent a calendar invite.",
    tag: "Phone captured · Calendar synced",
  },
];

export function DmSimulator() {
  const [visible, setVisible] = useState(1);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (visible >= script.length) {
      const reset = setTimeout(() => setVisible(1), 4500);
      return () => clearTimeout(reset);
    }
    setTyping(true);
    const t1 = setTimeout(() => {
      setTyping(false);
      setVisible((v) => v + 1);
    }, 1600);
    return () => clearTimeout(t1);
  }, [visible]);

  return (
    <div className="relative">
      <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-primary/20 blur-3xl" aria-hidden />
      <div className="glass-panel overflow-hidden rounded-3xl shadow-card">
        <div className="flex items-center justify-between border-b border-border bg-background/40 px-4 py-3">
          <div className="flex items-center gap-2.5">
            <span className="grid size-8 place-items-center rounded-full bg-brand-instagram/15">
              <Instagram className="size-4 text-brand-instagram" />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-medium">@lagos_boutique_official</p>
              <p className="flex items-center gap-1.5 text-[11px] text-accent">
                <PulseDot /> AI agent online
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/15 px-2.5 py-1 text-[11px]">
            <Sparkles className="size-3" /> Live demo
          </span>
        </div>

        <div className="flex h-[380px] flex-col gap-3 overflow-hidden p-4">
          {script.slice(0, visible).map((turn, i) => (
            <div
              key={i}
              className={cn("animate-rise max-w-[85%]", turn.from === "ai" ? "self-end text-right" : "self-start")}
            >
              <div
                className={cn(
                  "rounded-2xl px-3.5 py-2.5 text-left text-sm",
                  turn.from === "ai"
                    ? "rounded-br-sm bg-primary text-primary-foreground"
                    : "rounded-bl-sm bg-secondary text-foreground",
                )}
              >
                {turn.text}
              </div>
              {turn.tag && (
                <p className="mt-1 inline-flex items-center gap-1 text-[11px] text-accent">
                  <Sparkles className="size-3" /> {turn.tag}
                </p>
              )}
            </div>
          ))}
          {typing && (
            <div className="self-end rounded-2xl rounded-br-sm bg-primary/25 px-3.5 py-3">
              <span className="flex gap-1">
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    className="size-1.5 animate-bounce rounded-full bg-primary-foreground/80"
                    style={{ animationDelay: `${d * 120}ms` }}
                  />
                ))}
              </span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2 border-t border-border bg-background/40 p-3 text-[11px]">
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-accent/10 px-2 py-1.5 text-accent">
            <Phone className="size-3" /> Lead: +234 812 *** 4567
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-accent/10 px-2 py-1.5 text-accent">
            <CalendarCheck className="size-3" /> Tue 2:00 PM booked
          </span>
        </div>
      </div>
    </div>
  );
}
