import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, ShieldAlert, Heart, Building2, MapPin, Info } from "lucide-react";
import { emergencyContacts, safetyTips, type EmergencyContact } from "@/data/safetyContacts";

interface TravelerSafetyModalProps { triggerButton?: React.ReactNode; }

const categoryMeta: Record<EmergencyContact["category"], { label: string; color: string; Icon: React.ElementType }> = {
  emergency: { label: "Emergency", color: "text-red-600 dark:text-red-400", Icon: ShieldAlert },
  health: { label: "Health", color: "text-emerald-600 dark:text-emerald-400", Icon: Heart },
  tourism: { label: "Tourism", color: "text-blue-600 dark:text-blue-400", Icon: MapPin },
  embassy: { label: "Embassy", color: "text-purple-600 dark:text-purple-400", Icon: Building2 },
};

export const TravelerSafetyModal: React.FC<TravelerSafetyModalProps> = ({ triggerButton }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | EmergencyContact["category"]>("all");

  const filtered = emergencyContacts.filter(c => filter === "all" || c.category === filter);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {triggerButton || <Button variant="outline" className="gap-2"><ShieldAlert className="w-4 h-4 text-red-500" />Safety & Emergency Contacts</Button>}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400"><ShieldAlert className="w-5 h-5" /></div>
            <div>
              <DialogTitle className="text-xl font-bold">Traveler Safety & Emergency Contacts</DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">Essential numbers and safety advice for visiting Eastern Sidama.</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Safety Tips */}
        <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/40 rounded-lg p-3 space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 flex items-center gap-1.5"><Info className="w-3.5 h-3.5" />Safety Tips for Sidama Travelers</p>
          <ul className="space-y-2">
            {safetyTips.map((tip, i) => (
              <li key={i} className="text-xs text-foreground/90"><span className="font-semibold">{tip.title}: </span>{tip.body}</li>
            ))}
          </ul>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-1.5 border-b border-border pb-2">
          {(["all", "emergency", "health", "tourism", "embassy"] as const).map(f => (
            <Button key={f} size="sm" variant={filter === f ? "default" : "ghost"} className="h-7 text-xs capitalize" onClick={() => setFilter(f)}>
              {f === "all" ? "All Contacts" : categoryMeta[f].label}
            </Button>
          ))}
        </div>

        {/* Contact Cards */}
        <div className="space-y-2">
          {filtered.map(contact => {
            const meta = categoryMeta[contact.category];
            const Icon = meta.Icon;
            return (
              <div key={contact.id} className="flex items-start gap-3 p-3 rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors">
                <div className={`p-1.5 rounded-md bg-muted mt-0.5 ${meta.color}`}><Icon className="w-4 h-4" /></div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-0.5">
                    <span className="font-semibold text-sm text-foreground">{contact.name}</span>
                    <Badge variant="outline" className={`text-[10px] ${meta.color}`}>{meta.label}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">{contact.description}</p>
                  <div className="flex flex-wrap gap-3 text-xs">
                    <a href={`tel:${contact.number.replace(/\s/g, "")}`} className="flex items-center gap-1 text-primary hover:underline font-mono"><Phone className="w-3 h-3" />{contact.number}</a>
                    <span className="text-muted-foreground">{contact.available}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TravelerSafetyModal;
