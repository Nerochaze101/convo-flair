import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CreditCard, Download, Check, Zap } from "lucide-react";
import { toast } from "sonner";

import { StatusPill } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { invoices } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const plans = [
  { name: "Starter", price: "₦15,000", dms: "800 DMs / month", channels: "2 channels" },
  { name: "Growth", price: "₦35,000", dms: "2,500 DMs / month", channels: "5 channels" },
  { name: "Scale", price: "₦85,000", dms: "Unlimited DMs", channels: "All channels" },
];

const usage = [
  { label: "AI conversations", used: 1840, cap: 2500 },
  { label: "Connected channels", used: 4, cap: 5 },
  { label: "Team seats", used: 3, cap: 5 },
];

export const Route = createFileRoute("/dashboard/billing")({
  head: () => ({
    meta: [
      { title: "Billing & Usage — AutoAgent AI" },
      {
        name: "description",
        content:
          "Manage your AutoAgent AI plan, monitor monthly DM usage, update your payment method and download invoices.",
      },
      { property: "og:title", content: "Billing & Usage — AutoAgent AI" },
      { property: "og:description", content: "Plan, usage and invoice history for your AI agent." },
    ],
  }),
  component: BillingPage,
});

function BillingPage() {
  const [plan, setPlan] = useState("Growth");

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Billing</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {plan} Plan · renews 01 September 2026
          </p>
        </div>
        <StatusPill>Payments active</StatusPill>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="glass rounded-2xl border border-border p-5 lg:col-span-2">
          <h2 className="flex items-center gap-2 text-sm font-semibold">
            <Zap className="size-4 text-accent" />
            This cycle's usage
          </h2>
          <div className="mt-4 space-y-5">
            {usage.map((u) => (
              <div key={u.label}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span>{u.label}</span>
                  <span className="text-muted-foreground">
                    {u.used.toLocaleString()} / {u.cap.toLocaleString()}
                  </span>
                </div>
                <Progress value={(u.used / u.cap) * 100} />
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl border border-border p-5">
          <h2 className="flex items-center gap-2 text-sm font-semibold">
            <CreditCard className="size-4 text-primary" />
            Payment method
          </h2>
          <div className="mt-4 rounded-xl border border-border bg-secondary/40 p-4">
            <p className="text-sm font-medium">Visa •••• 4242</p>
            <p className="mt-1 text-xs text-muted-foreground">Expires 08/29 · Paystack</p>
          </div>
          <Button
            variant="outline"
            className="mt-4 w-full"
            onClick={() => toast.success("Card update link sent to your email")}
          >
            Update card
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {plans.map((p) => (
          <div
            key={p.name}
            className={cn(
              "glass rounded-2xl border p-5",
              p.name === plan ? "border-primary shadow-glow" : "border-border",
            )}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">{p.name}</h3>
              {p.name === plan && <StatusPill tone="primary">Current</StatusPill>}
            </div>
            <p className="mt-3 text-2xl font-semibold">
              {p.price}
              <span className="text-sm font-normal text-muted-foreground">/mo</span>
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Check className="size-4 text-accent" />
                {p.dms}
              </li>
              <li className="flex items-center gap-2">
                <Check className="size-4 text-accent" />
                {p.channels}
              </li>
            </ul>
            <Button
              className="mt-5 w-full"
              variant={p.name === plan ? "outline" : "default"}
              disabled={p.name === plan}
              onClick={() => {
                setPlan(p.name);
                toast.success(`Switched to the ${p.name} plan`);
              }}
            >
              {p.name === plan ? "Current plan" : `Switch to ${p.name}`}
            </Button>
          </div>
        ))}
      </div>

      <div className="glass rounded-2xl border border-border">
        <h2 className="border-b border-border p-4 text-sm font-semibold">Invoice history</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Receipt</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((inv) => (
                <TableRow key={inv.id}>
                  <TableCell className="font-medium">{inv.id}</TableCell>
                  <TableCell className="text-muted-foreground">{inv.date}</TableCell>
                  <TableCell className="text-muted-foreground">{inv.plan}</TableCell>
                  <TableCell>{inv.amount}</TableCell>
                  <TableCell>
                    <StatusPill>{inv.status}</StatusPill>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => toast.success(`${inv.id}.pdf downloaded`)}
                    >
                      <Download className="size-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
