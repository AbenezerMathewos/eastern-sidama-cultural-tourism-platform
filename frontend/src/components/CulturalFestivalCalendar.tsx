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
import { Calendar, Sparkles, MapPin, Clock, Search, Info, Award, CheckCircle } from 'lucide-react';
import { SIDAMA_FESTIVALS, FESTIVAL_CATEGORIES, CulturalFestival } from '@/data/culturalEvents';

interface CulturalFestivalCalendarProps {
  triggerButton?: React.ReactNode;
}

export const CulturalFestivalCalendar: React.FC<CulturalFestivalCalendarProps> = ({ triggerButton }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedFestival, setSelectedFestival] = useState<CulturalFestival | null>(null);

  const filteredFestivals = SIDAMA_FESTIVALS.filter((fest) => {
    const matchesCategory = activeCategory === 'all' || fest.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCategory;

    const matchesQuery =
      fest.name.toLowerCase().includes(q) ||
      fest.sidamaName.toLowerCase().includes(q) ||
      fest.location.toLowerCase().includes(q) ||
      fest.woreda.toLowerCase().includes(q) ||
      fest.description.toLowerCase().includes(q);

    return matchesCategory && matchesQuery;
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {triggerButton || (
          <Button variant="outline" size="sm" className="gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            <span>Festival Calendar</span>
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="max-w-3xl max-h-[88vh] flex flex-col p-6 overflow-hidden">
        <DialogHeader className="pb-3 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold flex items-center gap-2">
                Sidama Cultural Festival & Event Calendar
                <Badge variant="secondary" className="text-xs bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
                  UNESCO & Living Rites
                </Badge>
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground mt-0.5">
                Explore the sacred ceremonies, seasonal rhythms, and festive gatherings across Eastern Sidama.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Filters and Search */}
        <div className="py-3 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search ceremonies, locations (e.g. Hawassa, Bensa, Fichee)..."
              className="pl-9 h-9 text-sm"
            />
          </div>

          {/* Category Badges */}
          <div className="flex flex-wrap gap-1.5">
            {FESTIVAL_CATEGORIES.map((cat) => (
              <Button
                key={cat.id}
                variant={activeCategory === cat.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveCategory(cat.id)}
                className="h-7 text-xs px-2.5 rounded-full"
              >
                {cat.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Festival Cards List */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-4">
          {filteredFestivals.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground">
              <Sparkles className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p>No celebrations found matching your search criteria.</p>
            </div>
          ) : (
            filteredFestivals.map((fest) => {
              const isExpanded = selectedFestival?.id === fest.id;

              return (
                <div
                  key={fest.id}
                  className="p-4 rounded-xl border border-border bg-card/60 hover:bg-card transition-all shadow-sm hover:shadow"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-base text-foreground">{fest.name}</h3>
                        {fest.unescoInscribed && (
                          <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white gap-1 text-[11px] py-0 px-2">
                            <Award className="w-3 h-3" />
                            UNESCO Inscribed
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs font-serif italic text-primary mt-0.5">
                        {fest.sidamaName}
                      </p>
                    </div>

                    <Badge variant="outline" className="text-xs text-muted-foreground whitespace-nowrap self-start">
                      {fest.approximateMonth}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted-foreground my-2.5">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>{fest.timing}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      <span className="truncate">{fest.location}</span>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {fest.description}
                  </p>

                  {/* Expandable Rituals and Tips */}
                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-border/80 space-y-3 text-xs animate-in fade-in duration-200">
                      <div>
                        <h4 className="font-semibold text-foreground mb-1.5 flex items-center gap-1.5">
                          <CheckCircle className="w-3.5 h-3.5 text-primary" />
                          Key Ceremonial Rituals
                        </h4>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground pl-1">
                          {fest.rituals.map((r, i) => (
                            <li key={i}>{r}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-muted/50 p-2.5 rounded-lg border border-border/60">
                        <div className="flex items-start gap-2">
                          <Info className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-foreground">Visitor Etiquette: </span>
                            <span className="text-muted-foreground">{fest.travelerTips}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-3 flex justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs h-7 text-primary hover:text-primary-dark"
                      onClick={() => setSelectedFestival(isExpanded ? null : fest)}
                    >
                      {isExpanded ? 'Show Less' : 'View Rituals & Etiquette →'}
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

export default CulturalFestivalCalendar;
