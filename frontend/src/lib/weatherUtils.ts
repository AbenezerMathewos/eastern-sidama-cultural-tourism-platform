export interface SidamaClimateData {
  region: string;
  altitudeMeters: number;
  averageTempC: { min: number; max: number };
  season: 'Bega (Dry)' | 'Belg (Small Rains)' | 'Kiremt (Main Rains)';
  rainfallLikelihood: 'Low' | 'Moderate' | 'High';
  travelSuitability: 'Excellent' | 'Very Good' | 'Fair';
  clothingRecommendation: string;
  bestActivities: string[];
}

export const getSidamaSeasonalClimate = (regionName: string, monthIndex: number = new Date().getMonth()): SidamaClimateData => {
  // Month 0 = Jan, 11 = Dec
  // Bega (Dry): Oct (9) - Feb (1)
  // Belg (Small rains): Mar (2) - May (4)
  // Kiremt (Heavy rains): Jun (5) - Sep (8)

  const isBega = monthIndex >= 9 || monthIndex <= 1;
  const isBelg = monthIndex >= 2 && monthIndex <= 4;

  const isHighland = /bensa|arbegona|wondo/i.test(regionName);

  if (isBega) {
    return {
      region: regionName,
      altitudeMeters: isHighland ? 2200 : 1750,
      averageTempC: isHighland ? { min: 9, max: 23 } : { min: 14, max: 28 },
      season: 'Bega (Dry)',
      rainfallLikelihood: 'Low',
      travelSuitability: 'Excellent',
      clothingRecommendation: 'Light breathable clothes for day, warm fleece/sweater for cool highland evenings.',
      bestActivities: ['Coffee harvest visits', 'Mountain trekking', 'Waterfall hikes', 'Outdoor village stays']
    };
  }

  if (isBelg) {
    return {
      region: regionName,
      altitudeMeters: isHighland ? 2200 : 1750,
      averageTempC: isHighland ? { min: 11, max: 24 } : { min: 15, max: 29 },
      season: 'Belg (Small Rains)',
      rainfallLikelihood: 'Moderate',
      travelSuitability: 'Very Good',
      clothingRecommendation: 'Layered clothing with a lightweight rain jacket and water-resistant footwear.',
      bestActivities: ['Lush agroforest walks', 'Hot springs relaxation', 'Cultural storytelling workshops']
    };
  }

  return {
    region: regionName,
    altitudeMeters: isHighland ? 2200 : 1750,
    averageTempC: isHighland ? { min: 10, max: 20 } : { min: 13, max: 25 },
    season: 'Kiremt (Main Rains)',
    rainfallLikelihood: 'High',
    travelSuitability: 'Fair',
    clothingRecommendation: 'Sturdy waterproof jacket, hiking boots with grip, and warm layers.',
    bestActivities: ['Fichee-Chambalaalla festivities', 'Enset culinary tastings', 'Museum and craft center tours']
  };
};
