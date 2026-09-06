import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { UtensilsCrossed, Search, Sparkles, HeartHandshake, Coffee, Leaf } from 'lucide-react';
import { SIDAMA_CUISINE, CUISINE_DIETARY_OPTIONS, CulinaryDish } from '@/data/sidamaCuisine';

interface CulinaryGuideModalProps {
  triggerButton?: React.ReactNode;
}

export const CulinaryGuideModal: React.FC<CulinaryGuideModalProps> = ({ triggerButton }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDiet, setSelectedDiet] = useState<string>('all');
  const [expandedDishId, setExpandedDishId] = useState<string | null>(null);

  const filteredDishes = SIDAMA_CUISINE.filter((dish: CulinaryDish) => {
    const matchesDiet =
      selectedDiet === 'all' ||
      dish.dietary.includes(selectedDiet as any);

    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesDiet;

    const matchesSearch =
      dish.name.toLowerCase().includes(q) ||
      dish.sidamaName.toLowerCase().includes(q) ||
      dish.description.toLowerCase().includes(q) ||
      dish.ingredients.some((ing) => ing.toLowerCase().includes(q));

    return matchesDiet && matchesSearch;
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {triggerButton || (
          <Button variant="outline" size="sm" className="gap-2">
            <UtensilsCrossed className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Sidama Culinary Guide</span>
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="max-w-3xl max-h-[88vh] flex flex-col p-6 overflow-hidden">
        <DialogHeader className="pb-3 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <UtensilsCrossed className="w-6 h-6" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold flex items-center gap-2">
                Sidama Traditional Cuisine & Gastronomy Guide
                <Badge variant="secondary" className="text-xs bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                  Enset & Highland Flavors
                </Badge>
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground mt-0.5">
                Discover indigenous dishes, sacred Enset preparations, and authentic hospitality traditions.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Search & Dietary Filters */}
        <div className="py-3 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes, ingredients (e.g. Enset, Bulla, Butter, Honey)..."
              className="pl-9 h-9 text-sm"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {CUISINE_DIETARY_OPTIONS.map((opt) => (
              <Button
                key={opt.id}
                variant={selectedDiet === opt.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedDiet(opt.id)}
                className="h-7 text-xs px-2.5 rounded-full"
              >
                {opt.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Dishes List */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-4">
          {filteredDishes.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground">
              <Sparkles className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p>No dishes found matching your criteria.</p>
            </div>
          ) : (
            filteredDishes.map((dish) => {
              const isExpanded = expandedDishId === dish.id;

              return (
                <div
                  key={dish.id}
                  className="p-4 rounded-xl border border-border bg-card/60 hover:bg-card transition-all shadow-sm"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-bold text-base text-foreground">{dish.name}</h3>
                      <p className="text-xs font-serif italic text-emerald-600 dark:text-emerald-400 mt-0.5">
                        Native Name: {dish.sidamaName}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 flex-wrap">
                      {dish.dietary.map((d) => (
                        <Badge
                          key={d}
                          variant="outline"
                          className="text-[10px] capitalize border-emerald-500/30 text-emerald-700 dark:text-emerald-300"
                        >
                          {d.replace('-', ' ')}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed my-2">
                    {dish.description}
                  </p>

                  <div className="flex items-center gap-2 flex-wrap text-xs text-muted-foreground mb-2">
                    <span className="font-semibold text-foreground flex items-center gap-1">
                      <Leaf className="w-3.5 h-3.5 text-emerald-500" /> Ingredients:
                    </span>
                    {dish.ingredients.map((ing, i) => (
                      <span
                        key={i}
                        className="bg-muted px-2 py-0.5 rounded text-[11px] text-foreground/80"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>

                  {/* Expandable Details */}
                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-border/80 space-y-2.5 text-xs animate-in fade-in duration-200">
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">Cultural Significance & Roots</h4>
                        <p className="text-muted-foreground leading-relaxed">
                          {dish.culturalContext}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        <div className="bg-muted/40 p-2.5 rounded-lg border border-border/60">
                          <div className="flex items-center gap-1.5 font-semibold text-foreground mb-1">
                            <Coffee className="w-3.5 h-3.5 text-amber-500" />
                            <span>Recommended Pairing</span>
                          </div>
                          <p className="text-muted-foreground text-[11px]">{dish.pairingRecommendation}</p>
                        </div>

                        <div className="bg-muted/40 p-2.5 rounded-lg border border-border/60">
                          <div className="flex items-center gap-1.5 font-semibold text-foreground mb-1">
                            <HeartHandshake className="w-3.5 h-3.5 text-emerald-500" />
                            <span>Dining Etiquette</span>
                          </div>
                          <p className="text-muted-foreground text-[11px]">{dish.etiquetteTip}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-2 flex justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs h-7 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700"
                      onClick={() => setExpandedDishId(isExpanded ? null : dish.id)}
                    >
                      {isExpanded ? 'Hide Details' : 'View Cultural Context & Pairings →'}
                    </Button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CulinaryGuideModal;
