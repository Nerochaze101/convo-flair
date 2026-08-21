import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Check, Lock, Minus, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { SectionTitle } from "@/components/brand";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — AutoAgent AI Plans" },
      {
        name: "description",
        content:
          "Transparent AutoAgent AI pricing: Starter, Growth and Agency tiers. Prices automatically adjust to your local currency.",
      },
      { property: "og:title", content: "Pricing — AutoAgent AI Plans" },
      {
        property: "og:description",
        content: "Compare AutoAgent AI plans, from 2 channels to unlimited DMs and CRM sync.",
      },
    ],
  }),
  component: Pricing,
});

type Plan = {
  name: string;
  price: string;
  period: string;
  blurb: string;
  featured?: boolean;
  badge?: string;
  features: string[];
};

const ngn: Plan[] = [
  {
    name: "Starter",
    price: "₦15,000",
    period: "/mo",
    blurb: "For small stores testing automation.",
    features: ["2 Channels (IG + WhatsApp)", "300 DMs / month", "Instant FAQ replies", "Basic lead capture", "Email support"],
  },
  {
    name: "Growth",
    price: "₦35,000",
    period: "/mo",
    blurb: "The sweet spot for busy boutiques.",
    featured: true,
    badge: "Most Popular",
    features: [
      "ALL Channels (IG, WhatsApp, TikTok, Web Chat)",
      "1,500 DMs / month",
      "Auto Lead Extraction",
      "Order Details Capture",
      "Calendar auto-booking",
    ],
  },
  {
    name: "Agency",
    price: "₦75,000",
    period: "/mo",
    blurb: "For agencies managing many brands.",
    features: ["ALL Channels", "Unlimited DMs", "Priority Support", "CRM sync", "Team seats & roles"],
  },
];

const usd: Plan[] = [
  {
    name: "Starter",
    price: "$49",
    period: "/mo",
    blurb: "Get your first channels automated.",
    features: ["2 Channels", "500 DMs / month", "Instant FAQ replies", "Basic lead capture"],
  },
  {
    name: "Pro",
    price: "$99",
    period: "/mo",
    blurb: "Scale conversations into revenue.",
    featured: true,
    badge: "Most Popular",
    features: ["ALL Channels", "2,500 DMs / month", "Auto-Booking", "Lead Recovery", "Google Review Booster"],
  },
  {
    name: "Enterprise",
    price: "$249",
    period: "/mo",
    blurb: "Full coverage with premium APIs.",
    features: ["ALL Channels", "Unlimited DMs", "Dedicated success manager", "SLA + audit logs"],
  },
];

const matrix = [
  { label: "Instagram DMs & comments", a: true, b: true, c: true },
  { label: "WhatsApp Business", a: true, b: true, c: true },
  { label: "TikTok & Web Chat", a: false, b: true, c: true },
  { label: "Auto lead extraction", a: false, b: true, c: true },
  { label: "Calendar auto-booking", a: false, b: true, c: true },
  { label: "Abandoned chat recovery", a: false, b: true, c: true },
  { label: "CRM / Google Sheets sync", a: false, b: false, c: true },
  { label: "Priority support & team roles", a: false, b: false, c: true },
];

function isNigeriaDetected() {
  if (typeof window === "undefined") return false;

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const nigerianTimeZones = ["Africa/Lagos"];

  const locale = navigator.language.toLowerCase();
  const nigerianLocales = ["en-ng", "ha-ng", "ig-ng", "yo-ng", "ff-ng", "efi-ng"];

  return (
    nigerianTimeZones.includes(timeZone) ||
    nigerianLocales.some((l) => locale === l || locale.startsWith(`${l.split("-")[0]}-ng`))
  );
}

function Pricing() {
  const [currency, setCurrency] = useState<"NGN" | "USD">("USD");
  const [selected, setSelected] = useState<Plan | null>(null);
  const plans = currency === "NGN" ? ngn : usd;

  useEffect(() => {
    setCurrency(isNigeriaDetected() ? "NGN" : "USD");
  }, []);

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <section className="mx-auto max-w-6xl px-5 py-14">
        <SectionTitle
          eyebrow="Pricing"
          title="Simple, transparent plans"
          subtitle="Every plan includes the AI brain, unified inbox and human takeover. Upgrade or cancel anytime."
        />

        <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2">
            <span className="size-2 rounded-full bg-accent" />
            Prices shown in {currency === "NGN" ? "NGN (Naira)" : "USD (Dollars)"} based on your location
          </span>
          <button
            onClick={() => setCurrency((c) => (c === "NGN" ? "USD" : "NGN"))}
            className="text-primary underline-offset-4 hover:underline"
          >
            Switch to {currency === "NGN" ? "USD" : "NGN"}
          </button>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={cn(
                "animate-rise relative flex flex-col rounded-2xl border bg-card p-6",
                p.featured ? "border-primary shadow-glow" : "border-border",
              )}
            >
              {p.badge && (
                <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-[11px] font-semibold text-primary-foreground">
                  {p.badge}
                </span>
              )}
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.blurb}</p>
              <p className="mt-5 text-4xl font-semibold tracking-tight">
                {p.price}
                <span className="text-base font-normal text-muted-foreground">{p.period}</span>
              </p>
              <ul className="mt-6 flex-1 space-y-2.5 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
                {currency === "USD" && p.name === "Enterprise" && (
                  <li className="flex gap-2">
                    <Lock className="mt-0.5 size-4 shrink-0 text-warning" />
                    <span className="rounded-md bg-warning/10 px-2 py-0.5 text-xs text-warning">
                      🔒 Pay-per-use X (Twitter) API unlocked
                    </span>
                  </li>
                )}
              </ul>
              <Button
                className="mt-6"
                variant={p.featured ? "default" : "outline"}
                onClick={() => setSelected(p)}
              >
                Select {p.name}
              </Button>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20">
        <h2 className="text-xl font-semibold tracking-tight">Feature comparison</h2>
        <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="bg-secondary/60 text-left">
              <tr>
                <th className="px-5 py-3 font-medium">Feature</th>
                {plans.map((p) => (
                  <th key={p.name} className="px-5 py-3 text-center font-medium">
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {matrix.map((row) => (
                <tr key={row.label} className="border-t border-border">
                  <td className="px-5 py-3 text-muted-foreground">{row.label}</td>
                  {[row.a, row.b, row.c].map((v, i) => (
                    <td key={i} className="px-5 py-3 text-center">
                      {v ? (
                        <Check className="mx-auto size-4 text-accent" />
                      ) : (
                        <Minus className="mx-auto size-4 text-muted-foreground" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-accent" /> Checkout — {selected?.name} Plan
            </DialogTitle>
            <DialogDescription>
              Simulated checkout. You'll be charged {selected?.price}
              {selected?.period} after your 14-day trial.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2 rounded-xl border border-border bg-background/60 p-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Plan</span>
              <span>{selected?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Billed</span>
              <span>Monthly · {currency}</span>
            </div>
            <div className="flex justify-between font-medium">
              <span className="text-muted-foreground">Due today</span>
              <span className="text-accent">{currency === "NGN" ? "₦0.00" : "$0.00"}</span>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelected(null)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                toast.success(`${selected?.name} plan selected — trial started 🎉`);
                setSelected(null);
              }}
            >
              Confirm & start trial
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <SiteFooter />
    </div>
  );
}
