import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Map, Clock, DollarSign, Sun, Leaf, Zap, Star, ChevronDown, ChevronUp } from "lucide-react";
import { suggestedItineraries, type SuggestedItinerary } from "@/data/suggestedItineraries";

interface ItineraryModalProps { triggerButton?: React.ReactNode; }

const difficultyMeta = {
  easy: { label: "Easy", color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-100 dark:bg-emerald-900/20", Icon: Leaf },
  moderate: { label: "Moderate", color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-100 dark:bg-amber-900/20", Icon: Sun },
  challenging: { label: "Challenging", color: "text-red-600 dark:text-red-400", bg: "bg-red-100 dark:bg-red-900/20", Icon: Zap },
};

export const ItineraryModal: React.FC<ItineraryModalProps> = ({ triggerButton }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<SuggestedItinerary | null>(null);
  const [expandedDay, setExpandedDay] = useState<number | null>(null);

  return (
    <Dialog open={isOpen} onOpenChange={v => { setIsOpen(v); if (!v) { setSelected(null); setExpandedDay(null); } }}>
      <DialogTrigger asChild>
        {triggerButton || <Button variant="outline" className="gap-2"><Map className="w-4 h-4 text-primary" />Suggested Itineraries</Button>}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-primary/10 text-primary"><Map className="w-5 h-5" /></div>
            <div>
              <DialogTitle className="text-xl font-bold">Curated Sidama Travel Itineraries</DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">Day-by-day plans crafted by local guides for meaningful, immersive journeys.</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {!selected ? (
          <div className="space-y-3 pt-2">
            {suggestedItineraries.map(itin => {
              const diff = difficultyMeta[itin.difficulty];
              const DiffIcon = diff.Icon;
              return (
                <button key={itin.id} onClick={() => setSelected(itin)} className="w-full text-left p-4 rounded-xl border border-border bg-card hover:bg-muted/40 hover:border-primary/30 transition-all group space-y-2">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h4 className="font-bold text-foreground group-hover:text-primary transition-colors">{itin.title}</h4>
                    <div className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${diff.bg} ${diff.color}`}><DiffIcon className="w-3 h-3" />{diff.label}</div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{itin.overview}</p>
                  <div className="flex flex-wrap gap-2 pt-1 text-xs">
                    <span className="flex items-center gap-1 text-muted-foreground"><Clock className="w-3 h-3 text-primary" />{itin.duration}</span>
                    <span className="flex items-center gap-1 text-muted-foreground"><DollarSign className="w-3 h-3 text-primary" />{itin.totalCostUSD}</span>
                    <span className="flex items-center gap-1 text-muted-foreground"><Sun className="w-3 h-3 text-primary" />{itin.bestSeason}</span>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="space-y-4 pt-1">
            <Button variant="ghost" size="sm" className="text-xs h-7 -ml-1" onClick={() => { setSelected(null); setExpandedDay(null); }}>← Back to itineraries</Button>

            <div className="p-4 rounded-xl border border-primary/20 bg-primary/5">
              <h3 className="text-lg font-bold text-foreground mb-1">{selected.title}</h3>
              <p className="text-sm text-foreground/80 leading-relaxed mb-3">{selected.overview}</p>
              <div className="flex flex-wrap gap-2 text-xs">
                <Badge className="gap-1"><Clock className="w-3 h-3" />{selected.duration}</Badge>
                <Badge variant="secondary" className="gap-1"><DollarSign className="w-3 h-3" />{selected.totalCostUSD}</Badge>
                <Badge variant="outline" className="gap-1"><Sun className="w-3 h-3" />Best: {selected.bestSeason}</Badge>
              </div>
            </div>

            <div className="space-y-2">
              {selected.schedule.map(day => (
                <div key={day.day} className="rounded-lg border border-border overflow-hidden">
                  <button className="w-full flex items-center justify-between p-3 bg-muted/30 hover:bg-muted/60 transition-colors text-left" onClick={() => setExpandedDay(expandedDay === day.day ? null : day.day)}>
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center flex-shrink-0">{day.day}</span>
                      <div>
                        <p className="font-semibold text-sm text-foreground">{day.title}</p>
                        <p className="text-xs text-muted-foreground">{day.location}</p>
                      </div>
                    </div>
                    {expandedDay === day.day ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                  </button>
                  {expandedDay === day.day && (
                    <div className="p-3 border-t border-border space-y-3 text-xs">
                      <div className="flex items-start gap-1.5 text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/10 p-2 rounded-md border border-amber-200 dark:border-amber-800/40"><Star className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" /><p className="font-medium">{day.highlight}</p></div>
                      <div><p className="font-semibold text-foreground mb-1">Activities</p><ul className="space-y-0.5">{day.activities.map((a,i) => <li key={i} className="text-muted-foreground flex items-start gap-1"><span className="text-primary">•</span>{a}</li>)}</ul></div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div><p className="font-semibold text-foreground mb-0.5">Meals</p><p className="text-muted-foreground">{day.meals}</p></div>
                        <div><p className="font-semibold text-foreground mb-0.5">Sleep</p><p className="text-muted-foreground">{day.accommodation}</p></div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ItineraryModal;
