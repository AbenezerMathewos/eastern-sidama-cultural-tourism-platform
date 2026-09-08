import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, CheckCircle2, XCircle, Droplets, Bug, Mountain, Sun, AlertCircle } from "lucide-react";
import { vaccines, healthTips } from "@/data/healthGuide";

interface HealthGuideModalProps { triggerButton?: React.ReactNode; }

const CATEGORY_META = {
  food: { label: "Food Safety", color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-900/10 border-orange-200 dark:border-orange-800/40" },
  water: { label: "Water Safety", color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800/40" },
  insects: { label: "Insects & Malaria", color: "text-green-600", bg: "bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800/40" },
  altitude: { label: "Altitude", color: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-900/10 border-purple-200 dark:border-purple-800/40" },
  general: { label: "General Health", color: "text-primary", bg: "bg-primary/5 border-primary/20" },
};

export const HealthGuideModal: React.FC<HealthGuideModalProps> = ({ triggerButton }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {triggerButton || <Button variant="outline" className="gap-2"><Heart className="w-4 h-4 text-rose-500" />Health & Wellness Guide</Button>}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-rose-100 dark:bg-rose-900/20 text-rose-600"><Heart className="w-5 h-5" /></div>
            <div>
              <DialogTitle className="text-xl font-bold">Health & Wellness Travel Guide</DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">Vaccinations, health precautions, and medical advice for Eastern Sidama.</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Vaccines */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />Recommended Vaccinations</h4>
          <div className="space-y-1.5">
            {vaccines.map((v, i) => (
              <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-md border border-border bg-card text-xs">
                {v.recommended ? <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" /> : <XCircle className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />}
                <div>
                  <span className="font-semibold text-foreground">{v.name}</span>
                  {v.recommended && <Badge className="ml-2 text-[9px] bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border-0 py-0">Recommended</Badge>}
                  <p className="text-muted-foreground mt-0.5">{v.notes}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Health Tips */}
        <div className="space-y-2 pt-1">
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5"><AlertCircle className="w-3.5 h-3.5 text-amber-500" />In-Country Health Precautions</h4>
          <div className="grid grid-cols-1 gap-2">
            {healthTips.map(tip => {
              const meta = CATEGORY_META[tip.category];
              return (
                <div key={tip.id} className={`p-3 rounded-lg border text-xs ${meta.bg}`}>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className={`font-semibold text-sm ${meta.color}`}>{tip.title}</span>
                    <Badge variant="outline" className={`text-[10px] ${meta.color}`}>{meta.label}</Badge>
                  </div>
                  <p className="text-foreground/80 leading-relaxed">{tip.body}</p>
                </div>
              );
            })}
          </div>
        </div>

        <p className="text-[11px] text-muted-foreground border-t border-border pt-3">⚕️ Always consult a certified travel medicine physician at least 4–6 weeks before travel for personalized vaccination and prophylaxis advice.</p>
      </DialogContent>
    </Dialog>
  );
};

export default HealthGuideModal;
