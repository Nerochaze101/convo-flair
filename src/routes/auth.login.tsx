import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Lock, Sparkles, ArrowRight } from "lucide-react";
import { toast } from "sonner";

import { BrandLogo, StatusPill } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { AuthAside } from "@/components/auth-aside";

export const Route = createFileRoute("/auth/login")({
  head: () => ({
    meta: [
      { title: "Log in — AutoAgent AI" },
      {
        name: "description",
        content:
          "Sign in to your AutoAgent AI workspace to manage Instagram, WhatsApp, TikTok and website DMs from one AI-powered inbox.",
      },
      { property: "og:title", content: "Log in — AutoAgent AI" },
      {
        property: "og:description",
        content: "Sign in to your AutoAgent AI workspace and pick up every conversation where the AI left off.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [email, setEmail] = useState("tola@lagosboutique.com");
  const [password, setPassword] = useState("••••••••••");

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <AuthAside />

      <div className="flex items-center justify-center px-5 py-12">
        <div className="w-full max-w-sm animate-rise">
          <div className="mb-8 lg:hidden">
            <BrandLogo />
          </div>

          <StatusPill>Demo workspace — no real auth</StatusPill>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Your agent handled 82 DMs while you were away.
          </p>

          <form
            className="mt-7 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Signed in", { description: "Redirecting to your workspace…" });
            }}
          >
            <div className="space-y-1.5">
              <Label htmlFor="email">Email address</Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  className="pl-9"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <button type="button" className="text-xs text-primary hover:underline">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  className="pl-9"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
              <Checkbox defaultChecked /> Remember me for 30 days
            </label>

            <Button type="submit" className="w-full" asChild>
              <Link to="/dashboard/inbox">
                Sign in <ArrowRight className="size-4" />
              </Link>
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-[11px] tracking-widest text-muted-foreground uppercase">or</span>
            <Separator className="flex-1" />
          </div>

          <div className="space-y-2.5">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => toast("Google OAuth simulated", { description: "This is a UI prototype." })}
            >
              <GoogleGlyph /> Sign in with Google
            </Button>
            <Button
              variant="ghost"
              className="w-full"
              onClick={() => toast.success("Magic link sent", { description: `Check ${email}` })}
            >
              <Sparkles className="size-4 text-accent" /> Email me a magic link
            </Button>
          </div>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            New to AutoAgent?{" "}
            <Link to="/auth/signup" className="font-medium text-primary hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function GoogleGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
      <path
        fill="#4285F4"
        d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.4a5.5 5.5 0 0 1-2.4 3.6v3h3.9c2.3-2.1 3.6-5.2 3.6-8.8Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3a7.2 7.2 0 0 1-10.7-3.8H1.4v3.1A12 12 0 0 0 12 24Z"
      />
      <path fill="#FBBC05" d="M5.4 14.3a7.1 7.1 0 0 1 0-4.6V6.6H1.4a12 12 0 0 0 0 10.8l4-3.1Z" />
      <path
        fill="#EA4335"
        d="M12 4.8c1.8 0 3.4.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.4 6.6l4 3.1A7.2 7.2 0 0 1 12 4.8Z"
      />
    </svg>
  );
}

