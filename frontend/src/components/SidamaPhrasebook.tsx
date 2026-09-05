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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Search, Sparkles, CheckCircle2 } from 'lucide-react';
import { SIDAMA_GLOSSARY, CULTURAL_ETIQUETTE_TIPS, SidamaPhrase } from '@/data/sidamaGlossary';

export const SidamaPhrasebook: React.FC<{ triggerButton?: React.ReactNode }> = ({ triggerButton }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredPhrases = SIDAMA_GLOSSARY.filter((phrase: SidamaPhrase) => {
    const matchesCategory = selectedCategory === 'all' || phrase.category === selectedCategory;
    const term = searchTerm.toLowerCase().trim();
    if (!term) return matchesCategory;

    const matchesSearch =
      phrase.sidama.toLowerCase().includes(term) ||
      phrase.english.toLowerCase().includes(term) ||
      phrase.pronunciation.toLowerCase().includes(term);

    return matchesCategory && matchesSearch;
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {triggerButton || (
          <Button variant="outline" size="sm" className="gap-2">
            <BookOpen className="w-4 h-4 text-primary" />
            <span>Sidama Phrasebook</span>
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold">Sidaamu Afoo Phrasebook & Etiquette</DialogTitle>
              <DialogDescription className="text-sm">
                Essential phrases and cultural etiquette for an enriching experience in Eastern Sidama.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="phrases" className="w-full mt-2">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="phrases">Key Phrases ({SIDAMA_GLOSSARY.length})</TabsTrigger>
            <TabsTrigger value="etiquette">Cultural Etiquette Tips</TabsTrigger>
          </TabsList>

          <TabsContent value="phrases" className="space-y-4 pt-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search in Sidama or English..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>

              <div className="flex gap-1 overflow-x-auto pb-1">
                {['all', 'greeting', 'hospitality', 'coffee', 'etiquette'].map(cat => (
                  <Button
                    key={cat}
                    variant={selectedCategory === cat ? 'default' : 'outline'}
                    size="sm"
                    className="capitalize text-xs whitespace-nowrap"
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid gap-3 max-h-[50vh] overflow-y-auto pr-1">
              {filteredPhrases.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  No phrases found matching your search.
                </div>
              ) : (
                filteredPhrases.map((phrase) => (
                  <div
                    key={phrase.id}
                    className="p-3.5 rounded-lg border border-border/80 bg-card hover:border-primary/40 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-base text-foreground font-display">
                            {phrase.sidama}
                          </h4>
                          <Badge variant="secondary" className="text-[10px] uppercase">
                            {phrase.category}
                          </Badge>
                        </div>
                        <p className="text-xs text-primary font-mono mt-0.5">
                          Pronunciation: /{phrase.pronunciation}/
                        </p>
                      </div>
                    </div>

                    <p className="text-sm font-medium text-foreground mt-2">
                      {phrase.english}
                    </p>

                    {phrase.culturalNote && (
                      <div className="mt-2 flex items-start gap-1.5 text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                        <Sparkles className="w-3.5 h-3.5 text-secondary shrink-0 mt-0.5" />
                        <span>{phrase.culturalNote}</span>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="etiquette" className="space-y-3 pt-3">
            <p className="text-xs text-muted-foreground">
              Following customary etiquette honors our host communities and elders:
            </p>
            <div className="space-y-2">
              {CULTURAL_ETIQUETTE_TIPS.map((tip, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-lg border border-border/70 bg-card/60"
                >
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">{tip}</span>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default SidamaPhrasebook;
