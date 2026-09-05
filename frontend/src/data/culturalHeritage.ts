export interface CulturalHeritageSite {
  id: string;
  name: string;
  sidamaName: string;
  category: 'ceremony' | 'coffee' | 'nature' | 'craft' | 'monument';
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  unescoRecognized: boolean;
  shortDescription: string;
  culturalSignificance: string;
  bestTimeToVisit: string;
  tags: string[];
}

export const SIDAMA_HERITAGE_SITES: CulturalHeritageSite[] = [
  {
    id: 'fichee-chambalaalla-guduma',
    name: 'Guduma Fichee-Chambalaalla Ceremonial Ground',
    sidamaName: 'Guduma Fichee-Chambalaallu Bae',
    category: 'ceremony',
    location: 'Hawassa / Guduma Grounds',
    coordinates: { lat: 7.0504, lng: 38.4855 },
    unescoRecognized: true,
    shortDescription: 'The sacred ceremonial ground of the Sidama New Year festival inscribed on UNESCO Intangible Cultural Heritage list.',
    culturalSignificance: 'Celebrates communal harmony, generational blessings by the clan elders (Woma), and traditional lunar calendar determination.',
    bestTimeToVisit: 'June - July (calculated annually by Ayanto astrologers)',
    tags: ['UNESCO', 'Festival', 'New Year', 'Traditional Leadership']
  },
  {
    id: 'aleta-wondo-coffee-forests',
    name: 'Aleta Wondo Highland Coffee Forest',
    sidamaName: 'Aleta Wondo Bunaate Worba',
    category: 'coffee',
    location: 'Aleta Wondo Woreda',
    coordinates: { lat: 6.6022, lng: 38.4194 },
    unescoRecognized: false,
    shortDescription: 'Historic shade-grown organic Arabica coffee agroforests intercropped with false banana (Enset).',
    culturalSignificance: 'Birthplace of Sidamo coffee heritage cultivated under indigenous shade trees with sustainable organic polyculture practices.',
    bestTimeToVisit: 'October - February (Harvest and washing season)',
    tags: ['Coffee', 'Agroforestry', 'Enset', 'Organic']
  },
  {
    id: 'bensa-mountain-terrains',
    name: 'Bensa High-Altitude Specialty Micro-Lots',
    sidamaName: 'Bensa Karame Qoqqowo',
    category: 'coffee',
    location: 'Bensa Woreda',
    coordinates: { lat: 6.5187, lng: 38.8142 },
    unescoRecognized: false,
    shortDescription: 'World-renowned Cup of Excellence coffee farms and artisanal sun-dried processing stations.',
    culturalSignificance: 'Centuries-old family-run coffee plots perched at 2,000+ meters above sea level producing rare flavor profiles.',
    bestTimeToVisit: 'November - January',
    tags: ['Cup of Excellence', 'Specialty Coffee', 'Highlands']
  },
  {
    id: 'wensho-waterfalls-springs',
    name: 'Wensho Natural Springs & Forest Falls',
    sidamaName: 'Wensho Wayte Woyya',
    category: 'nature',
    location: 'Wensho Woreda',
    coordinates: { lat: 6.7214, lng: 38.5328 },
    unescoRecognized: false,
    shortDescription: 'Pristine mountain waterfalls nestled within indigenous afro-montane forest canopies.',
    culturalSignificance: 'Considered sacred communal waters used for seasonal purifications and elder gatherings.',
    bestTimeToVisit: 'September - March',
    tags: ['Nature', 'Waterfalls', 'Hiking', 'Springs']
  },
  {
    id: 'garamba-sacred-peak',
    name: 'Mount Garamba Sacred Ridge',
    sidamaName: 'Garamba Ilaalla',
    category: 'monument',
    location: 'Arbegona Highland Border',
    coordinates: { lat: 6.7825, lng: 38.7145 },
    unescoRecognized: false,
    shortDescription: 'Majestic mountain peak offering panoramic views across Eastern Sidama highlands and lush valleys.',
    culturalSignificance: 'Historic refuge and spiritual contemplation grounds for traditional elders and keepers of Sidama lore.',
    bestTimeToVisit: 'October - May (Dry trekking season)',
    tags: ['Trekking', 'Sacred', 'Highland View', 'Heritage']
  },
  {
    id: 'dale-bamboo-craft-cottages',
    name: 'Dale Traditional Bamboo Craft & Architecture Village',
    sidamaName: 'Dale Shekkate Minna',
    category: 'craft',
    location: 'Dale Woreda / Yirgalem',
    coordinates: { lat: 6.7533, lng: 38.4116 },
    unescoRecognized: false,
    shortDescription: 'Living craft community renowned for woven bamboo architecture and traditional Sidama beehive houses.',
    culturalSignificance: 'Preserves the ecological architecture of organic bamboo dwellings built without modern nails or artificial adhesives.',
    bestTimeToVisit: 'Year-round',
    tags: ['Architecture', 'Bamboo', 'Handicraft', 'Community']
  }
];
