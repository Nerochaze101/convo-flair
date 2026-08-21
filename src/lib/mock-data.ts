export type ChannelKey =
  | "instagram"
  | "whatsapp"
  | "tiktok"
  | "web"
  | "email"
  | "messenger"
  | "google"
  | "telegram"
  | "x";

export const channelMeta: Record<
  ChannelKey,
  { label: string; short: string; dot: string; chip: string }
> = {
  instagram: {
    label: "Instagram",
    short: "IG",
    dot: "bg-brand-instagram",
    chip: "bg-brand-instagram/10 text-brand-instagram border-brand-instagram/30",
  },
  whatsapp: {
    label: "WhatsApp",
    short: "WA",
    dot: "bg-brand-whatsapp",
    chip: "bg-brand-whatsapp/10 text-brand-whatsapp border-brand-whatsapp/30",
  },
  tiktok: {
    label: "TikTok",
    short: "TT",
    dot: "bg-muted-foreground",
    chip: "bg-secondary text-foreground border-border",
  },
  web: {
    label: "Web Chat",
    short: "WEB",
    dot: "bg-brand-web",
    chip: "bg-brand-web/10 text-brand-web border-brand-web/30",
  },
  email: {
    label: "Email",
    short: "EM",
    dot: "bg-brand-email",
    chip: "bg-brand-email/10 text-brand-email border-brand-email/30",
  },
  messenger: {
    label: "Messenger",
    short: "MS",
    dot: "bg-brand-web",
    chip: "bg-brand-web/10 text-brand-web border-brand-web/30",
  },
  google: {
    label: "Google Business",
    short: "GB",
    dot: "bg-brand-email",
    chip: "bg-brand-email/10 text-brand-email border-brand-email/30",
  },
  telegram: {
    label: "Telegram",
    short: "TG",
    dot: "bg-brand-web",
    chip: "bg-brand-web/10 text-brand-web border-brand-web/30",
  },
  x: {
    label: "X (Twitter)",
    short: "X",
    dot: "bg-muted-foreground",
    chip: "bg-secondary text-muted-foreground border-border",
  },
};

export type LeadStatus = "New" | "Qualified" | "Booked" | "Closed";

export type Lead = {
  id: string;
  name: string;
  phone: string;
  email: string;
  channel: ChannelKey;
  status: LeadStatus;
  notes: string;
  captured: string;
};

