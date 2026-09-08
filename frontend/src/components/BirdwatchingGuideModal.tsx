import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bird, Search } from "lucide-react";
import { sidamaBirds, type BirdSpecies } from "@/data/birdGuide";

interface BirdwatchingGuideModalProps { triggerButton?: React.ReactNode; }

const STATUS_META: Record<BirdSpecies["status"], { label: string; color: string }> = {
  endemic: { label: "Ethiopian Endemic", color: "text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/20" },
  "near-endemic": { label: "Near-Endemic", color: "text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20" },
  migrant: { label: "Migrant", color: "text-orange-700 dark:text-orange-300 bg-orange-100 dark:bg-orange-900/20" },
  resident: { label: "Resident", color: "text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/20" },
};

const IUCN_META: Record<BirdSpecies["iucnStatus"], { label: string; color: string }> = {
  LC: { label: "Least Concern", color: "text-emerald-600" },
  NT: { label: "Near Threatened", color: "text-amber-600" },
  VU: { label: "Vulnerable", color: "text-orange-600" },
  EN: { label: "Endangered", color: "text-red-600" },
  CR: { label: "Critically Endangered", color: "text-red-800" },
};

export const BirdwatchingGuideModal: React.FC<BirdwatchingGuideModalProps> = ({ triggerButton }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filtered = sidamaBirds.filter(b => {
    const matchQuery = !query || b.commonName.toLowerCase().includes(query.toLowerCase()) || b.scientificName.toLowerCase().includes(query.toLowerCase());
    const matchStatus = statusFilter === "all" || b.status === statusFilter;
    return matchQuery && matchStatus;
  });

  return (
    <Dialog open={isOpen} onOpenChange={v => { setIsOpen(v); if (!v) { setQuery(""); setStatusFilter("all"); } }}>
      <DialogTrigger asChild>
        {triggerButton || <Button variant="outline" className="gap-2"><Bird className="w-4 h-4 text-sky-600" />Birdwatching Guide</Button>}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-sky-100 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400"><Bird className="w-5 h-5" /></div>
            <div>
              <DialogTitle className="text-xl font-bold">Sidama Birdwatching Field Guide</DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">Key species to spot in Wondo Genet, Yirgalem forests, and Lake Hawassa.</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="bg-sky-50 dark:bg-sky-900/10 border border-sky-200 dark:border-sky-800/40 rounded-lg p-3 text-xs text-sky-800 dark:text-sky-300">
          🦅 Eastern Sidama is part of the Ethiopian Highlands Endemic Bird Area (EBA), one of only 218 EBAs worldwide. Over 150 bird species recorded in Wondo Genet forest alone.
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search species..." className="w-full h-9 pl-8 pr-3 text-sm rounded-md border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
          <div className="flex gap-1">
            {(["all", "endemic", "near-endemic", "migrant", "resident"] as const).map(s => (
              <Button key={s} size="sm" variant={statusFilter === s ? "default" : "ghost"} className="h-9 text-xs capitalize" onClick={() => setStatusFilter(s)}>
                {s === "all" ? "All" : s === "near-endemic" ? "Near-End." : s.charAt(0).toUpperCase() + s.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Bird Cards */}
        <div className="space-y-3">
          {filtered.length === 0 && <p className="text-center text-sm text-muted-foreground py-6">No species match your search.</p>}
          {filtered.map(bird => {
            const sm = STATUS_META[bird.status];
            const im = IUCN_META[bird.iucnStatus];
            return (
              <div key={bird.id} className="p-3.5 rounded-xl border border-border bg-card space-y-2">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-foreground">{bird.commonName}</h4>
                    <p className="text-xs text-muted-foreground italic">{bird.scientificName} · {bird.family}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${sm.color}`}>{sm.label}</span>
                    <span className={`text-[10px] font-semibold ${im.color}`}>IUCN: {bird.iucnStatus}</span>
                  </div>
                </div>
                <p className="text-xs text-foreground/85 leading-relaxed">{bird.description}</p>
                <p className="text-xs text-muted-foreground"><span className="font-medium text-foreground">Plumage:</span> {bird.plumage}</p>
                <div className="flex flex-wrap gap-2 pt-0.5 text-xs text-muted-foreground">
                  <span><span className="font-medium text-foreground">Best months:</span> {bird.bestMonths}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {bird.whereSeen.map((loc, i) => <Badge key={i} variant="secondary" className="text-[10px]">{loc}</Badge>)}
                </div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BirdwatchingGuideModal;
