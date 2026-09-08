export interface CoffeeProcessingMethod {
  id: string;
  name: string;
  localName: string;
  description: string;
  flavorProfile: string[];
  steps: string[];
  bestVarieties: string[];
  sidamaOrigins: string[];
}

export interface CoffeeFarm {
  id: string;
  name: string;
  location: string;
  altitude: string;
  varieties: string[];
  certifications: string[];
  processes: string[];
  visitInfo: string;
  cooperativeSize: string;
  description: string;
}

export const coffeeProcesses: CoffeeProcessingMethod[] = [
  {
    id: 'proc-1',
    name: 'Natural / Dry Process',
    localName: 'Yabish Bun (Sun-dried)',
    description: 'Coffee cherries are dried whole in the sun on raised African beds. The fruit ferments around the bean, imparting intense berry and wine-like sweetness.',
    flavorProfile: ['Blueberry', 'Tropical fruit', 'Dark chocolate', 'Wine-like fermentation', 'Heavy mouthfeel'],
    steps: ['Hand-pick only ripe red cherries', 'Spread cherries on raised drying beds (3–6 cm depth)', 'Turn every 2–3 hours for even drying', 'Dry for 3–5 weeks depending on weather', 'Hull the dry parchment and fruit skin after drying', 'Sort and grade beans by density and size'],
    bestVarieties: ['Sidama Landrace Type 1', 'Heirloom Bourbon derivatives', 'Bensa Wush Wush'],
    sidamaOrigins: ['Bensa', 'Hula', 'Bore', 'Aroresa']
  },
  {
    id: 'proc-2',
    name: 'Washed / Wet Process',
    localName: 'Jibo Bun (Washed)',
    description: 'Cherries are pulped immediately after picking. The mucilage is fermented overnight in water tanks before washing and drying on beds. Produces clean, bright, floral cups.',
    flavorProfile: ['Jasmine', 'Bergamot', 'Lemon citrus', 'Stone fruit', 'Tea-like clarity', 'High acidity'],
    steps: ['Hand-sort and float cherries to remove defects', 'Mechanically pulp cherries at the washing station', 'Ferment in water tanks for 24–72 hours', 'Wash clean in fresh water channels', 'Dry on raised beds for 10–20 days', 'Rest and stabilize parchment before milling'],
    bestVarieties: ['74112 JARC variety', '74158 JARC variety', 'Sidama Landrace mixed'],
    sidamaOrigins: ['Aleta Wondo', 'Yirgalem', 'Chire', 'Daye Bensa']
  },
  {
    id: 'proc-3',
    name: 'Honey Process',
    localName: 'Mukaye Bun (Honey-dried)',
    description: 'A hybrid approach: cherries are pulped but some mucilage (the "honey") is left on the bean during drying. Yellow, red, and black honey refer to increasing amounts of mucilage remaining.',
    flavorProfile: ['Caramel', 'Stone fruit', 'Brown sugar', 'Mild fruit', 'Medium body', 'Balanced acidity'],
    steps: ['Pulp cherries, leaving targeted mucilage percentage', 'Control fermentation via shading or exposure', 'Dry on raised beds with frequent turning', 'Monitor for 15–30 days based on honey level', 'Hull and grade the dried parchment'],
    bestVarieties: ['Bensa experimental micro-lots', 'Mixed cooperative varieties'],
    sidamaOrigins: ['Bensa (experimental lots)', 'Aroresa (emerging practice)']
  }
];

export const sidamaFarms: CoffeeFarm[] = [
  {
    id: 'farm-1',
    name: 'Daye Bensa Coffee',
    location: 'Bensa, Sidama Zone',
    altitude: '2,100 – 2,450m',
    varieties: ['74110', '74112', 'Local landraces'],
    certifications: ['UTZ', 'Rainforest Alliance', 'SAN'],
    processes: ['Natural', 'Washed', 'Honey'],
    visitInfo: 'Tours available Oct–Dec during peak harvest. Book in advance with local guides.',
    cooperativeSize: 'Estate farm with outgrower network of 600+ smallholders',
    description: 'One of the most celebrated specialty producers in Sidama. Daye Bensa pioneered natural process coffee in the Bensa highlands and their lots are exported globally to Scandinavian and Japanese roasters.'
  },
  {
    id: 'farm-2',
    name: 'Aleto Cooperative Washing Station',
    location: 'Aleta Wondo, Sidama Zone',
    altitude: '1,900 – 2,200m',
    varieties: ['Mixed Ethiopian landrace', '74158'],
    certifications: ['Fairtrade', 'Organic (transitional)'],
    processes: ['Washed'],
    visitInfo: 'Community-led visits arranged via local tour operators year-round.',
    cooperativeSize: '420 member smallholder families',
    description: 'A Fairtrade cooperative washing station where member farmers bring cherries for collective processing. Visitors can observe the full washing process, meet cooperative managers, and cup fresh coffee at the cupping lab.'
  },
  {
    id: 'farm-3',
    name: 'Hula Washing Station Collective',
    location: 'Hula, Sidama Zone',
    altitude: '2,000 – 2,350m',
    varieties: ['Local Heirloom Sidama', 'JARC-selected'],
    certifications: ['Organic (certified)'],
    processes: ['Natural', 'Washed'],
    visitInfo: 'Best visited Nov–Jan during harvest season. Homestay with farmer families available.',
    cooperativeSize: '380 member families',
    description: 'A high-altitude collective producing some of Sidama\'s finest natural-process lots. The micro-climate of the Hula highlands produces cherries with exceptional sugar density ideal for the natural process.'
  }
];
