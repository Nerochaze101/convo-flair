import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Building2, Bell, Users, Trash2, Plus, Save } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { teamMembers as seedTeam } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/settings")({
  head: () => ({
    meta: [
      { title: "Settings — AutoAgent AI" },
      {
        name: "description",
        content:
          "Update your business profile, notification preferences and team access for your AutoAgent AI workspace.",
      },
      { property: "og:title", content: "Settings — AutoAgent AI" },
      { property: "og:description", content: "Business profile, notifications and team management." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const [team, setTeam] = useState(seedTeam);
  const [invite, setInvite] = useState("");
  const [notify, setNotify] = useState({
    newLead: true,
    booking: true,
    takeover: true,
    weekly: false,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your workspace, alerts and teammates.
        </p>
      </div>

      <Tabs defaultValue="business">
        <TabsList>
          <TabsTrigger value="business">Business</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>

        <TabsContent value="business" className="mt-4">
          <div className="glass space-y-5 rounded-2xl border border-border p-5">
            <h2 className="flex items-center gap-2 text-sm font-semibold">
              <Building2 className="size-4 text-primary" />
              Business profile
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="biz">Business name</Label>
                <Input id="biz" defaultValue="Lagos Boutique" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Input id="industry" defaultValue="Fashion & Retail" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Support phone</Label>
                <Input id="phone" defaultValue="+234 812 000 1122" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="addr">Store address</Label>
                <Input id="addr" defaultValue="12B Admiralty Way, Lekki Phase 1, Lagos" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="desc">What your business does</Label>
              <Textarea
                id="desc"
                rows={4}
                defaultValue="Ready-to-wear and custom ankara fashion for women and men, with nationwide delivery and in-store fittings in Lekki."
              />
            </div>
            <Button onClick={() => toast.success("Business profile saved")}>
              <Save className="size-4" />
              Save changes
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="mt-4">
          <div className="glass space-y-4 rounded-2xl border border-border p-5">
            <h2 className="flex items-center gap-2 text-sm font-semibold">
              <Bell className="size-4 text-accent" />
              Alerts
            </h2>
            {[
              { key: "newLead" as const, label: "New qualified lead", hint: "Email + in-app alert" },
              { key: "booking" as const, label: "Appointment booked", hint: "Sent instantly" },
              { key: "takeover" as const, label: "Human takeover requested", hint: "High priority" },
              { key: "weekly" as const, label: "Weekly performance digest", hint: "Every Monday 8AM" },
            ].map((n) => (
              <div key={n.key}>
                <div className="flex items-center justify-between gap-4 py-2">
                  <div>
                    <p className="text-sm font-medium">{n.label}</p>
                    <p className="text-xs text-muted-foreground">{n.hint}</p>
                  </div>
                  <Switch
                    checked={notify[n.key]}
                    onCheckedChange={(v) => {
                      setNotify((p) => ({ ...p, [n.key]: v }));
                      toast(`${n.label} ${v ? "enabled" : "disabled"}`);
                    }}
                  />
                </div>
                <Separator />
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="team" className="mt-4">
          <div className="glass space-y-5 rounded-2xl border border-border p-5">
            <h2 className="flex items-center gap-2 text-sm font-semibold">
              <Users className="size-4 text-primary" />
              Team members
            </h2>
            <ul className="space-y-3">
              {team.map((m) => (
                <li
                  key={m.email}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-secondary/40 p-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="grid size-9 place-items-center rounded-full bg-primary/20 text-xs font-semibold">
                      {m.initials}
                    </span>
                    <div>
                      <p className="text-sm font-medium">{m.name}</p>
                      <p className="text-xs text-muted-foreground">{m.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">{m.role}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      disabled={m.role === "Admin"}
                      onClick={() => {
                        setTeam((p) => p.filter((x) => x.email !== m.email));
                        toast.success(`${m.name} removed`);
                      }}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-2">
              <Input
                value={invite}
                onChange={(e) => setInvite(e.target.value)}
                placeholder="teammate@company.com"
                className="min-w-[220px] flex-1"
              />
              <Button
                onClick={() => {
                  if (!invite.includes("@")) {
                    toast.error("Enter a valid email address");
                    return;
                  }
                  setTeam((p) => [
                    ...p,
                    {
                      name: invite.split("@")[0] ?? invite,
                      email: invite,
                      role: "Support Agent",
                      initials: invite.slice(0, 2).toUpperCase(),
                    },
                  ]);
                  setInvite("");
                  toast.success("Invitation sent");
                }}
              >
                <Plus className="size-4" />
                Invite
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
