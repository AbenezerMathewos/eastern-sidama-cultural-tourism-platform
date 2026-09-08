import React, { useState, useEffect } from "react";
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
import { Progress } from "@/components/ui/progress";
import {
  CheckSquare,
  Square,
  RotateCcw,
  Sparkles,
  Shirt,
  Footprints,
  Sun,
  ShieldAlert,
  Camera,
  Luggage,
} from "lucide-react";
import {
  packingItems,
  packingCategories,
  type PackingItem,
} from "@/data/packingChecklist";

interface PackingChecklistModalProps {
  triggerButton?: React.ReactNode;
}

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  clothing: Shirt,
  footwear: Footprints,
  weather: Sun,
  health: ShieldAlert,
  gear: Camera,
  culture: Sparkles,
};

export const PackingChecklistModal: React.FC<PackingChecklistModalProps> = ({
  triggerButton,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [seasonFilter, setSeasonFilter] = useState<"all" | "dry" | "rainy">("all");
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem("sidama_packing_checked");
      if (saved) {
        setCheckedIds(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const toggleItem = (id: string) => {
    setCheckedIds((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      localStorage.setItem("sidama_packing_checked", JSON.stringify(next));
      return next;
    });
  };

  const resetAll = () => {
    setCheckedIds({});
    localStorage.removeItem("sidama_packing_checked");
  };

  const filteredItems = packingItems.filter((item) => {
    if (seasonFilter === "all") return true;
    return item.season === "all" || item.season === seasonFilter;
  });

  const packedCount = filteredItems.filter((i) => checkedIds[i.id]).length;
  const progress = filteredItems.length > 0
    ? Math.round((packedCount / filteredItems.length) * 100)
    : 0;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {triggerButton || (
          <Button variant="outline" className="gap-2">
            <Luggage className="w-4 h-4 text-primary" />
            <span>Travel Packing Checklist</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-primary/10 text-primary">
              <Luggage className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold">
                Sidama Journey Packing Checklist
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                Essential gear, modesty advice, and highland weather preparation.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Filter and Progress */}
        <div className="space-y-4 pt-2">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-muted/40 p-3 rounded-lg border border-border">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Season:
              </span>
              <div className="flex gap-1">
                {(["all", "dry", "rainy"] as const).map((s) => (
                  <Button
                    key={s}
                    size="sm"
                    variant={seasonFilter === s ? "default" : "ghost"}
                    className="h-7 text-xs capitalize"
                    onClick={() => setSeasonFilter(s)}
                  >
                    {s === "all" ? "Year-Round" : `${s} Season`}
                  </Button>
                ))}
              </div>
            </div>

            <Button
              size="sm"
              variant="ghost"
              className="h-7 text-xs text-muted-foreground hover:text-foreground gap-1"
              onClick={resetAll}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </Button>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-medium">
              <span>Preparation Progress ({packedCount}/{filteredItems.length} packed)</span>
              <span className="text-primary font-bold">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Checklist Groups */}
        <div className="space-y-6 pt-2">
          {packingCategories.map((category) => {
            const catItems = filteredItems.filter((i) => i.category === category.key);
            if (catItems.length === 0) return null;
            const Icon = CATEGORY_ICONS[category.key] || Luggage;

            return (
              <div key={category.key} className="space-y-2.5">
                <div className="flex items-center gap-2 border-b border-border pb-1.5">
                  <Icon className="w-4 h-4 text-primary" />
                  <h4 className="font-semibold text-sm">{category.title}</h4>
                  <Badge variant="secondary" className="text-[10px] ml-auto">
                    {catItems.filter((i) => checkedIds[i.id]).length}/{catItems.length}
                  </Badge>
                </div>

                <div className="space-y-2">
                  {catItems.map((item) => {
                    const isChecked = !!checkedIds[item.id];
                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleItem(item.id)}
                        className={`flex items-start gap-3 p-2.5 rounded-md border text-sm cursor-pointer transition-colors ${
                          isChecked
                            ? "bg-primary/5 border-primary/20 text-muted-foreground"
                            : "bg-card border-border hover:bg-muted/40 text-foreground"
                        }`}
                      >
                        <button
                          type="button"
                          className="mt-0.5 text-primary flex-shrink-0"
                          aria-label={isChecked ? "Mark unpacked" : "Mark packed"}
                        >
                          {isChecked ? (
                            <CheckSquare className="w-4 h-4 text-primary" />
                          ) : (
                            <Square className="w-4 h-4 text-muted-foreground" />
                          )}
                        </button>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span
                              className={`font-medium ${
                                isChecked ? "line-through opacity-75" : ""
                              }`}
                            >
                              {item.name}
                            </span>
                            {item.essential && (
                              <span className="text-[10px] bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold px-1.5 py-0.5 rounded">
                                Essential
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {item.notes}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PackingChecklistModal;
