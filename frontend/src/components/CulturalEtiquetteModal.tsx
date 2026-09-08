import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, CheckCircle2, XCircle, Camera, Coffee, Users, HandMetal } from "lucide-react";
import { dressCodeRules, culturalProtocols } from "@/data/culturalEtiquette";

interface CulturalEtiquetteModalProps { triggerButton?: React.ReactNode; }

const CATEGORY_ICONS: Record<string, React.ElementType> = { greetings: Users, hospitality: Coffee, ceremonies: HandMetal, photography: Camera, general: BookOpen };

export const CulturalEtiquetteModal: React.FC<CulturalEtiquetteModalProps> = ({ triggerButton }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState<"dress" | "protocols">("dress");

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {triggerButton || <Button variant="outline" className="gap-2"><BookOpen className="w-4 h-4 text-primary" />Cultural Etiquette Guide</Button>}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-primary/10 text-primary"><BookOpen className="w-5 h-5" /></div>
            <div>
              <DialogTitle className="text-xl font-bold">Sidama Cultural Etiquette & Respect</DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">Dress codes, hospitality protocols, and community respect guidelines for visitors.</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="flex gap-1 border-b border-border pb-2">
          <Button size="sm" variant={tab === "dress" ? "default" : "ghost"} className="text-xs h-8" onClick={() => setTab("dress")}>Dress Codes</Button>
          <Button size="sm" variant={tab === "protocols" ? "default" : "ghost"} className="text-xs h-8" onClick={() => setTab("protocols")}>Cultural Protocols</Button>
        </div>

        {tab === "dress" && (
          <div className="space-y-4">
            {dressCodeRules.map(rule => (
              <div key={rule.id} className="rounded-xl border border-border bg-card p-4 space-y-3">
                <h4 className="font-bold text-foreground">{rule.context}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mb-1.5"><CheckCircle2 className="w-3.5 h-3.5" />Guidelines</p>
                    <ul className="space-y-1">{rule.guidelines.map((g,i) => <li key={i} className="text-muted-foreground flex items-start gap-1"><span className="text-emerald-500 flex-shrink-0">•</span>{g}</li>)}</ul>
                  </div>
                  <div>
                    <p className="font-semibold text-red-600 dark:text-red-400 flex items-center gap-1 mb-1.5"><XCircle className="w-3.5 h-3.5" />Avoid</p>
                    <ul className="space-y-1">{rule.doNots.map((d,i) => <li key={i} className="text-muted-foreground flex items-start gap-1"><span className="text-red-500 flex-shrink-0">✗</span>{d}</li>)}</ul>
                  </div>
                </div>
                {rule.notes && <p className="text-xs bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700/40 rounded-md p-2 text-amber-800 dark:text-amber-300 italic">💡 {rule.notes}</p>}
              </div>
            ))}
          </div>
        )}

        {tab === "protocols" && (
          <div className="space-y-4">
            {culturalProtocols.map(protocol => {
              const Icon = CATEGORY_ICONS[protocol.category] || BookOpen;
              return (
                <div key={protocol.id} className="rounded-xl border border-border bg-card p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-primary/10 text-primary"><Icon className="w-4 h-4" /></div>
                    <h4 className="font-bold text-foreground">{protocol.title}</h4>
                    <Badge variant="secondary" className="text-[10px] ml-auto capitalize">{protocol.category}</Badge>
                  </div>
                  <p className="text-xs text-foreground/80 leading-relaxed">{protocol.description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <p className="font-semibold text-emerald-600 dark:text-emerald-400 mb-1 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" />Do</p>
                      <ul className="space-y-1">{protocol.dos.map((d,i) => <li key={i} className="text-muted-foreground flex items-start gap-1"><span className="text-emerald-500 flex-shrink-0">•</span>{d}</li>)}</ul>
                    </div>
                    <div>
                      <p className="font-semibold text-red-600 dark:text-red-400 mb-1 flex items-center gap-1"><XCircle className="w-3.5 h-3.5" />Don't</p>
                      <ul className="space-y-1">{protocol.donts.map((d,i) => <li key={i} className="text-muted-foreground flex items-start gap-1"><span className="text-red-500 flex-shrink-0">✗</span>{d}</li>)}</ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CulturalEtiquetteModal;
