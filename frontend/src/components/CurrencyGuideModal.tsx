import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Coins, CreditCard, Smartphone, ArrowLeftRight, AlertTriangle, Coffee, MapPin } from "lucide-react";
import { currencyTips, exchangeLocations, ETB_RATE_NOTE, type CurrencyTip } from "@/data/currencyGuide";

const ICON_MAP: Record<string, React.ElementType> = { Coins, CreditCard, Smartphone, ArrowLeftRight, AlertTriangle, Coffee };

interface CurrencyGuideModalProps { triggerButton?: React.ReactNode; }

export const CurrencyGuideModal: React.FC<CurrencyGuideModalProps> = ({ triggerButton }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {triggerButton || <Button variant="outline" className="gap-2"><Coins className="w-4 h-4 text-amber-500" />Currency & Money Guide</Button>}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400"><Coins className="w-5 h-5" /></div>
            <div>
              <DialogTitle className="text-xl font-bold">Currency & Money in Eastern Sidama</DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">ATMs, exchange tips, and cash advice for highland and rural travel.</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Live Rate Note */}
        <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700/40 rounded-lg px-3.5 py-2.5 text-xs text-amber-800 dark:text-amber-300 font-medium">
          💱 {ETB_RATE_NOTE}
        </div>

        {/* Tips */}
        <div className="space-y-2.5 pt-1">
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Essential Money Tips</h4>
          <div className="grid grid-cols-1 gap-2">
            {currencyTips.map((tip: CurrencyTip) => {
              const Icon = ICON_MAP[tip.icon] || Coins;
              const isDanger = tip.icon === "AlertTriangle";
              return (
                <div key={tip.id} className={`flex gap-3 p-3 rounded-lg border text-sm ${isDanger ? "bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800/40" : "bg-card border-border"}`}>
                  <div className={`p-1.5 rounded-md bg-muted flex-shrink-0 mt-0.5 ${isDanger ? "text-red-500" : "text-amber-500"}`}><Icon className="w-4 h-4" /></div>
                  <div>
                    <p className="font-semibold text-foreground mb-0.5">{tip.title}</p>
                    <p className="text-muted-foreground text-xs leading-relaxed">{tip.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Exchange Locations */}
        <div className="space-y-2.5 pt-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-primary" />ATMs & Forex Bureaus Near You</h4>
          <div className="space-y-2">
            {exchangeLocations.map((loc, i) => (
              <div key={i} className="p-3 rounded-lg border border-border bg-card text-xs space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-foreground text-sm">{loc.name}</span>
                  <Badge variant="secondary" className="text-[10px]">{loc.type}</Badge>
                  <Badge variant="outline" className="text-[10px]">{loc.city}</Badge>
                </div>
                <p className="text-muted-foreground">{loc.address}</p>
                <p className="text-foreground/80">{loc.notes}</p>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CurrencyGuideModal;
