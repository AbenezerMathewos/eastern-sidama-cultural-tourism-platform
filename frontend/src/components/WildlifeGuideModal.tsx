import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Footprints, MapPin, Calendar, AlertTriangle } from "lucide-react";
import { sidamaWildlife, type WildlifeSpecies } from "@/data/sidamaWildlife";

interface WildlifeGuideModalProps { triggerButton?: React.ReactNode; }

const CATEGORY_META: Record<WildlifeSpecies["category"], { label: string; emoji: string }> = {
  mammal: { label: "Mammal", emoji: "🦛" },
  reptile: { label: "Reptile", emoji: "🦎" },
  amphibian: { label: "Amphibian", emoji: "🐸" },
  fish: { label: "Fish", emoji: "🐟" },
};

const IUCN_META: Record<WildlifeSpecies["iucnStatus"], { label: string; color: string }> = {
  LC: { label: "Least Concern", color: "text-emerald-600 dark:text-emerald-400" },
  NT: { label: "Near Threatened", color: "text-amber-600 dark:text-amber-400" },
  VU: { label: "Vulnerable", color: "text-orange-600 dark:text-orange-400" },
  EN: { label: "Endangered", color: "text-red-600 dark:text-red-400" },
  CR: { label: "Critically Endangered", color: "text-red-800 dark:text-red-300" },
};

export const WildlifeGuideModal: React.FC<WildlifeGuideModalProps> = ({ triggerButton }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<string>("all");

  const filtered = sidamaWildlife.filter(w => filter === "all" || w.category === filter);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {triggerButton || <Button variant="outline" className="gap-2"><Footprints className="w-4 h-4 text-primary" />Wildlife Guide</Button>}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400"><Footprints className="w-5 h-5" /></div>
            <div>
              <DialogTitle className="text-xl font-bold">Sidama Wildlife Observation Guide</DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">Mammals, reptiles, and wildlife to spot around Lake Hawassa and Sidama highlands.</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-800/40 rounded-lg p-3 text-xs text-emerald-800 dark:text-emerald-300">
          🌿 Observe all wildlife from a safe, respectful distance. Never feed wild animals or leave food accessible in your accommodation. Responsible wildlife tourism protects both animals and visitors.
        </div>

        <div className="flex gap-1.5 border-b border-border pb-2 flex-wrap">
          {(["all", "mammal", "reptile"] as const).map(f => (
            <Button key={f} size="sm" variant={filter === f ? "default" : "ghost"} className="text-xs h-8 capitalize" onClick={() => setFilter(f)}>
              {f === "all" ? "All Species" : `${CATEGORY_META[f].emoji} ${CATEGORY_META[f].label}s`}
            </Button>
          ))}
        </div>

        <div className="space-y-4">
          {filtered.map(animal => {
            const cat = CATEGORY_META[animal.category];
            const iucn = IUCN_META[animal.iucnStatus];
            return (
              <div key={animal.id} className="rounded-xl border border-border bg-card p-4 space-y-3">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{cat.emoji}</span>
                      <h4 className="font-bold text-foreground">{animal.name}</h4>
                    </div>
                    <p className="text-xs text-muted-foreground italic mt-0.5">{animal.scientificName}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <Badge variant="secondary" className="text-[10px]">{cat.label}</Badge>
                    <span className={`text-[10px] font-semibold ${iucn.color}`}>IUCN: {animal.iucnStatus} – {iucn.label}</span>
                  </div>
                </div>

                <p className="text-sm text-foreground/85 leading-relaxed">{animal.description}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="flex items-start gap-1.5 text-muted-foreground">
                    <Calendar className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                    <span><span className="font-semibold text-foreground">Best months:</span> {animal.bestMonths}</span>
                  </div>
                  <div className="flex items-start gap-1.5 text-muted-foreground">
                    <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                    <span><span className="font-semibold text-foreground">Where seen:</span> {animal.whereSeen.join(", ")}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700/40 rounded-md p-2.5 text-xs text-amber-800 dark:text-amber-300">
                  <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                  <p>{animal.conservationNotes}</p>
                </div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WildlifeGuideModal;
