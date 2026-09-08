import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bed, CheckCircle2, Info, Coins, Star } from "lucide-react";
import { accommodationTypes } from "@/data/accommodationTypes";

interface AccommodationGuideModalProps { triggerButton?: React.ReactNode; }

export const AccommodationGuideModal: React.FC<AccommodationGuideModalProps> = ({ triggerButton }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const acc = accommodationTypes.find(a => a.id === selected) || null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {triggerButton || <Button variant="outline" className="gap-2"><Bed className="w-4 h-4 text-primary" />Accommodation Guide</Button>}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-primary/10 text-primary"><Bed className="w-5 h-5" /></div>
            <div>
              <DialogTitle className="text-xl font-bold">Where to Stay in Eastern Sidama</DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">From community homestays to eco-lodges – options for every budget and travel style.</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {!acc ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {accommodationTypes.map(type => (
              <button key={type.id} onClick={() => setSelected(type.id)} className="text-left p-4 rounded-xl border border-border bg-card hover:bg-muted/40 hover:border-primary/40 transition-all group">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">{type.type}</h4>
                  <Badge variant="secondary" className="text-[10px] whitespace-nowrap">{type.typicalCostUSD}</Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">{type.description}</p>
                <p className="text-xs text-primary mt-2 font-medium">Tap to learn more →</p>
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-4 pt-1">
            <Button variant="ghost" size="sm" className="text-xs h-7 -ml-1" onClick={() => setSelected(null)}>← Back to all types</Button>

            <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-bold text-foreground">{acc.type}</h3>
                <Badge className="text-xs flex items-center gap-1"><Coins className="w-3 h-3" />{acc.typicalCostUSD}</Badge>
                <span className="text-xs text-muted-foreground">({acc.typicalCostETB})</span>
              </div>
              <p className="text-sm text-foreground/90 leading-relaxed">{acc.description}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-muted/30 border border-border">
                <p className="font-semibold mb-1.5 text-foreground flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-500" />Best For</p>
                <ul className="space-y-1">{acc.bestFor.map((b,i) => <li key={i} className="text-muted-foreground flex items-start gap-1"><span className="text-primary mt-0.5">•</span>{b}</li>)}</ul>
              </div>
              <div className="p-3 rounded-lg bg-muted/30 border border-border">
                <p className="font-semibold mb-1.5 text-foreground flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />Amenities</p>
                <ul className="space-y-1">{acc.amenities.map((a,i) => <li key={i} className="text-muted-foreground flex items-start gap-1"><span className="text-emerald-500 mt-0.5">✓</span>{a}</li>)}</ul>
              </div>
            </div>

            <div className="p-3 rounded-lg border border-border bg-card text-xs">
              <p className="font-semibold text-foreground mb-1.5">Examples in Eastern Sidama</p>
              <div className="flex flex-wrap gap-1.5">{acc.examples.map((e,i) => <Badge key={i} variant="outline" className="text-[11px]">{e}</Badge>)}</div>
            </div>

            <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800/40 text-xs">
              <p className="font-semibold text-blue-700 dark:text-blue-300 flex items-center gap-1 mb-1"><Info className="w-3.5 h-3.5" />Booking Tip</p>
              <p className="text-foreground/80 leading-relaxed">{acc.bookingTips}</p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AccommodationGuideModal;
