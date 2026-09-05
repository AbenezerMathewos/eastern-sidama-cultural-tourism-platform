import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sun, CloudRain, Wind, Mountain, Shirt, Compass } from 'lucide-react';
import { getSidamaSeasonalClimate, SidamaClimateData } from '@/lib/weatherUtils';

interface WeatherWidgetProps {
  locationName: string;
  className?: string;
}

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({ locationName, className = '' }) => {
  const climate: SidamaClimateData = getSidamaSeasonalClimate(locationName);

  const getSeasonIcon = () => {
    switch (climate.rainfallLikelihood) {
      case 'Low':
        return <Sun className="w-5 h-5 text-amber-500" />;
      case 'Moderate':
        return <Wind className="w-5 h-5 text-sky-500" />;
      case 'High':
        return <CloudRain className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <Card className={`border border-border/80 bg-card/60 backdrop-blur-sm overflow-hidden ${className}`}>
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getSeasonIcon()}
            <div>
              <span className="font-semibold text-sm text-foreground block">
                {climate.season} Season
              </span>
              <span className="text-xs text-muted-foreground">
                Sidama Highland Climate
              </span>
            </div>
          </div>
          <Badge
            variant="outline"
            className={`text-xs ${
              climate.travelSuitability === 'Excellent'
                ? 'border-emerald-500/40 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10'
                : 'border-sky-500/40 text-sky-600 dark:text-sky-400 bg-sky-500/10'
            }`}
          >
            {climate.travelSuitability} Travel Index
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-border/50">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Mountain className="w-3.5 h-3.5 text-primary" />
            <span>Elev: ~{climate.altitudeMeters}m</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground justify-end">
            <span className="font-semibold text-foreground">
              {climate.averageTempC.min}°C – {climate.averageTempC.max}°C
            </span>
          </div>
        </div>

        <div className="bg-muted/40 p-2.5 rounded-md text-xs space-y-1.5">
          <div className="flex items-start gap-1.5">
            <Shirt className="w-3.5 h-3.5 text-secondary shrink-0 mt-0.5" />
            <span className="text-muted-foreground">{climate.clothingRecommendation}</span>
          </div>
          <div className="flex items-start gap-1.5">
            <Compass className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
            <span className="text-foreground font-medium">
              Prime: {climate.bestActivities.slice(0, 2).join(', ')}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;
