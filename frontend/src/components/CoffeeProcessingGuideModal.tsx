import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Coffee, ChevronRight, MapPin, Award } from "lucide-react";
import { coffeeProcesses, sidamaFarms } from "@/data/coffeeProcessing";

interface CoffeeProcessingGuideModalProps { triggerButton?: React.ReactNode; }

export const CoffeeProcessingGuideModal: React.FC<CoffeeProcessingGuideModalProps> = ({ triggerButton }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState<"processes" | "farms">("processes");
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {triggerButton || <Button variant="outline" className="gap-2"><Coffee className="w-4 h-4 text-amber-700" />Coffee Processing Guide</Button>}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400"><Coffee className="w-5 h-5" /></div>
            <div>
              <DialogTitle className="text-xl font-bold">Sidama Coffee Processing & Farm Guide</DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">From cherry to cup — understand washed, natural, and honey methods at source.</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="flex gap-1 border-b border-border pb-2">
          <Button size="sm" variant={tab === "processes" ? "default" : "ghost"} className="text-xs h-8" onClick={() => setTab("processes")}>Processing Methods</Button>
          <Button size="sm" variant={tab === "farms" ? "default" : "ghost"} className="text-xs h-8" onClick={() => setTab("farms")}>Farm Profiles</Button>
        </div>

        {tab === "processes" && (
          <div className="space-y-4">
            {coffeeProcesses.map(proc => (
              <div key={proc.id} className="rounded-xl border border-border bg-card overflow-hidden">
                <button className="w-full text-left p-4 hover:bg-muted/30 transition-colors flex items-center justify-between" onClick={() => setExpanded(expanded === proc.id ? null : proc.id)}>
                  <div>
                    <h4 className="font-bold text-foreground">{proc.name}</h4>
                    <p className="text-xs text-muted-foreground italic">{proc.localName}</p>
                  </div>
                  <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${expanded === proc.id ? "rotate-90" : ""}`} />
                </button>
                {expanded === proc.id && (
                  <div className="px-4 pb-4 space-y-3 border-t border-border/50 pt-3">
                    <p className="text-sm text-foreground/85 leading-relaxed">{proc.description}</p>
                    <div>
                      <p className="text-xs font-semibold text-foreground mb-1.5">Flavor Profile</p>
                      <div className="flex flex-wrap gap-1">{proc.flavorProfile.map((f,i) => <Badge key={i} variant="secondary" className="text-[10px]">{f}</Badge>)}</div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground mb-1.5">Processing Steps</p>
                      <ol className="space-y-1 text-xs text-muted-foreground">{proc.steps.map((s,i) => <li key={i} className="flex items-start gap-1.5"><span className="font-bold text-primary flex-shrink-0">{i+1}.</span>{s}</li>)}</ol>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground mb-1.5 flex items-center gap-1"><MapPin className="w-3 h-3 text-primary" />Where to Experience This in Sidama</p>
                      <div className="flex flex-wrap gap-1">{proc.sidamaOrigins.map((o,i) => <Badge key={i} variant="outline" className="text-[10px]">{o}</Badge>)}</div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {tab === "farms" && (
          <div className="space-y-4">
            {sidamaFarms.map(farm => (
              <div key={farm.id} className="rounded-xl border border-border bg-card p-4 space-y-3">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-foreground">{farm.name}</h4>
                    <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3 text-primary" />{farm.location} · {farm.altitude}</p>
                  </div>
                  <Badge variant="secondary" className="text-[10px]">{farm.cooperativeSize}</Badge>
                </div>
                <p className="text-xs text-foreground/85 leading-relaxed">{farm.description}</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div><p className="font-semibold text-foreground mb-1">Processes</p><div className="flex flex-wrap gap-1">{farm.processes.map((p,i) => <Badge key={i} variant="outline" className="text-[10px]">{p}</Badge>)}</div></div>
                  <div><p className="font-semibold text-foreground mb-1 flex items-center gap-1"><Award className="w-3 h-3 text-amber-500" />Certifications</p><div className="flex flex-wrap gap-1">{farm.certifications.map((c,i) => <Badge key={i} className="text-[10px] bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border-0">{c}</Badge>)}</div></div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800/40 rounded p-2 text-xs text-blue-800 dark:text-blue-300">🧭 {farm.visitInfo}</div>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CoffeeProcessingGuideModal;
