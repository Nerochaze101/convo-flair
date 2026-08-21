import { createFileRoute, Link } from "@tanstack/react-router";
import { Fragment, useState } from "react";
import {
  CalendarDays,
  Clock,
  Mail,
  MapPin,
  Phone,
  Plus,
  Sparkles,
  Tag,
  User,
  Wallet,
} from "lucide-react";
import { toast } from "sonner";

import { ChannelChip, StatusPill } from "@/components/brand";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { updateBookingStatus, useBookings, weekDays, type Booking } from "@/lib/bookings-store";
import { cn } from "@/lib/utils";

const hours = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"];

export const Route = createFileRoute("/dashboard/calendar")({
  head: () => ({
    meta: [
      { title: "Calendar & Bookings — AutoAgent AI" },
      {
        name: "description",
        content:
          "See every fitting, consultation and call your AI agent booked this week, tap any booking for full details, or add a manual booking yourself.",
      },
      { property: "og:title", content: "Calendar & Bookings — AutoAgent AI" },
      { property: "og:description", content: "Appointments your AI agent booked automatically." },
    ],
  }),
  component: CalendarPage,
});

const statusTone: Record<Booking["status"], string> = {
  Confirmed: "border-accent/30 bg-accent/10 text-accent",
  Pending: "border-amber-500/30 bg-amber-500/10 text-amber-500",
  Cancelled: "border-destructive/30 bg-destructive/10 text-destructive",
};

function CalendarPage() {
  const bookings = useBookings();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = bookings.find((b) => b.id === selectedId) ?? null;

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Calendar</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Week of 17–23 August 2026 · {bookings.length} appointments · tap any booking for full
            details.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <StatusPill>Google Calendar synced</StatusPill>
          <Button asChild>
            <Link to="/dashboard/bookings/new">
              <Plus className="size-4" />
              New booking
            </Link>
          </Button>
        </div>
      </div>

      <div className="glass overflow-x-auto rounded-2xl border border-border p-4">
        <div className="min-w-[900px]">
          <div className="grid grid-cols-[70px_repeat(7,minmax(0,1fr))] gap-2">
            <div />
            {weekDays.map((d) => (
              <div key={d} className="pb-2 text-center text-xs font-medium text-muted-foreground">
                {d}
              </div>
            ))}
            {hours.map((h) => (
              <Fragment key={h}>
                <div className="pt-2 text-right text-[11px] text-muted-foreground">{h}</div>
                {weekDays.map((d, di) => {
                  const appt = bookings.find((a) => a.day === di && a.start === h);
                  return (
                    <div
                      key={`${h}-${d}`}
                      className="min-h-14 rounded-lg border border-border/60 bg-secondary/30 p-1"
                    >
                      {appt && (
                        <button
                          onClick={() => setSelectedId(appt.id)}
                          className={cn(
                            "h-full w-full rounded-md border border-primary/40 bg-primary/15 p-1.5 text-left transition-colors hover:bg-primary/25",
                            selectedId === appt.id && "ring-1 ring-primary",
                          )}
                        >
                          <p className="line-clamp-2 text-[11px] font-medium">{appt.title}</p>
                          <p className="mt-0.5 text-[10px] text-muted-foreground">{appt.dur}</p>
                        </button>
                      )}
                    </div>
                  );
                })}
              </Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="glass rounded-2xl border border-border p-5 lg:col-span-2">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold">
            <CalendarDays className="size-4 text-accent" />
            Upcoming appointments
          </h2>
          <ul className="space-y-3">
            {bookings.map((a) => (
              <li key={a.id}>
                <button
                  onClick={() => setSelectedId(a.id)}
                  className="flex w-full flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-secondary/40 p-3 text-left transition-colors hover:bg-secondary/70"
                >
                  <div>
                    <p className="text-sm font-medium">{a.title}</p>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="size-3.5" />
                      {weekDays[a.day]} · {a.start} · {a.dur}
                    </p>
                  </div>
                  <span className="flex items-center gap-2">
                    <span
                      className={cn(
                        "rounded-full border px-2 py-0.5 text-[10px] font-medium",
                        statusTone[a.status],
                      )}
                    >
                      {a.status}
                    </span>
                    <ChannelChip channel={a.channel} />
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="glass rounded-2xl border border-border p-5">
          <h2 className="text-sm font-semibold">Working hours</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li className="flex justify-between">
              <span>Mon – Fri</span>
              <span className="text-foreground">9:00 AM – 7:00 PM</span>
            </li>
            <li className="flex justify-between">
              <span>Saturday</span>
              <span className="text-foreground">9:00 AM – 5:00 PM</span>
            </li>
            <li className="flex justify-between">
              <span>Sunday</span>
              <span className="text-foreground">Closed</span>
            </li>
          </ul>
          <p className="mt-4 text-xs text-muted-foreground">
            Outside these hours your AI agent still replies and books slots for the next open day.
          </p>
        </div>
      </div>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelectedId(null)}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="pr-6 text-base">{selected.title}</DialogTitle>
                <DialogDescription>
                  {weekDays[selected.day]} · {selected.start} · {selected.dur} · Booking{" "}
                  {selected.id}
                </DialogDescription>
              </DialogHeader>

              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={cn(
                    "rounded-full border px-2 py-0.5 text-[11px] font-medium",
                    statusTone[selected.status],
                  )}
                >
                  {selected.status}
                </span>
                <ChannelChip channel={selected.channel} />
                <span className="inline-flex items-center gap-1 rounded-full border border-border bg-secondary/60 px-2 py-0.5 text-[11px] text-muted-foreground">
                  <Sparkles className="size-3" />
                  Booked by {selected.source}
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { icon: User, label: "Customer", value: selected.customer },
                  { icon: Phone, label: "Phone", value: selected.phone },
                  { icon: Mail, label: "Email", value: selected.email },
                  { icon: Tag, label: "Service", value: selected.service },
                  { icon: Wallet, label: "Value", value: selected.price },
                  { icon: MapPin, label: "Location", value: selected.location },
                ].map((f) => (
                  <div key={f.label} className="rounded-xl border border-border bg-secondary/40 p-3">
                    <p className="flex items-center gap-1.5 text-[11px] tracking-wide text-muted-foreground uppercase">
                      <f.icon className="size-3.5" />
                      {f.label}
                    </p>
                    <p className="mt-1 text-sm break-words">{f.value}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-xl border border-border bg-secondary/40 p-3">
                <p className="text-[11px] tracking-wide text-muted-foreground uppercase">Notes</p>
                <p className="mt-1 text-sm">{selected.notes || "No notes added."}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {selected.status !== "Confirmed" && (
                  <Button
                    size="sm"
                    onClick={() => {
                      updateBookingStatus(selected.id, "Confirmed");
                      toast.success("Booking confirmed");
                    }}
                  >
                    Confirm
                  </Button>
                )}
                {selected.status !== "Cancelled" && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      updateBookingStatus(selected.id, "Cancelled");
                      toast("Booking cancelled");
                    }}
                  >
                    Cancel booking
                  </Button>
                )}
                <Button size="sm" variant="ghost" asChild>
                  <Link to="/dashboard/inbox">Open customer chat</Link>
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
