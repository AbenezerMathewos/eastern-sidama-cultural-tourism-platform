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
import { Calculator, DollarSign, Users, Calendar, Sparkles, Bed, Utensils, Car, Compass } from 'lucide-react';
import {
  calculateSidamaTripBudget,
  TravelStyle,
  CurrencyCode
} from '@/lib/budgetCalculator';

interface TripBudgetCalculatorProps {
  triggerButton?: React.ReactNode;
}

export const TripBudgetCalculator: React.FC<TripBudgetCalculatorProps> = ({ triggerButton }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [days, setDays] = useState<number>(3);
  const [travelers, setTravelers] = useState<number>(2);
  const [style, setStyle] = useState<TravelStyle>('cultural');
  const [currency, setCurrency] = useState<CurrencyCode>('USD');

  const estimate = calculateSidamaTripBudget({
    days,
    travelers,
    style,
    currency
  });

  const currencySymbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : 'ETB ';

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {triggerButton || (
          <Button variant="outline" size="sm" className="gap-2">
            <Calculator className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Trip Budget Estimator</span>
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col p-6 overflow-hidden">
        <DialogHeader className="pb-3 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold flex items-center gap-2">
                Eastern Sidama Trip Budget Estimator
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground mt-0.5">
                Calculate realistic travel costs for homestays, coffee tours, transport, and guides.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto pr-1 py-3 space-y-4">
          {/* Controls */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-muted/40 border border-border">
            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-blue-500" /> Duration (Days)
              </label>
              <Input
                type="number"
                min={1}
                max={30}
                value={days}
                onChange={(e) => setDays(Math.max(1, parseInt(e.target.value) || 1))}
                className="h-8 text-xs"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-blue-500" /> Travelers
              </label>
              <Input
                type="number"
                min={1}
                max={20}
                value={travelers}
                onChange={(e) => setTravelers(Math.max(1, parseInt(e.target.value) || 1))}
                className="h-8 text-xs"
              />
            </div>

            <div className="col-span-2 sm:col-span-2">
              <label className="text-xs font-semibold text-foreground mb-1 block">Currency</label>
              <div className="flex gap-1.5">
                {(['USD', 'EUR', 'ETB'] as CurrencyCode[]).map((cur) => (
                  <Button
                    key={cur}
                    variant={currency === cur ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCurrency(cur)}
                    className="flex-1 h-8 text-xs"
                  >
                    {cur}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Travel Style Selector */}
          <div>
            <label className="text-xs font-semibold text-foreground mb-2 block">Travel Style</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'budget', label: 'Budget Backpacker', desc: 'Rustic homestay & shared transit' },
                { id: 'cultural', label: 'Cultural Explorer', desc: 'Eco-homestay & private guide' },
                { id: 'comfort', label: 'Highland Comfort', desc: 'Eco-lodge & dedicated 4WD' }
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setStyle(item.id as TravelStyle)}
                  className={`p-2.5 rounded-lg border text-left transition-all text-xs ${
                    style === item.id
                      ? 'border-primary bg-primary/5 text-foreground ring-1 ring-primary'
                      : 'border-border bg-card/60 text-muted-foreground hover:border-primary/50'
                  }`}
                >
                  <div className="font-semibold text-foreground">{item.label}</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Budget Breakdown Table */}
          <div className="space-y-2">
            <h4 className="font-semibold text-xs text-foreground uppercase tracking-wider">
              Estimated Expense Breakdown
            </h4>

            <div className="rounded-xl border border-border overflow-hidden text-xs divide-y divide-border">
              <div className="p-2.5 flex items-center justify-between bg-card/60">
                <div className="flex items-center gap-2 text-foreground">
                  <Bed className="w-4 h-4 text-amber-500" />
                  <span>Lodging & Homestay ({days} nights)</span>
                </div>
                <span className="font-mono font-medium">
                  {currencySymbol}{estimate.breakdown.accommodation.toLocaleString()}
                </span>
              </div>

              <div className="p-2.5 flex items-center justify-between bg-card/60">
                <div className="flex items-center gap-2 text-foreground">
                  <Utensils className="w-4 h-4 text-emerald-500" />
                  <span>Traditional Meals & Coffee Ceremonies</span>
                </div>
                <span className="font-mono font-medium">
                  {currencySymbol}{estimate.breakdown.mealsAndCoffee.toLocaleString()}
                </span>
              </div>

              <div className="p-2.5 flex items-center justify-between bg-card/60">
                <div className="flex items-center gap-2 text-foreground">
                  <Car className="w-4 h-4 text-blue-500" />
                  <span>Local Transit (Bajaj / 4WD)</span>
                </div>
                <span className="font-mono font-medium">
                  {currencySymbol}{estimate.breakdown.transport.toLocaleString()}
                </span>
              </div>

              <div className="p-2.5 flex items-center justify-between bg-card/60">
                <div className="flex items-center gap-2 text-foreground">
                  <Compass className="w-4 h-4 text-purple-500" />
                  <span>Community Cultural Guide</span>
                </div>
                <span className="font-mono font-medium">
                  {currencySymbol}{estimate.breakdown.guideAndCommunity.toLocaleString()}
                </span>
              </div>

              <div className="p-2.5 flex items-center justify-between bg-card/60">
                <div className="flex items-center gap-2 text-foreground">
                  <Sparkles className="w-4 h-4 text-rose-500" />
                  <span>Farm Entry, Permits & Conservation Fund</span>
                </div>
                <span className="font-mono font-medium">
                  {currencySymbol}{estimate.breakdown.activitiesAndFees.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Grand Total Callout */}
          <div className="p-4 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-between">
            <div>
              <div className="text-xs text-muted-foreground">Estimated Total Trip Cost</div>
              <div className="text-xl font-bold text-primary">
                {currencySymbol}{estimate.breakdown.total.toLocaleString()}
              </div>
            </div>

            <div className="text-right">
              <div className="text-xs text-muted-foreground">Per Traveler</div>
              <div className="text-sm font-semibold text-foreground">
                {currencySymbol}{estimate.perPersonTotal.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TripBudgetCalculator;
