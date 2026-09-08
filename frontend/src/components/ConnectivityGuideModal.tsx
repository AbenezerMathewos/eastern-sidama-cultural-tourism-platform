import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wifi, Signal, AlertTriangle, Smartphone } from "lucide-react";
import { connectivityGuide, techTips } from "@/data/connectivityGuide";

interface ConnectivityGuideModalProps { triggerButton?: React.ReactNode; }

const COVERAGE_META = {
  excellent: { label: "Excellent", color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-500", bars: 4 },
  good: { label: "Good", color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-500", bars: 3 },
  limited: { label: "Limited", color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-500", bars: 2 },
  none: { label: "No Signal", color: "text-red-600 dark:text-red-400", bg: "bg-red-500", bars: 0 },
};

const SignalBars: React.FC<{ level: number }> = ({ level }) => (
  <div className="flex items-end gap-0.5 h-4">
    {[1,2,3,4].map(i => (
      <div key={i} className={`w-1 rounded-sm transition-colors ${i <= level ? "bg-primary" : "bg-muted"}`} style={{ height: `${i * 25}%` }} />
    ))}
  </div>
);

export const ConnectivityGuideModal: React.FC<ConnectivityGuideModalProps> = ({ triggerButton }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState<"coverage" | "tips">("coverage");

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {triggerButton || <Button variant="outline" className="gap-2"><Wifi className="w-4 h-4 text-primary" />Connectivity Guide</Button>}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-primary/10 text-primary"><Signal className="w-5 h-5" /></div>
            <div>
              <DialogTitle className="text-xl font-bold">Internet & Connectivity Guide</DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">Mobile data, Wi-Fi coverage, and digital preparation tips for Eastern Sidama.</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800/40 rounded-lg p-3 text-xs text-blue-800 dark:text-blue-300">
          📡 Ethio Telecom is Ethiopia&apos;s dominant carrier. Buy a SIM at Bole Airport (passport required). A 20 GB data bundle costs ~300 ETB (\$2.30). Safaricom Ethiopia is expanding but still limited in Sidama.
        </div>

        <div className="flex gap-1 border-b border-border pb-2">
          <Button size="sm" variant={tab === "coverage" ? "default" : "ghost"} className="text-xs h-8" onClick={() => setTab("coverage")}>Area Coverage</Button>
          <Button size="sm" variant={tab === "tips" ? "default" : "ghost"} className="text-xs h-8" onClick={() => setTab("tips")}>Tech Tips</Button>
        </div>

        {tab === "coverage" && (
          <div className="space-y-3">
            {connectivityGuide.map((area, i) => {
              const cm = COVERAGE_META[area.coverage];
              return (
                <div key={i} className="rounded-xl border border-border bg-card p-3.5 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <SignalBars level={cm.bars} />
                      <div>
                        <h4 className="font-bold text-sm text-foreground">{area.area}</h4>
                        <span className={`text-xs font-medium ${cm.color}`}>{cm.label} Coverage</span>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-[10px] font-mono">{area.typicalSpeedMbps}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{area.notes}</p>
                  <div className="flex flex-wrap gap-1">
                    {area.providers.map((p, j) => <Badge key={j} variant="outline" className="text-[10px]">{p}</Badge>)}
                  </div>
                </div>
              );
            })}
            <div className="flex items-start gap-2 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700/40 rounded-lg p-3 text-xs text-amber-800 dark:text-amber-300">
              <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
              <p>Coverage data is approximate. Signal quality varies with terrain, weather, and network congestion. Always prepare for offline conditions in highland woredas.</p>
            </div>
          </div>
        )}

        {tab === "tips" && (
          <div className="space-y-3">
            {techTips.map((tip, i) => (
              <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl border border-border bg-card">
                <div className="p-1.5 rounded-md bg-primary/10 text-primary flex-shrink-0 mt-0.5"><Smartphone className="w-4 h-4" /></div>
                <div>
                  <p className="font-semibold text-sm text-foreground mb-0.5">{tip.title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{tip.body}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ConnectivityGuideModal;
