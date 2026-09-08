import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera, MapPin, Clock, Search } from "lucide-react";
import { photographySpots, type PhotoSpot } from "@/data/photographySpots";

interface PhotographyGuideModalProps { triggerButton?: React.ReactNode; }

const TYPE_META: Record<PhotoSpot["type"], { label: string; color: string }> = {
  landscape: { label: "Landscape", color: "text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/20" },
  culture: { label: "Culture", color: "text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/20" },
  wildlife: { label: "Wildlife", color: "text-sky-700 dark:text-sky-300 bg-sky-100 dark:bg-sky-900/20" },
  urban: { label: "Urban", color: "text-orange-700 dark:text-orange-300 bg-orange-100 dark:bg-orange-900/20" },
  coffee: { label: "Coffee", color: "text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/20" },
};

const LIGHT_LABEL: Record<PhotoSpot["bestLight"], string> = {
  "golden-hour-morning": "🌅 Golden Hour – Morning",
  "golden-hour-evening": "🌇 Golden Hour – Evening",
  midday: "☀️ Midday",
  any: "🕐 Any time",
};

export const PhotographyGuideModal: React.FC<PhotographyGuideModalProps> = ({ triggerButton }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<string>("all");
  const [query, setQuery] = useState("");

  const filtered = photographySpots.filter(s => {
    const matchType = filter === "all" || s.type === filter;
    const matchQuery = !query || s.name.toLowerCase().includes(query.toLowerCase()) || s.town.toLowerCase().includes(query.toLowerCase());
    return matchType && matchQuery;
  });

  return (
    <Dialog open={isOpen} onOpenChange={v => { setIsOpen(v); if (!v) { setQuery(""); setFilter("all"); } }}>
      <DialogTrigger asChild>
        {triggerButton || <Button variant="outline" className="gap-2"><Camera className="w-4 h-4 text-primary" />Photography Guide</Button>}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-primary/10 text-primary"><Camera className="w-5 h-5" /></div>
            <div>
              <DialogTitle className="text-xl font-bold">Sidama Photography Guide</DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">Best spots, light conditions, and camera tips for capturing Eastern Sidama.</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700/40 rounded-lg p-3 text-xs text-amber-800 dark:text-amber-300">
          📷 Always ask permission before photographing people. A respectful approach often results in warm, authentic portraits far richer than a quick candid shot.
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search spots..." className="w-full h-9 pl-8 pr-3 text-sm rounded-md border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
          <div className="flex flex-wrap gap-1">
            {(["all", "landscape", "culture", "wildlife", "urban", "coffee"] as const).map(f => (
              <Button key={f} size="sm" variant={filter === f ? "default" : "ghost"} className="h-9 text-xs capitalize" onClick={() => setFilter(f)}>
                {f === "all" ? "All" : TYPE_META[f].label}
              </Button>
            ))}
          </div>
        </div>

        {/* Spot Cards */}
        <div className="space-y-4">
          {filtered.length === 0 && <p className="text-sm text-center text-muted-foreground py-6">No spots match your search.</p>}
          {filtered.map(spot => {
            const tm = TYPE_META[spot.type];
            return (
              <div key={spot.id} className="rounded-xl border border-border bg-card p-4 space-y-3">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-foreground">{spot.name}</h4>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3 text-primary" />{spot.town}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${tm.color}`}>{tm.label}</span>
                    <span className="text-[10px] font-medium text-muted-foreground px-2 py-0.5 rounded-full bg-muted capitalize">{spot.difficulty}</span>
                  </div>
                </div>
                <p className="text-sm text-foreground/85 leading-relaxed">{spot.description}</p>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  <span className="font-medium">{LIGHT_LABEL[spot.bestLight]}</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground mb-1.5">📸 Photographer Tips</p>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    {spot.tips.map((tip, i) => <li key={i} className="flex items-start gap-1.5"><span className="text-primary flex-shrink-0 mt-0.5">•</span>{tip}</li>)}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PhotographyGuideModal;
