import { createFileRoute } from "@tanstack/react-router";
import { Fragment, useState } from "react";
import { CalendarDays, Clock, Plus } from "lucide-react";
import { toast } from "sonner";

import { ChannelChip, StatusPill } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { appointments } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const days = ["Mon 17", "Tue 18", "Wed 19", "Thu 20", "Fri 21", "Sat 22", "Sun 23"];
const hours = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"];

export const Route = createFileRoute("/dashboard/calendar")({
  head: () => ({
    meta: [
      { title: "Calendar & Bookings — AutoAgent AI" },
      {
        name: "description",
        content:
          "See every fitting, consultation and call your AI agent booked this week, synced to your working hours.",
      },
      { property: "og:title", content: "Calendar & Bookings — AutoAgent AI" },
      { property: "og:description", content: "Appointments your AI agent booked automatically." },
    ],
  }),
  component: CalendarPage,
});

function CalendarPage() {
  const [selected, setSelected] = useState<number | null>(0);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Calendar</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Week of 17–23 August 2026 · {appointments.length} appointments booked by your agent.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <StatusPill>Google Calendar synced</StatusPill>
          <Button onClick={() => toast.success("Manual booking slot created")}>
            <Plus className="size-4" />
            New booking
          </Button>
        </div>
      </div>

      <div className="glass overflow-x-auto rounded-2xl border border-border p-4">
        <div className="min-w-[900px]">
          <div className="grid grid-cols-[70px_repeat(7,minmax(0,1fr))] gap-2">
            <div />
            {days.map((d) => (
              <div key={d} className="pb-2 text-center text-xs font-medium text-muted-foreground">
                {d}
              </div>
            ))}
            {hours.map((h) => (
              <Fragment key={h}>
                <div className="pt-2 text-right text-[11px] text-muted-foreground">
                  {h}
                </div>
                {days.map((d, di) => {
                  const slot = appointments.findIndex((a) => a.day === di && a.start === h);
                  const appt = slot >= 0 ? appointments[slot] : undefined;
                  return (
                    <div
                      key={`${h}-${d}`}
                      className="min-h-14 rounded-lg border border-border/60 bg-secondary/30 p-1"
                    >
                      {appt && (
                        <button
                          onClick={() => setSelected(slot)}
                          className={cn(
                            "h-full w-full rounded-md border border-primary/40 bg-primary/15 p-1.5 text-left transition-colors hover:bg-primary/25",
                            selected === slot && "ring-1 ring-primary",
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
            {appointments.map((a, i) => (
              <li
                key={i}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-secondary/40 p-3"
              >
                <div>
                  <p className="text-sm font-medium">{a.title}</p>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="size-3.5" />
                    {days[a.day]} · {a.start} · {a.dur}
                  </p>
                </div>
                <ChannelChip channel={a.channel} />
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
    </div>
  );
}
