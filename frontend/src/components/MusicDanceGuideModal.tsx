import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Music, Lightbulb, MapPin, Clock } from "lucide-react";
import { sidamaMusicDanceTraditions, type MusicTradition } from "@/data/musicDanceGuide";

interface MusicDanceGuideModalProps { triggerButton?: React.ReactNode; }

const CATEGORY_META: Record<MusicTradition["category"], { label: string; emoji: string; color: string }> = {
  music: { label: "Music", emoji: "🎵", color: "text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/20" },
  dance: { label: "Dance", emoji: "💃", color: "text-rose-700 dark:text-rose-300 bg-rose-100 dark:bg-rose-900/20" },
  instrument: { label: "Instrument", emoji: "🥁", color: "text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/20" },
};

export const MusicDanceGuideModal: React.FC<MusicDanceGuideModalProps> = ({ triggerButton }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<string>("all");

  const filtered = sidamaMusicDanceTraditions.filter(t => filter === "all" || t.category === filter);

  return (
    <Dialog open={isOpen} onOpenChange={v => { setIsOpen(v); if (!v) setFilter("all"); }}>
      <DialogTrigger asChild>
        {triggerButton || <Button variant="outline" className="gap-2"><Music className="w-4 h-4 text-purple-600" />Music & Dance Guide</Button>}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400">
              <Music className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold">Sidama Music & Dance Guide</DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                Traditional songs, dances, and instruments of the Sidama people.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="bg-purple-50 dark:bg-purple-900/10 border border-purple-200 dark:border-purple-800/40 rounded-lg p-3 text-xs text-purple-800 dark:text-purple-300">
          🎶 Sidama performing arts are inseparable from community life — every ceremony, season, and rite of passage has its own musical expression. Music and dance here are not entertainment; they are living language.
        </div>

        {/* Filters */}
        <div className="flex gap-1.5 border-b border-border pb-2 flex-wrap">
          {(["all", "music", "dance", "instrument"] as const).map(f => (
            <Button
              key={f}
              size="sm"
              variant={filter === f ? "default" : "ghost"}
              className="text-xs h-8 capitalize"
              onClick={() => setFilter(f)}
            >
              {f === "all" ? "All Traditions" : `${CATEGORY_META[f].emoji} ${CATEGORY_META[f].label}`}
            </Button>
          ))}
        </div>

        {/* Cards */}
        <div className="space-y-4">
          {filtered.length === 0 && (
            <p className="text-center text-sm text-muted-foreground py-6">No traditions match this filter.</p>
          )}
          {filtered.map(tradition => {
            const meta = CATEGORY_META[tradition.category];
            return (
              <div key={tradition.id} className="rounded-xl border border-border bg-card p-4 space-y-3">
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{meta.emoji}</span>
                      <h4 className="font-bold text-foreground">{tradition.name}</h4>
                    </div>
                    <p className="text-xs text-muted-foreground italic mt-0.5">
                      Sidama: <span className="font-semibold">{tradition.sidamaName}</span>
                    </p>
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${meta.color}`}>
                    {meta.label}
                  </span>
                </div>

                {/* Occasions */}
                <div className="flex flex-wrap gap-1">
                  {tradition.occasion.map((occ, i) => (
                    <Badge key={i} variant="secondary" className="text-[10px]">{occ}</Badge>
                  ))}
                </div>

                {/* Description */}
                <p className="text-sm text-foreground/85 leading-relaxed">{tradition.description}</p>

                {/* Cultural significance */}
                <div className="bg-muted/50 rounded-md p-2.5 text-xs text-muted-foreground leading-relaxed">
                  <span className="font-semibold text-foreground">Cultural significance: </span>
                  {tradition.culturalSignificance}
                </div>

                {/* Where & When */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="flex items-start gap-1.5 text-muted-foreground">
                    <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                    <span><span className="font-semibold text-foreground">Where: </span>{tradition.whereSeen.join(", ")}</span>
                  </div>
                  <div className="flex items-start gap-1.5 text-muted-foreground">
                    <Clock className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                    <span><span className="font-semibold text-foreground">Best time: </span>{tradition.bestTime}</span>
                  </div>
                </div>

                {/* Visitor tip */}
                <div className="flex items-start gap-2 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700/40 rounded-md p-2.5 text-xs text-amber-800 dark:text-amber-300">
                  <Lightbulb className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                  <p>{tradition.tip}</p>
                </div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MusicDanceGuideModal;
