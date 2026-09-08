import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, MapPin, Coins, Leaf } from "lucide-react";
import { sidamaArtisans } from "@/data/sidamaArtisans";

interface ArtisanGuideModalProps { triggerButton?: React.ReactNode; }

export const ArtisanGuideModal: React.FC<ArtisanGuideModalProps> = ({ triggerButton }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {triggerButton || <Button variant="outline" className="gap-2"><ShoppingBag className="w-4 h-4 text-primary" />Artisan & Crafts Guide</Button>}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-primary/10 text-primary"><ShoppingBag className="w-5 h-5" /></div>
            <div>
              <DialogTitle className="text-xl font-bold">Sidama Artisan Crafts & Souvenirs</DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">Authentic handmade goods, where to buy them, and their cultural significance.</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-800/40 rounded-lg p-3 text-xs text-emerald-800 dark:text-emerald-300">
          🌿 Buying directly from artisan cooperatives or host family crafters ensures 100% of your purchase supports the maker&apos;s household. Always ask if a craft is handmade vs. machine-produced.
        </div>

        <div className="space-y-5">
          {sidamaArtisans.map(art => (
            <div key={art.id} className="rounded-xl border border-border bg-card p-4 space-y-3">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h4 className="font-bold text-foreground text-base">{art.craft}</h4>
                  <p className="text-xs text-muted-foreground italic">{art.localName} · {art.region}</p>
                </div>
                <Badge className="text-xs flex items-center gap-1"><Coins className="w-3 h-3" />{art.priceRangeUSD}</Badge>
              </div>

              <p className="text-sm text-foreground/85 leading-relaxed">{art.description}</p>

              {/* Materials */}
              <div>
                <p className="text-xs font-semibold text-foreground mb-1.5 flex items-center gap-1"><Leaf className="w-3.5 h-3.5 text-emerald-500" />Materials</p>
                <div className="flex flex-wrap gap-1">{art.materials.map((m, i) => <Badge key={i} variant="secondary" className="text-[10px]">{m}</Badge>)}</div>
              </div>

              {/* Where to Buy */}
              <div>
                <p className="text-xs font-semibold text-foreground mb-1.5 flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-primary" />Where to Buy</p>
                <ul className="space-y-0.5 text-xs text-muted-foreground">{art.whereToBuy.map((loc, i) => <li key={i} className="flex items-start gap-1"><span className="text-primary flex-shrink-0">•</span>{loc}</li>)}</ul>
              </div>

              {/* Cultural Significance */}
              <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700/40 rounded-md p-2.5 text-xs text-amber-800 dark:text-amber-300">
                <p className="font-semibold mb-0.5">Cultural Significance</p>
                <p className="leading-relaxed">{art.culturalSignificance}</p>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ArtisanGuideModal;
