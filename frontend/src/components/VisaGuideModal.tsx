import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Globe, CheckCircle2, AlertCircle } from "lucide-react";
import { visaRequirements, entryRequirements } from "@/data/visaRequirements";

interface VisaGuideModalProps { triggerButton?: React.ReactNode; }

export const VisaGuideModal: React.FC<VisaGuideModalProps> = ({ triggerButton }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState<"visa" | "entry">("visa");

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {triggerButton || <Button variant="outline" className="gap-2"><FileText className="w-4 h-4 text-primary" />Visa & Entry Guide</Button>}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-primary/10 text-primary"><Globe className="w-5 h-5" /></div>
            <div>
              <DialogTitle className="text-xl font-bold">Ethiopia Visa & Entry Requirements</DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">eVisa information, on-arrival options, and entry documentation for Eastern Sidama visitors.</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800/40 rounded-lg p-3 text-xs text-blue-800 dark:text-blue-300">
          ℹ️ Always verify current visa requirements with the <span className="font-semibold">Ethiopian Embassy or Consulate</span> in your country or at <span className="font-mono">evisa.gov.et</span> before travel. Policies can change without notice.
        </div>

        <div className="flex gap-1 border-b border-border pb-2">
          <Button size="sm" variant={tab === "visa" ? "default" : "ghost"} className="text-xs h-8" onClick={() => setTab("visa")}>Visa Categories</Button>
          <Button size="sm" variant={tab === "entry" ? "default" : "ghost"} className="text-xs h-8" onClick={() => setTab("entry")}>Entry Documents</Button>
        </div>

        {tab === "visa" && (
          <div className="space-y-4">
            {visaRequirements.map((vr, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-4 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="font-bold text-foreground">{vr.countryGroup}</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {vr.canApplyOnline && <Badge className="text-[10px] bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border-0">Online Application</Badge>}
                    {vr.canApplyOnArrival && <Badge className="text-[10px] bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-0">On Arrival</Badge>}
                    {!vr.canApplyOnline && !vr.canApplyOnArrival && <Badge variant="secondary" className="text-[10px]">Visa-Free</Badge>}
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs bg-muted/30 p-2.5 rounded-lg border border-border/40">
                  <div><p className="font-semibold text-foreground">{vr.fee}</p><p className="text-muted-foreground">Fee</p></div>
                  <div><p className="font-semibold text-foreground">{vr.maxStayDays} days</p><p className="text-muted-foreground">Max stay</p></div>
                  <div className="col-span-2"><p className="font-semibold text-foreground">{vr.processingDays}</p><p className="text-muted-foreground">Processing</p></div>
                </div>

                <p className="text-xs text-foreground/80 leading-relaxed">{vr.notes}</p>

                <div>
                  <p className="text-xs font-semibold text-foreground mb-1">Countries in this group</p>
                  <div className="flex flex-wrap gap-1">{vr.countries.map((c, j) => <Badge key={j} variant="outline" className="text-[10px]">{c}</Badge>)}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "entry" && (
          <div className="space-y-3">
            {entryRequirements.map((req, i) => (
              <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl border border-border bg-card">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm text-foreground mb-0.5">{req.title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{req.detail}</p>
                </div>
              </div>
            ))}
            <div className="flex items-start gap-3 p-3.5 rounded-xl border border-amber-200 dark:border-amber-700/40 bg-amber-50 dark:bg-amber-900/10 text-xs">
              <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
              <p className="text-amber-800 dark:text-amber-300">Requirements may change. Check the Ethiopian Immigration and Citizenship Service at <span className="font-mono">immigration.gov.et</span> or your country&apos;s embassy website within 2 weeks of travel.</p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default VisaGuideModal;
