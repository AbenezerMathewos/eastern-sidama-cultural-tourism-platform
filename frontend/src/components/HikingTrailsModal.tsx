import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mountain, ArrowUp, Clock, MapPin, CheckCircle2, AlertTriangle } from "lucide-react";
import { hikingTrails, type HikingTrail } from "@/data/hikingTrails";

interface HikingTrailsModalProps { triggerButton?: React.ReactNode; }

const DIFF_META: Record<HikingTrail["difficulty"], { label: string; color: string; bg: string }> = {
  easy: { label: "Easy", color: "text-emerald-700 dark:text-emerald-300", bg: "bg-emerald-100 dark:bg-emerald-900/20" },
  moderate: { label: "Moderate", color: "text-amber-700 dark:text-amber-300", bg: "bg-amber-100 dark:bg-amber-900/20" },
  challenging: { label: "Challenging", color: "text-red-700 dark:text-red-300", bg: "bg-red-100 dark:bg-red-900/20" },
};

export const HikingTrailsModal: React.FC<HikingTrailsModalProps> = ({ triggerButton }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<string>("all");

  const filtered = hikingTrails.filter(t => filter === "all" || t.difficulty === filter);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {triggerButton || <Button variant="outline" className="gap-2"><Mountain className="w-4 h-4 text-primary" />Hiking Trails Guide</Button>}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-primary/10 text-primary"><Mountain className="w-5 h-5" /></div>
            <div>
              <DialogTitle className="text-xl font-bold">Sidama Hiking & Trekking Guide</DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">Forest walks, highland treks, and birding trails across Eastern Sidama.</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Filters */}
        <div className="flex gap-1.5 border-b border-border pb-2">
          {(["all", "easy", "moderate", "challenging"] as const).map(f => (
            <Button key={f} size="sm" variant={filter === f ? "default" : "ghost"} className="text-xs h-8 capitalize" onClick={() => setFilter(f)}>
              {f === "all" ? "All Trails" : DIFF_META[f].label}
            </Button>
          ))}
        </div>

        <div className="space-y-5">
          {filtered.map(trail => {
            const dm = DIFF_META[trail.difficulty];
            return (
              <div key={trail.id} className="rounded-xl border border-border bg-card overflow-hidden">
                <div className="p-4 space-y-3">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h4 className="font-bold text-foreground text-base">{trail.name}</h4>
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${dm.bg} ${dm.color}`}>{dm.label}</span>
                  </div>

                  <p className="text-sm text-foreground/85 leading-relaxed">{trail.description}</p>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs bg-muted/30 p-2.5 rounded-lg border border-border/50">
                    <div className="text-center">
                      <p className="font-bold text-foreground text-base">{trail.distanceKm} km</p>
                      <p className="text-muted-foreground">Distance</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-foreground text-base flex items-center justify-center gap-0.5"><ArrowUp className="w-3 h-3 text-emerald-500" />{trail.elevationGainM}m</p>
                      <p className="text-muted-foreground">Elevation</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-foreground text-sm">{trail.durationHours}</p>
                      <p className="text-muted-foreground">Duration</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-foreground capitalize text-sm">{trail.trailType.replace("-", " ")}</p>
                      <p className="text-muted-foreground">Route type</p>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div>
                    <p className="text-xs font-semibold text-foreground mb-1.5">Trail Highlights</p>
                    <div className="flex flex-wrap gap-1.5">
                      {trail.highlights.map((h, i) => (
                        <Badge key={i} variant="secondary" className="text-[10px]">{h}</Badge>
                      ))}
                    </div>
                  </div>

                  {/* Start / End Points + Season */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="flex items-start gap-1.5 text-muted-foreground">
                      <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                      <span><span className="font-semibold text-foreground">Start:</span> {trail.startPoint}</span>
                    </div>
                    <div className="flex items-start gap-1.5 text-muted-foreground">
                      <Clock className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                      <span><span className="font-semibold text-foreground">Best Season:</span> {trail.bestSeason}</span>
                    </div>
                  </div>

                  {/* Guide Required */}
                  {trail.guideRequired ? (
                    <div className="flex items-start gap-1.5 text-xs bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700/40 rounded-md p-2 text-amber-800 dark:text-amber-300">
                      <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                      <span><span className="font-semibold">Local guide recommended</span> – route navigates remote highland terrain and community farmlands. Book via the platform.</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-300">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Self-guided – no guide required. Trail is well-marked.</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HikingTrailsModal;