export const leads: Lead[] = [
  {
    id: "LD-1041",
    name: "Sarah Okonkwo",
    phone: "+234 812 445 4567",
    email: "sarah.okonkwo@gmail.com",
    channel: "instagram",
    status: "Booked",
    notes: "Wants 2 ankara gowns, size 12. Booked fitting Tue 2PM.",
    captured: "2026-08-19",
  },
  {
    id: "LD-1040",
    name: "Emeka Nwosu",
    phone: "+234 703 118 9922",
    email: "emeka.nwosu@yahoo.com",
    channel: "whatsapp",
    status: "Qualified",
    notes: "Budget ₦120k. Asked about bulk pricing for 6 shirts.",
    captured: "2026-08-19",
  },
  {
    id: "LD-1039",
    name: "Amaka Bello",
    phone: "+234 806 774 2010",
    email: "amaka.bello@outlook.com",
    channel: "web",
    status: "New",
    notes: "Landed from TikTok bio link, asked about delivery to Abuja.",
    captured: "2026-08-18",
  },
  {
    id: "LD-1038",
    name: "Daniel Ajayi",
    phone: "+234 909 552 8814",
    email: "d.ajayi@lagosmail.com",
    channel: "tiktok",
    status: "Qualified",
    notes: "Interested in men's kaftan collection. Wants payment link.",
    captured: "2026-08-18",
  },
  {
    id: "LD-1037",
    name: "Grace Umeh",
    phone: "+234 815 220 7741",
    email: "grace.umeh@gmail.com",
    channel: "instagram",
    status: "Closed",
    notes: "Paid ₦48,000 — order shipped via GIG Logistics.",
    captured: "2026-08-17",
  },
  {
    id: "LD-1036",
    name: "Tunde Alabi",
    phone: "+234 701 993 1178",
    email: "tunde.alabi@fastmail.com",
    channel: "email",
    status: "New",
    notes: "Corporate uniforms enquiry, 30 units.",
    captured: "2026-08-17",
  },
  {
    id: "LD-1035",
    name: "Zainab Yusuf",
    phone: "+234 802 664 3390",
    email: "zainab.yusuf@gmail.com",
    channel: "whatsapp",
    status: "Booked",
    notes: "Bridal consultation booked Thu 11AM.",
    captured: "2026-08-16",
  },
  {
    id: "LD-1034",
    name: "Chidi Obi",
    phone: "+234 811 407 2265",
    email: "chidi.obi@gmail.com",
    channel: "instagram",
    status: "Qualified",
    notes: "Asked for size chart, budget ₦60k.",
    captured: "2026-08-16",
  },
  {
    id: "LD-1033",
    name: "Blessing Etim",
    phone: "+234 706 331 9087",
    email: "blessing.etim@yahoo.com",
    channel: "web",
    status: "New",
    notes: "Abandoned chat recovered by AI follow-up after 4 hrs.",
    captured: "2026-08-15",
  },
  {
    id: "LD-1032",
    name: "Ibrahim Musa",
    phone: "+234 803 776 5512",
    email: "ibrahim.musa@gmail.com",
    channel: "telegram",
    status: "Closed",
    notes: "Repeat customer — 3rd order this quarter.",
    captured: "2026-08-15",
  },
  {
    id: "LD-1031",
    name: "Ngozi Eze",
    phone: "+234 814 559 0043",
    email: "ngozi.eze@gmail.com",
    channel: "whatsapp",
    status: "Qualified",
    notes: "Wants Aso-Ebi for 12 guests in September.",
    captured: "2026-08-14",
  },
  {
    id: "LD-1030",
    name: "Femi Adeyemi",
    phone: "+234 705 882 6634",
    email: "femi.adeyemi@gmail.com",
    channel: "messenger",
    status: "New",
    notes: "Asked about store address and opening hours.",
    captured: "2026-08-14",
  },
];

export const statusChip: Record<LeadStatus, string> = {
  New: "bg-brand-web/10 text-brand-web border-brand-web/30",
  Qualified: "bg-primary/15 text-foreground border-primary/40",
  Booked: "bg-accent/10 text-accent border-accent/30",
  Closed: "bg-secondary text-muted-foreground border-border",
};

export type Conversation = {
  id: string;
  name: string;
  handle: string;
  channel: ChannelKey;
  snippet: string;
  time: string;
  unread: number;
  humanActive?: boolean;
  lead: { phone: string; email: string; intent: string; budget: string; location: string };
  messages: { from: "customer" | "ai" | "agent"; text: string; time: string }[];
};

