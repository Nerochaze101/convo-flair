import { useSyncExternalStore } from "react";

import type { ChannelKey } from "@/lib/mock-data";

export type BookingStatus = "Confirmed" | "Pending" | "Cancelled";

export type Booking = {
  id: string;
  /** 0 = Monday … 6 = Sunday of the displayed week */
  day: number;
  start: string;
  dur: string;
  title: string;
  customer: string;
  phone: string;
  email: string;
  channel: ChannelKey;
  service: string;
  price: string;
  location: string;
  status: BookingStatus;
  notes: string;
  source: "AI agent" | "Manual";
};

export const weekDays = ["Mon 17", "Tue 18", "Wed 19", "Thu 20", "Fri 21", "Sat 22", "Sun 23"];

let counter = 100;
const nextId = () => `BK-${++counter}`;

let state: Booking[] = [
  {
    id: "BK-001",
    day: 1,
    start: "09:00",
    dur: "30 min",
    title: "Ankara Fitting — Grace Umeh",
    customer: "Grace Umeh",
    phone: "+234 815 220 7741",
    email: "grace.umeh@gmail.com",
    channel: "instagram",
    service: "Ankara fitting",
    price: "₦48,000",
    location: "12B Admiralty Way, Lekki Phase 1",
    status: "Confirmed",
    notes: "Bring the adjusted sleeves sample.",
    source: "AI agent",
  },
  {
    id: "BK-002",
    day: 1,
    start: "14:00",
    dur: "1 hr",
    title: "Plumbing Inspection with Sarah",
    customer: "Sarah Okonkwo",
    phone: "+234 812 445 4567",
    email: "sarah.okonkwo@gmail.com",
    channel: "whatsapp",
    service: "On-site inspection",
    price: "₦25,000",
    location: "Lekki, Lagos",
    status: "Confirmed",
    notes: "Customer requested a morning reminder call.",
    source: "AI agent",
  },
  {
    id: "BK-003",
    day: 2,
    start: "11:00",
    dur: "1 hr",
    title: "Bridal Consultation — Zainab Yusuf",
    customer: "Zainab Yusuf",
    phone: "+234 802 664 3390",
    email: "zainab.yusuf@gmail.com",
    channel: "whatsapp",
    service: "Bridal consultation",
    price: "₦450,000",
    location: "Victoria Island, Lagos",
    status: "Confirmed",
    notes: "December wedding. Wants lace and beadwork options.",
    source: "AI agent",
  },
  {
    id: "BK-004",
    day: 2,
    start: "16:00",
    dur: "30 min",
    title: "Bulk Order Review — Emeka Nwosu",
    customer: "Emeka Nwosu",
    phone: "+234 703 118 9922",
    email: "emeka.nwosu@yahoo.com",
    channel: "web",
    service: "Bulk order review",
    price: "₦117,000",
    location: "Video call",
    status: "Pending",
    notes: "6 native shirts at the bulk rate — awaiting deposit.",
    source: "AI agent",
  },
  {
    id: "BK-005",
    day: 3,
    start: "10:00",
    dur: "15 min",
    title: "Kaftan Pickup — Daniel Ajayi",
    customer: "Daniel Ajayi",
    phone: "+234 909 552 8814",
    email: "d.ajayi@lagosmail.com",
    channel: "tiktok",
    service: "Order pickup",
    price: "₦38,000",
    location: "12B Admiralty Way, Lekki Phase 1",
    status: "Confirmed",
    notes: "Ivory kaftan, size L. Paid via payment link.",
    source: "AI agent",
  },
  {
    id: "BK-006",
    day: 4,
    start: "13:00",
    dur: "30 min",
    title: "Corporate Uniforms Call — Tunde Alabi",
    customer: "Tunde Alabi",
    phone: "+234 701 993 1178",
    email: "tunde.alabi@fastmail.com",
    channel: "email",
    service: "Corporate quote call",
    price: "₦620,000",
    location: "Phone call",
    status: "Pending",
    notes: "30 units. Needs a formal quote before the call.",
    source: "AI agent",
  },
  {
    id: "BK-007",
    day: 5,
    start: "15:00",
    dur: "1 hr",
    title: "Aso-Ebi Measurement — Ngozi Eze",
    customer: "Ngozi Eze",
    phone: "+234 814 559 0043",
    email: "ngozi.eze@gmail.com",
    channel: "whatsapp",
    service: "Group measurement",
    price: "₦240,000",
    location: "12B Admiralty Way, Lekki Phase 1",
    status: "Confirmed",
    notes: "12 guests, September event.",
    source: "AI agent",
  },
];

const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());
const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export const getBookings = () => state;

export function addBooking(input: Omit<Booking, "id" | "source"> & { source?: Booking["source"] }) {
  const booking: Booking = { id: nextId(), source: "Manual", ...input };
  state = [...state, booking];
  emit();
  return booking;
}

export function updateBookingStatus(id: string, status: BookingStatus) {
  state = state.map((b) => (b.id === id ? { ...b, status } : b));
  emit();
}

export function useBookings() {
  return useSyncExternalStore(subscribe, getBookings, getBookings);
}
