import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Lock, User, ArrowRight, Sparkles, Check } from "lucide-react";
import { toast } from "sonner";

import { BrandLogo, StatusPill } from "@/components/brand";
import { AuthAside } from "@/components/auth-aside";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

const perks = ["14-day free trial", "No card required", "Cancel anytime"];

export const Route = createFileRoute("/auth/signup")({
  head: () => ({
    meta: [
      { title: "Create your account — AutoAgent AI" },
      {
        name: "description",
        content:
          "Start a 14-day free trial of AutoAgent AI and let an AI agent answer, qualify and book every social DM you receive.",
      },
      { property: "og:title", content: "Create your account — AutoAgent AI" },
      {
        property: "og:description",
        content: "Start your 14-day AutoAgent AI free trial — no card required.",
      },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const [form, setForm] = useState({
    name: "Tola Adeniyi",
    business: "Lagos Boutique",
    email: "tola@lagosboutique.com",
    password: "",
  });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <AuthAside />

      <div className="flex items-center justify-center px-5 py-12">
        <div className="w-full max-w-sm animate-rise">
          <div className="mb-8 lg:hidden">
            <BrandLogo />
          </div>

          <StatusPill tone="primary">Free 14-day trial</StatusPill>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight">Create your workspace</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Connect your channels in under 4 minutes.
          </p>

          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5">
            {perks.map((p) => (
              <li key={p} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Check className="size-3.5 text-accent" /> {p}
              </li>
            ))}
          </ul>

          <form
            className="mt-7 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Account created", { description: "Let's set up your agent." });
            }}
          >
            <div className="space-y-1.5">
              <Label htmlFor="name">Full name</Label>
              <div className="relative">
                <User className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="name" className="pl-9" value={form.name} onChange={set("name")} />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="business">Business name</Label>
              <Input id="business" value={form.business} onChange={set("business")} />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email">Work email</Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="email" type="email" className="pl-9" value={form.email} onChange={set("email")} />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="At least 8 characters"
                  className="pl-9"
                  value={form.password}
                  onChange={set("password")}
                />
              </div>
            </div>

            <label className="flex cursor-pointer items-start gap-2 text-xs text-muted-foreground">
              <Checkbox defaultChecked className="mt-0.5" />
              <span>
                I agree to the Terms of Service and Privacy Policy, and to receive product updates.
              </span>
            </label>

            <Button type="submit" className="w-full" asChild>
              <Link to="/onboarding">
                Start free trial <ArrowRight className="size-4" />
              </Link>
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-[11px] tracking-widest text-muted-foreground uppercase">or</span>
            <Separator className="flex-1" />
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => toast("Google OAuth simulated", { description: "This is a UI prototype." })}
          >
            <Sparkles className="size-4 text-accent" /> Continue with Google
          </Button>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/auth/login" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
