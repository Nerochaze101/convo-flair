import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowLeft, CalendarPlus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addBooking, weekDays, type BookingStatus } from "@/lib/bookings-store";
import { channelMeta, type ChannelKey } from "@/lib/mock-data";

const hours = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"];
const durations = ["15 min", "30 min", "45 min", "1 hr", "2 hrs"];

export const Route = createFileRoute("/dashboard/bookings/new")({
  head: () => ({
    meta: [
      { title: "New Manual Booking — AutoAgent AI" },
      {
        name: "description",
        content:
          "Add a booking yourself: pick the customer, service, day, time slot and duration, and it lands straight on your calendar.",
      },
      { property: "og:title", content: "New Manual Booking — AutoAgent AI" },
      {
        property: "og:description",
        content: "Create an appointment manually and drop it on your AutoAgent calendar.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: NewBookingPage,
});

function NewBookingPage() {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [day, setDay] = useState("0");
  const [start, setStart] = useState("09:00");
  const [dur, setDur] = useState("30 min");
  const [channel, setChannel] = useState<ChannelKey>("whatsapp");
  const [status, setStatus] = useState<BookingStatus>("Confirmed");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!customer.trim() || !service.trim()) {
      toast.error("Customer name and service are required");
      return;
    }
    addBooking({
      day: Number(day),
      start,
      dur,
      title: `${service.trim()} — ${customer.trim()}`,
      customer: customer.trim(),
      phone: phone.trim() || "Not provided",
      email: email.trim() || "Not provided",
      channel,
      service: service.trim(),
      price: price.trim() || "Not stated",
      location: location.trim() || "Not stated",
      status,
      notes: notes.trim(),
    });
    toast.success("Booking added to your calendar");
    navigate({ to: "/dashboard/calendar" });
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-6">
      <div className="mb-6 flex items-center gap-3">
        <Link
          to="/dashboard/calendar"
          className="flex size-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Back to calendar"
        >
          <ArrowLeft className="size-4" />
        </Link>
        <div>
          <h1 className="text-lg font-semibold">Manual booking</h1>
          <p className="text-xs text-muted-foreground">
            Add an appointment yourself — it appears on the calendar immediately.
          </p>
        </div>
      </div>

      <form onSubmit={submit} className="glass space-y-5 rounded-2xl border border-border p-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Customer name" required>
            <Input value={customer} onChange={(e) => setCustomer(e.target.value)} placeholder="Sarah Okonkwo" />
          </Field>
          <Field label="Service" required>
            <Input value={service} onChange={(e) => setService(e.target.value)} placeholder="Ankara fitting" />
          </Field>
          <Field label="Phone">
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+234 812 445 4567" />
          </Field>
          <Field label="Email">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="customer@email.com"
            />
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Day">
            <Select value={day} onValueChange={setDay}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {weekDays.map((d, i) => (
                  <SelectItem key={d} value={String(i)}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Start time">
            <Select value={start} onValueChange={setStart}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {hours.map((h) => (
                  <SelectItem key={h} value={h}>
                    {h}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Duration">
            <Select value={dur} onValueChange={setDur}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {durations.map((d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Channel">
            <Select value={channel} onValueChange={(v) => setChannel(v as ChannelKey)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(channelMeta) as ChannelKey[]).map((c) => (
                  <SelectItem key={c} value={c}>
                    {channelMeta[c].label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Status">
            <Select value={status} onValueChange={(v) => setStatus(v as BookingStatus)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Confirmed">Confirmed</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Value">
            <Input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="₦45,000" />
          </Field>
        </div>

        <Field label="Location">
          <Input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="12B Admiralty Way, Lekki Phase 1"
          />
        </Field>

        <Field label="Notes">
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            placeholder="Anything the team should know before the appointment…"
            className="resize-none"
          />
        </Field>

        <div className="flex flex-wrap gap-2">
          <Button type="submit">
            <CalendarPlus className="size-4" />
            Save booking
          </Button>
          <Button type="button" variant="outline" asChild>
            <Link to="/dashboard/calendar">Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs text-muted-foreground">
        {label}
        {required && <span className="text-destructive"> *</span>}
      </Label>
      {children}
    </div>
  );
}
