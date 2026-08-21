import { Quote, Zap, CalendarCheck, Users } from "lucide-react";

import { BrandLogo, StatusPill } from "@/components/brand";

const proof = [
  { icon: Zap, label: "2.1s average first reply", sub: "across Instagram, WhatsApp & TikTok" },
  { icon: CalendarCheck, label: "1,900+ appointments booked", sub: "auto-synced to Google Calendar" },
  { icon: Users, label: "312 qualified leads / month", sub: "phone, email and intent extracted" },
];

export function AuthAside() {
  return (
    <aside className="relative hidden overflow-hidden border-r border-border bg-card lg:flex lg:flex-col lg:justify-between lg:p-12">
      <div className="bg-grid absolute inset-0 opacity-40" aria-hidden />
      <div
        className="absolute -top-32 -left-24 size-96 rounded-full bg-primary/20 blur-3xl"
        aria-hidden
      />

      <div className="relative">
        <BrandLogo />
      </div>

      <div className="relative max-w-md">
        <StatusPill>● System Operational</StatusPill>
        <h2 className="mt-5 text-3xl font-semibold tracking-tight">
          The agent that never sleeps on your <span className="text-gradient-brand">DMs</span>.
        </h2>

        <figure className="glass-panel mt-8 rounded-2xl p-5">
          <Quote className="size-5 text-accent" />
          <blockquote className="mt-3 text-sm leading-relaxed text-foreground">
            "We used to lose orders overnight. AutoAgent replies in seconds, collects the customer's
            number and books the fitting before I even wake up."
          </blockquote>
          <figcaption className="mt-4 text-xs text-muted-foreground">
            Tola Adeniyi — Founder, Lagos Boutique
          </figcaption>
        </figure>

        <ul className="mt-8 space-y-3">
          {proof.map((p) => (
            <li key={p.label} className="flex items-start gap-3">
              <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg border border-border bg-secondary">
                <p.icon className="size-4 text-accent" />
              </span>
              <span>
                <span className="block text-sm font-medium">{p.label}</span>
                <span className="block text-xs text-muted-foreground">{p.sub}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <p className="relative text-xs text-muted-foreground">
        © 2026 AutoAgent AI — built for social-first businesses.
      </p>
    </aside>
  );
}
