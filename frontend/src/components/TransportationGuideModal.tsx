import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Bus,
  Plane,
  Car,
  MapPin,
  Compass,
  Coins,
  ShieldCheck,
  Clock,
  Navigation as NavigationIcon,
} from "lucide-react";
import {
  TRANSIT_OPTIONS,
  TRANSIT_HUBS,
  type TransitOption,
} from "@/data/transportationGuide";

interface TransportationGuideModalProps {
  triggerButton?: React.ReactNode;
}

export const TransportationGuideModal: React.FC<TransportationGuideModalProps> = ({
  triggerButton,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredOptions = TRANSIT_OPTIONS.filter((opt) => {
    if (selectedCategory === "all") return true;
    return opt.category === selectedCategory;
  });

  const getCategoryIcon = (category: TransitOption["category"]) => {
    switch (category) {
      case "air":
        return <Plane className="w-4 h-4 text-sky-500" />;
      case "intercity":
        return <Bus className="w-4 h-4 text-emerald-500" />;
      case "highland":
        return <Compass className="w-4 h-4 text-amber-500" />;
      case "urban":
      default:
        return <Car className="w-4 h-4 text-primary" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {triggerButton || (
          <Button variant="outline" className="gap-2">
            <Bus className="w-4 h-4 text-primary" />
            <span>Transit & Getting Around</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-primary/10 text-primary">
              <NavigationIcon className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold">
                Eastern Sidama Transit & Travel Guide
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                How to navigate between Hawassa, Yirgalem, and remote coffee woredas safely and affordably.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-1.5 pt-2 border-b border-border pb-3">
          {[
            { key: "all", label: "All Modes" },
            { key: "urban", label: "Urban Bajaj" },
            { key: "intercity", label: "Minibus & Coaster" },
            { key: "highland", label: "Highland 4WD" },
            { key: "air", label: "Flights" },
          ].map((tab) => (
            <Button
              key={tab.key}
              size="sm"
              variant={selectedCategory === tab.key ? "default" : "outline"}
              className="text-xs h-7"
              onClick={() => setSelectedCategory(tab.key)}
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Transit Cards */}
        <div className="space-y-4 pt-1">
          {filteredOptions.map((opt) => (
            <Card key={opt.id} className="border border-border/80 shadow-sm">
              <CardContent className="p-4 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/50 pb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-md bg-muted">
                      {getCategoryIcon(opt.category)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-base text-foreground">
                        {opt.name}
                      </h4>
                      <span className="text-xs text-muted-foreground">
                        {opt.localName}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs flex items-center gap-1 font-mono">
                      <Coins className="w-3 h-3 text-amber-500" />
                      {opt.costUSD}
                    </Badge>
                  </div>
                </div>

                <p className="text-sm text-foreground/90 leading-relaxed">
                  {opt.bestFor}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-muted/30 p-2.5 rounded-md border border-border/40">
                  <div className="flex items-center gap-1.5">
                    <Coins className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    <span className="font-medium text-foreground">Tariff:</span>
                    <span className="text-muted-foreground">{opt.typicalCostETB}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    <span className="font-medium text-foreground">Hours:</span>
                    <span className="text-muted-foreground truncate">{opt.availability}</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-xs font-semibold text-foreground flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    Local Driver & Safety Tips:
                  </span>
                  <ul className="text-xs text-muted-foreground space-y-1 pl-4 list-disc">
                    {opt.safetyTips.map((tip, idx) => (
                      <li key={idx}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Major Transit Hubs Summary */}
        <div className="mt-4 p-4 rounded-lg bg-muted/40 border border-border space-y-2.5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-primary" />
            Key Regional Transit Stations & Hubs
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {TRANSIT_HUBS.map((hub) => (
              <div key={hub.name} className="p-2.5 rounded bg-background border border-border/60 text-xs">
                <span className="font-semibold text-foreground block">{hub.name}</span>
                <span className="text-muted-foreground text-[11px] block">{hub.type} • {hub.city}</span>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {hub.routesServed.map((route) => (
                    <span key={route} className="bg-primary/10 text-primary text-[10px] px-1.5 py-0.5 rounded">
                      {route}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TransportationGuideModal;
