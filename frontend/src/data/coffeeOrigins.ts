export interface CoffeeOrigin {
  id: string;
  name: string;
  woreda: string;
  altitudeRange: string;
  cupNotes: string[];
  processes: string[];
  harvestSeason: string;
  terroirDescription: string;
  cupProfile: string;
  famousMicroLots: string[];
  recommendedBrewMethod: string;
}

export const SIDAMA_COFFEE_ORIGINS: CoffeeOrigin[] = [
  {
    id: 'bensa-highlands',
    name: 'Bensa High-Elevation Micro-Terroirs',
    woreda: 'Bensa (Karamo, Shantawene, Bombe)',
    altitudeRange: '2,000 - 2,350 masl',
    cupNotes: ['Bergamot', 'White Peach', 'Jasmine Flower', 'Meyer Lemon', 'Wild Honey'],
    processes: ['Natural / Sun-Dried', 'Washed', 'Anaerobic Slow Fermentation'],
    harvestSeason: 'November - January',
    terroirDescription: 'Perched in misty afro-montane cloud forests with deep volcanic soils. Slow cherry maturation under cool nights develops extraordinary sugar density and complex floral aromatics.',
    cupProfile: 'Explosively floral with silken body, sparkling citrus acidity, and lingering stone fruit sweetness.',
    famousMicroLots: ['Shantawene Village', 'Karamo Micro-station', 'Bombe Washing Station'],
    recommendedBrewMethod: 'Pour-Over (V60 or Chemex) at 92°C to highlight delicate florals and jasmine notes.'
  },
  {
    id: 'aleta-wondo-agroforest',
    name: 'Aleta Wondo Garden Coffee Agroforests',
    woreda: 'Aleta Wondo',
    altitudeRange: '1,800 - 2,100 masl',
    cupNotes: ['Red Currant', 'Earl Grey Tea', 'Brown Sugar', 'Dried Apricot'],
    processes: ['Washed', 'Natural'],
    harvestSeason: 'October - December',
    terroirDescription: 'Historic shade-grown organic gardens intercropped under Enset (false banana), Cordia, and Millettia canopy trees, preserving century-old indigenous heirloom landraces.',
    cupProfile: 'Clean and vibrant with tea-like clarity, bright malic acidity, and a crisp caramel finish.',
    famousMicroLots: ['Wondo Genet Foothills', 'Chuko Cooperative Lot'],
    recommendedBrewMethod: 'Aeropress or Kalita Wave for balanced body and bright tea-like clarity.'
  },
  {
    id: 'dale-yirgalem-cradle',
    name: 'Dale & Yirgalem Historic Coffee Cradle',
    woreda: 'Dale (Yirgalem)',
    altitudeRange: '1,750 - 1,950 masl',
    cupNotes: ['Mandarin Orange', 'Dark Cocoa', 'Blackberry', 'Cardamom'],
    processes: ['Traditional Washed', 'Eco-Pulping'],
    harvestSeason: 'October - December',
    terroirDescription: 'Rich river valleys surrounding the Gidabo River basin. Home to some of the earliest commercial specialty washing stations established in Sidama.',
    cupProfile: 'Juicy stone fruits layered with velvety dark chocolate sweetness and gentle spice complexities.',
    famousMicroLots: ['Apostolic Valley Lot', 'Yirgalem Town Co-op'],
    recommendedBrewMethod: 'Syphon or French Press for rich chocolate undertones and syrupy body.'
  },
  {
    id: 'hula-extreme-highland',
    name: 'Hula Alpine Ridge Lots',
    woreda: 'Hula',
    altitudeRange: '2,200 - 2,450 masl',
    cupNotes: ['Lavender', 'Blueberry', 'Lime Zest', 'Crisp Green Apple'],
    processes: ['Natural / African Raised Beds', 'Extended Cold Fermentation'],
    harvestSeason: 'December - February',
    terroirDescription: 'Among the highest coffee growing elevations in Africa. Extreme daytime-to-nighttime temperature shifts create dense, small "pea-berry" beans with piercing acidity.',
    cupProfile: 'High-intensity aromatics, intense tropical and berry fruit notes, with electric citrus brightness.',
    famousMicroLots: ['Teticha Highlands', 'Hula Crest Farm'],
    recommendedBrewMethod: 'Filter Drip or Iced Flash-Brew to amplify vibrant berry acidity.'
  },
  {
    id: 'aroresa-forest-parcels',
    name: 'Aroresa Pristine Forest Parcels',
    woreda: 'Aroresa',
    altitudeRange: '1,900 - 2,200 masl',
    cupNotes: ['Papaya', 'Ginger Flower', 'Cane Sugar', 'Sweet Tangerine'],
    processes: ['Natural / Raised Bed Sun Dried'],
    harvestSeason: 'November - January',
    terroirDescription: 'Remote wild forest buffers bordering Eastern Sidama mountain passes. Naturally grown coffee gathered with minimal human intervention.',
    cupProfile: 'Lush tropical sweetness with round syrup mouthfeel and pleasant herbal undertones.',
    famousMicroLots: ['Mejo Ridge Lot', 'Aroresa Forest Station'],
    recommendedBrewMethod: 'Cold Brew or Espresso to extract dense tropical syrupy sweetness.'
  }
];