export const conversations: Conversation[] = [
  {
    id: "c1",
    name: "Sarah Okonkwo",
    handle: "@sarah.okonkwo",
    channel: "instagram",
    snippet: "Perfect, Tuesday 2PM works for me 🙌",
    time: "2m",
    unread: 2,
    lead: {
      phone: "+234 812 445 4567",
      email: "sarah.okonkwo@gmail.com",
      intent: "Ankara gown purchase + fitting",
      budget: "₦80,000 – ₦120,000",
      location: "Lekki, Lagos",
    },
    messages: [
      { from: "customer", text: "Hi! How much for the blue ankara gown on your last post?", time: "10:02" },
      {
        from: "ai",
        text: "Hey Sarah 👋 The Royal Blue Ankara gown is ₦45,000, and we have sizes 8–16 in stock. Delivery in Lagos is ₦3,500.",
        time: "10:02",
      },
      { from: "customer", text: "Nice. Can I come and try it before paying?", time: "10:04" },
      {
        from: "ai",
        text: "Of course! I can book you a free fitting at our Lekki store. Tuesday 2:00 PM or Wednesday 11:00 AM — which works?",
        time: "10:04",
      },
      { from: "customer", text: "Perfect, Tuesday 2PM works for me 🙌", time: "10:05" },
      {
        from: "ai",
        text: "Booked ✅ Tuesday 2:00 PM fitting. Kindly confirm your phone number so I can send a reminder.",
        time: "10:05",
      },
      { from: "customer", text: "0812 445 4567", time: "10:06" },
    ],
  },
  {
    id: "c2",
    name: "Emeka Nwosu",
    handle: "+234 703 118 9922",
    channel: "whatsapp",
    snippet: "Do you give discount for 6 shirts?",
    time: "14m",
    unread: 1,
    lead: {
      phone: "+234 703 118 9922",
      email: "emeka.nwosu@yahoo.com",
      intent: "Bulk shirt order (6 units)",
      budget: "₦120,000",
      location: "Ikeja, Lagos",
    },
    messages: [
      { from: "customer", text: "Good afternoon, I need 6 native shirts", time: "12:31" },
      {
        from: "ai",
        text: "Afternoon Emeka! Our native shirts are ₦22,000 each. For 6 units I can apply our bulk rate of ₦19,500 each — total ₦117,000.",
        time: "12:31",
      },
      { from: "customer", text: "Do you give discount for 6 shirts?", time: "12:45" },
    ],
  },
  {
    id: "c3",
    name: "Amaka Bello",
    handle: "Website visitor #8821",
    channel: "web",
    snippet: "Do you deliver to Abuja?",
    time: "38m",
    unread: 0,
    lead: {
      phone: "+234 806 774 2010",
      email: "amaka.bello@outlook.com",
      intent: "Delivery enquiry",
      budget: "Not stated",
      location: "Wuse, Abuja",
    },
    messages: [
      { from: "customer", text: "Do you deliver to Abuja?", time: "11:58" },
      {
        from: "ai",
        text: "Yes we do! Abuja delivery takes 2–3 working days and costs ₦6,000 via GIG Logistics.",
        time: "11:58",
      },
    ],
  },
  {
    id: "c4",
    name: "Daniel Ajayi",
    handle: "@danny.ajayi",
    channel: "tiktok",
    snippet: "Send the payment link abeg",
    time: "1h",
    unread: 3,
    humanActive: true,
    lead: {
      phone: "+234 909 552 8814",
      email: "d.ajayi@lagosmail.com",
      intent: "Kaftan purchase — needs payment link",
      budget: "₦55,000",
      location: "Surulere, Lagos",
    },
    messages: [
      { from: "customer", text: "That white kaftan in your video, still available?", time: "09:12" },
      { from: "ai", text: "Yes! The Ivory Kaftan is ₦38,000 and available in M, L, XL.", time: "09:12" },
      { from: "customer", text: "Send the payment link abeg", time: "09:20" },
      { from: "agent", text: "Hi Daniel, Tola here 👋 sending your secure payment link now.", time: "09:24" },
    ],
  },
  {
    id: "c5",
    name: "Zainab Yusuf",
    handle: "+234 802 664 3390",
    channel: "whatsapp",
    snippet: "Thursday 11AM confirmed, thank you!",
    time: "3h",
    unread: 0,
    lead: {
      phone: "+234 802 664 3390",
      email: "zainab.yusuf@gmail.com",
      intent: "Bridal consultation",
      budget: "₦450,000",
      location: "Victoria Island, Lagos",
    },
    messages: [
      { from: "customer", text: "I need a bridal outfit for December", time: "07:40" },
      {
        from: "ai",
        text: "Congratulations 🎉 Our bridal packages start at ₦380,000. I can book a consultation — Thursday 11:00 AM?",
        time: "07:40",
      },
      { from: "customer", text: "Thursday 11AM confirmed, thank you!", time: "07:42" },
    ],
  },
  {
    id: "c6",
    name: "Femi Adeyemi",
    handle: "Messenger",
    channel: "messenger",
    snippet: "What time do you close today?",
    time: "5h",
    unread: 0,
    lead: {
      phone: "+234 705 882 6634",
      email: "femi.adeyemi@gmail.com",
      intent: "Store hours enquiry",
      budget: "Not stated",
      location: "Yaba, Lagos",
    },
    messages: [
      { from: "customer", text: "What time do you close today?", time: "06:10" },
      { from: "ai", text: "We're open till 7:00 PM today, and 9AM–5PM on Saturdays 🕒", time: "06:10" },
    ],
  },
];

