import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Download, Search, Users } from "lucide-react";
import { toast } from "sonner";

import { ChannelChip } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { leads as seed, statusChip, type LeadStatus } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const statuses: LeadStatus[] = ["New", "Qualified", "Booked", "Closed"];

export const Route = createFileRoute("/dashboard/leads")({
  head: () => ({
    meta: [
      { title: "Leads CRM — AutoAgent AI" },
      {
        name: "description",
        content:
          "Every captured lead with phone, email, channel and intent — qualified automatically by your AI agent and exportable to CSV.",
      },
      { property: "og:title", content: "Leads CRM — AutoAgent AI" },
      { property: "og:description", content: "Track, filter and export the leads your AI agent captures." },
    ],
  }),
  component: LeadsPage,
});

function LeadsPage() {
  const [rows, setRows] = useState(seed);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | LeadStatus>("all");

  const filtered = useMemo(
    () =>
      rows.filter(
        (l) =>
          (status === "all" || l.status === status) &&
          (l.name + l.email + l.phone + l.notes).toLowerCase().includes(query.toLowerCase()),
      ),
    [rows, query, status],
  );

  const counts = statuses.map((s) => ({ s, n: rows.filter((l) => l.status === s).length }));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Leads</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {rows.length} leads captured across all channels this month.
          </p>
        </div>
        <Button variant="outline" onClick={() => toast.success("leads-export.csv downloaded")}>
          <Download className="size-4" />
          Export CSV
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {counts.map((c) => (
          <div key={c.s} className="glass rounded-2xl border border-border p-4">
            <p className="flex items-center gap-2 text-xs text-muted-foreground">
              <Users className="size-3.5" />
              {c.s}
            </p>
            <p className="mt-2 text-2xl font-semibold">{c.n}</p>
          </div>
        ))}
      </div>

      <div className="glass rounded-2xl border border-border">
        <div className="flex flex-wrap items-center gap-3 border-b border-border p-4">
          <div className="relative min-w-[220px] flex-1">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, email, phone or note"
              className="pl-9"
            />
          </div>
          <Select value={status} onValueChange={(v) => setStatus(v as "all" | LeadStatus)}>
            <SelectTrigger className="w-[170px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              {statuses.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Lead</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Channel</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="min-w-[240px]">Notes</TableHead>
                <TableHead>Captured</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((l) => (
                <TableRow key={l.id}>
                  <TableCell>
                    <p className="font-medium">{l.name}</p>
                    <p className="text-xs text-muted-foreground">{l.id}</p>
                  </TableCell>
                  <TableCell className="text-xs">
                    <p>{l.phone}</p>
                    <p className="text-muted-foreground">{l.email}</p>
                  </TableCell>
                  <TableCell>
                    <ChannelChip channel={l.channel} />
                  </TableCell>
                  <TableCell>
                    <Select
                      value={l.status}
                      onValueChange={(v) => {
                        setRows((prev) =>
                          prev.map((r) => (r.id === l.id ? { ...r, status: v as LeadStatus } : r)),
                        );
                        toast.success(`${l.name} marked ${v}`);
                      }}
                    >
                      <SelectTrigger
                        className={cn("h-8 w-[130px] border text-xs", statusChip[l.status])}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {statuses.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{l.notes}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{l.captured}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filtered.length === 0 && (
            <p className="p-8 text-center text-sm text-muted-foreground">No leads match your filters.</p>
          )}
        </div>
      </div>
    </div>
  );
}
