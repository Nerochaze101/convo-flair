import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CalendarCheck,
  HandHelping,
  MessagesSquare,
  RotateCcw,
  Star,
  UserSearch,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { DmSimulator } from "@/components/dm-simulator";
import { SectionTitle, StatusPill } from "@/components/brand";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AutoAgent AI — Never Miss a Social DM or Sale Again" },
      {
        name: "description",
        content:
          "Connect Instagram, WhatsApp, TikTok and website DMs to an AI agent that replies in 2 seconds, qualifies leads and books appointments 24/7.",
      },
      { property: "og:title", content: "AutoAgent AI — Never Miss a Social DM or Sale Again" },
      {
        property: "og:description",
        content: "AI DM automation for social-first businesses: instant replies, lead capture, and auto-booking.",
      },
    ],
  }),
  component: Landing,
});

const features = [
  {
    icon: MessagesSquare,
    title: "Multi-Channel Automation",
    body: "One AI agent across Instagram DMs & comments, WhatsApp Business, TikTok, Messenger and your website widget.",
  },
  {
    icon: UserSearch,
    title: "Auto Lead Extraction",
    body: "Names, phone numbers, emails, budgets and buying intent pulled from natural conversation into your CRM.",
  },
  {
    icon: CalendarCheck,
    title: "Calendar Sync",
    body: "The agent offers real open slots and writes confirmed appointments straight to Google Calendar.",
  },
  {
    icon: HandHelping,
    title: "Human Takeover",
    body: "Any teammate can jump in mid-thread. AI pauses instantly and the conversation flags orange.",
  },
  {
    icon: RotateCcw,
    title: "Abandoned Chat Recovery",
    body: "Follow-ups fire automatically when a customer goes quiet mid-order — recovering carts you'd never chase.",
  },
  {
    icon: Star,
    title: "Google Review Booster",
    body: "After a happy sale, the agent politely requests a Google review and tracks who left one.",
  },
];

const metrics = [
  { value: "1.2M+", label: "DMs Handled" },
  { value: "2.1s", label: "Avg Response" },
  { value: "99.4%", label: "CSAT" },
];

function Landing() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      <section className="relative overflow-hidden">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(70%_50%_at_50%_0%,black,transparent)]" />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 lg:grid-cols-2 lg:py-24">
          <div className="animate-rise">
            <StatusPill>AI agents live on 9 channels</StatusPill>
            <h1 className="mt-5 text-4xl leading-[1.08] font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Never Miss a Social <span className="text-gradient-brand">DM, Lead, or Sale</span> Again
            </h1>
            <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
              Connect your Instagram, WhatsApp, TikTok, and Website DMs to an intelligent AI agent. Auto-reply in 2
              seconds, qualify leads, and book appointments 24/7.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link to="/onboarding">
                  Start 14-Day Free Trial <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/pricing">View Pricing</Link>
              </Button>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              No card required · Setup in 4 steps · Cancel anytime
            </p>
          </div>
          <DmSimulator />
        </div>
      </section>

      <section className="border-y border-border bg-card/40">
        <div className="mx-auto grid max-w-6xl grid-cols-1 divide-border px-5 sm:grid-cols-3 sm:divide-x">
          {metrics.map((m) => (
            <div key={m.label} className="px-4 py-8 text-center">
              <p className="text-3xl font-semibold tracking-tight sm:text-4xl">{m.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{m.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 lg:py-24">
        <SectionTitle
          eyebrow="Everything included"
          title="Your always-on sales rep for every inbox"
          subtitle="Built for boutiques, clinics, agencies and service businesses that live in the DMs."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/50"
            >
              <span className="grid size-10 place-items-center rounded-xl bg-primary/15 text-primary-foreground">
                <f.icon className="size-5 text-accent" />
              </span>
              <h3 className="mt-4 text-base font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 text-center sm:p-14">
          <div className="absolute -top-24 left-1/2 size-72 -translate-x-1/2 rounded-full bg-primary/25 blur-3xl" />
          <h2 className="relative text-3xl font-semibold tracking-tight sm:text-4xl">
            Your customers are messaging right now
          </h2>
          <p className="relative mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
            Turn on AutoAgent AI and every DM gets an answer in seconds — even at 2AM.
          </p>
          <div className="relative mt-7 flex flex-wrap justify-center gap-3">
            <Button size="lg" asChild>
              <Link to="/onboarding">Start 14-Day Free Trial</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/dashboard/inbox">Explore the dashboard</Link>
            </Button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