export const faqSeed = [
  { q: "Do you deliver nationwide?", a: "Yes, we deliver to all 36 states via GIG Logistics (2–4 working days).", c: "Shipping" },
  { q: "What are your prices?", a: "Ready-to-wear starts at ₦18,000; custom pieces from ₦45,000.", c: "Pricing" },
  { q: "Can I return an item?", a: "Returns accepted within 5 days if unworn, with receipt.", c: "Policy" },
  { q: "Do you accept transfer?", a: "Yes — bank transfer, card, and Paystack links are all accepted.", c: "Payments" },
  { q: "Where is your store?", a: "12B Admiralty Way, Lekki Phase 1, Lagos.", c: "Location" },
];

export const appointments = [
  { day: 1, start: "09:00", title: "Ankara Fitting — Grace Umeh", channel: "instagram" as ChannelKey, dur: "30 min" },
  { day: 1, start: "14:00", title: "Plumbing Inspection with Sarah", channel: "whatsapp" as ChannelKey, dur: "1 hr" },
  { day: 2, start: "11:00", title: "Bridal Consultation — Zainab Yusuf", channel: "whatsapp" as ChannelKey, dur: "1 hr" },
  { day: 2, start: "16:00", title: "Bulk Order Review — Emeka Nwosu", channel: "web" as ChannelKey, dur: "30 min" },
  { day: 3, start: "10:00", title: "Kaftan Pickup — Daniel Ajayi", channel: "tiktok" as ChannelKey, dur: "15 min" },
  { day: 4, start: "13:00", title: "Corporate Uniforms Call — Tunde Alabi", channel: "email" as ChannelKey, dur: "30 min" },
  { day: 5, start: "15:00", title: "Aso-Ebi Measurement — Ngozi Eze", channel: "whatsapp" as ChannelKey, dur: "1 hr" },
];

export const invoices = [
  { id: "INV-2026-081", date: "01 Aug 2026", plan: "Growth Plan — Monthly", amount: "₦35,000", status: "Paid" },
  { id: "INV-2026-071", date: "01 Jul 2026", plan: "Growth Plan — Monthly", amount: "₦35,000", status: "Paid" },
  { id: "INV-2026-061", date: "01 Jun 2026", plan: "Growth Plan — Monthly", amount: "₦35,000", status: "Paid" },
  { id: "INV-2026-051", date: "01 May 2026", plan: "Starter Plan — Monthly", amount: "₦15,000", status: "Paid" },
  { id: "INV-2026-041", date: "01 Apr 2026", plan: "Starter Plan — Monthly", amount: "₦15,000", status: "Paid" },
];

export const teamMembers = [
  { name: "Tola Adeniyi", email: "tola@lagosboutique.com", role: "Admin", initials: "TA" },
  { name: "Chidera Okafor", email: "chidera@lagosboutique.com", role: "Support Agent", initials: "CO" },
  { name: "Halima Bala", email: "halima@lagosboutique.com", role: "Support Agent", initials: "HB" },
];

export type AppNotification = {
  title: string;
  body: string;
  time: string;
  /** Route to open when the notification is tapped */
  to: string;
  /** Conversation to focus when the target is the inbox */
  threadId?: string;
};

export const notifications: AppNotification[] = [
  { title: "New qualified lead", body: "Emeka Nwosu asked for bulk pricing on WhatsApp.", time: "2m ago", to: "/dashboard/inbox", threadId: "c2" },
  { title: "Appointment booked", body: "Tuesday 2:00 PM fitting with Sarah Okonkwo.", time: "18m ago", to: "/dashboard/inbox", threadId: "c1" },
  { title: "Human takeover requested", body: "Daniel Ajayi's TikTok thread needs an agent.", time: "1h ago", to: "/dashboard/inbox", threadId: "c4" },
  { title: "Usage at 74%", body: "1,840 of 2,500 DMs used this billing cycle.", time: "5h ago", to: "/dashboard/billing" },
];
