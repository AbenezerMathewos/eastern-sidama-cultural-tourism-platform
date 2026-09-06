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
import { Coffee, Search, Mountain, Droplets, Flame, Sparkles, SlidersHorizontal } from 'lucide-react';
import { SIDAMA_COFFEE_ORIGINS, CoffeeOrigin } from '@/data/coffeeOrigins';

interface CoffeeOriginGuideProps {
  triggerButton?: React.ReactNode;
}

export const CoffeeOriginGuide: React.FC<CoffeeOriginGuideProps> = ({ triggerButton }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProcess, setSelectedProcess] = useState<string>('all');
  const [expandedOriginId, setExpandedOriginId] = useState<string | null>(null);

  const processFilters = [
    { id: 'all', label: 'All Processes' },
    { id: 'washed', label: 'Washed' },
    { id: 'natural', label: 'Natural / Sun-Dried' },
    { id: 'anaerobic', label: 'Anaerobic / Experimental' }
  ];

  const filteredOrigins = SIDAMA_COFFEE_ORIGINS.filter((origin: CoffeeOrigin) => {
    const matchesProcess =
      selectedProcess === 'all' ||
      origin.processes.some((p) => p.toLowerCase().includes(selectedProcess));

    const q = searchTerm.toLowerCase().trim();
    if (!q) return matchesProcess;

    const matchesSearch =
      origin.name.toLowerCase().includes(q) ||
      origin.woreda.toLowerCase().includes(q) ||
      origin.cupProfile.toLowerCase().includes(q) ||
      origin.cupNotes.some((note) => note.toLowerCase().includes(q)) ||
      origin.famousMicroLots.some((lot) => lot.toLowerCase().includes(q));

    return matchesProcess && matchesSearch;
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {triggerButton || (
          <Button variant="outline" size="sm" className="gap-2">
            <Coffee className="w-4 h-4 text-amber-700 dark:text-amber-500" />
            <span>Sidama Coffee Terroir Guide</span>
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="max-w-3xl max-h-[88vh] flex flex-col p-6 overflow-hidden">
        <DialogHeader className="pb-3 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-700/10 text-amber-800 dark:text-amber-400">
              <Coffee className="w-6 h-6" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold flex items-center gap-2">
                Sidama Specialty Coffee Terroir Explorer
                <Badge variant="secondary" className="text-xs bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
                  Arabica Heirloom
                </Badge>
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground mt-0.5">
                Explore legendary highland elevations, tasting profiles, and micro-regions of Eastern Sidama.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Search & Filters */}
        <div className="py-3 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by flavor note (e.g. Jasmine, Peach, Bergamot) or woreda (Bensa, Dale)..."
              className="pl-9 h-9 text-sm"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {processFilters.map((p) => (
              <Button
                key={p.id}
                variant={selectedProcess === p.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedProcess(p.id)}
                className="h-7 text-xs px-2.5 rounded-full"
              >
                {p.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Origin Terroir List */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-4">
          {filteredOrigins.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground">
              <Sparkles className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p>No coffee origins found matching your search.</p>
            </div>
          ) : (
            filteredOrigins.map((origin) => {
              const isExpanded = expandedOriginId === origin.id;

              return (
                <div
                  key={origin.id}
                  className="p-4 rounded-xl border border-border bg-card/60 hover:bg-card transition-all shadow-sm"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-bold text-base text-foreground">{origin.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        Region: <span className="font-medium text-foreground">{origin.woreda}</span>
                      </p>
                    </div>

                    <Badge variant="outline" className="text-xs gap-1 border-amber-500/40 text-amber-800 dark:text-amber-400 self-start">
                      <Mountain className="w-3 h-3" />
                      {origin.altitudeRange}
                    </Badge>
                  </div>

                  {/* Cup Notes Pills */}
                  <div className="my-2.5">
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground block mb-1">
                      Cupping Notes:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {origin.cupNotes.map((note, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-800 dark:text-amber-300 font-medium border border-amber-500/20"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {origin.cupProfile}
                  </p>

                  {/* Expandable Terroir Info */}
                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-border/80 space-y-3 text-xs animate-in fade-in duration-200">
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">Terroir & Climate Conditions</h4>
                        <p className="text-muted-foreground leading-relaxed">{origin.terroirDescription}</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div className="bg-muted/40 p-2.5 rounded-lg border border-border/60">
                          <div className="flex items-center gap-1.5 font-semibold text-foreground mb-1">
                            <Droplets className="w-3.5 h-3.5 text-blue-500" />
                            <span>Processing Methods</span>
                          </div>
                          <p className="text-muted-foreground text-[11px]">{origin.processes.join(', ')}</p>
                        </div>

                        <div className="bg-muted/40 p-2.5 rounded-lg border border-border/60">
                          <div className="flex items-center gap-1.5 font-semibold text-foreground mb-1">
                            <Flame className="w-3.5 h-3.5 text-amber-500" />
                            <span>Recommended Brewing</span>
                          </div>
                          <p className="text-muted-foreground text-[11px]">{origin.recommendedBrewMethod}</p>
                        </div>
                      </div>

                      <div>
                        <span className="font-semibold text-foreground">Famous Washing Stations & Micro-Lots: </span>
                        <span className="text-muted-foreground">{origin.famousMicroLots.join(' • ')}</span>
                      </div>
                    </div>
                  )}

                  <div className="mt-2 flex justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs h-7 text-amber-700 dark:text-amber-400 hover:text-amber-800"
                      onClick={() => setExpandedOriginId(isExpanded ? null : origin.id)}
                    >
                      {isExpanded ? 'Hide Details' : 'View Elevation & Brewing Guide →'}
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

export default CoffeeOriginGuide;
