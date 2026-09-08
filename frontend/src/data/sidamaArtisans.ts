export interface SidamaArtisan {
  id: string;
  craft: string;
  localName: string;
  region: string;
  materials: string[];
  description: string;
  whereToBuy: string[];
  priceRangeUSD: string;
  culturalSignificance: string;
}

export const sidamaArtisans: SidamaArtisan[] = [
  {
    id: 'art-1',
    craft: 'Sidama Cotton Weaving (Wandaro)',
    localName: 'Wandaro',
    region: 'Hawassa, Yirgalem, Dale',
    materials: ['Handspun cotton thread', 'Natural dyes (indigo, saffron, madder root)', 'Backstrap loom'],
    description: 'The Wandaro is the iconic Sidama cotton wrap worn by women at ceremonies and festivals. Woven on traditional backstrap or upright looms by women artisans, each piece can take 2–5 days to complete. The geometric border patterns carry clan and lineage significance.',
    whereToBuy: ['Hawassa Main Market (Piazza area)', 'Hawassa Cultural Center artisan cooperative', 'Yirgalem Saturday market'],
    priceRangeUSD: '$15 – $80 depending on complexity and size',
    culturalSignificance: 'A Wandaro gifted by a host family is one of the highest expressions of Sidama hospitality. The border patterns can indicate the weaver\'s woreda of origin.'
  },
  {
    id: 'art-2',
    craft: 'Sidama Pottery (Gemisha)',
    localName: 'Gemisha / Sini',
    region: 'Boricha, Dale, Hawella Tula',
    materials: ['Red volcanic clay', 'Natural mineral pigments', 'Grass burnishing tools'],
    description: 'Hand-built without a wheel using coil-building and burnishing techniques. Sidama pottery includes coffee ceremony cups (sini), water vessels (gemisha), and ceremonial incense burners. Each piece is fire-hardened in an open ground kiln.',
    whereToBuy: ['Boricha weekly market', 'Hawassa artisan cooperative', 'Local homestay workshop visits'],
    priceRangeUSD: '$3 – $40 per piece',
    culturalSignificance: 'Pottery production is a hereditary craft among specific Sidama clans. The distinctive red clay of Sidama pottery is unique to the volcanic soils of the highland woreda.'
  },
  {
    id: 'art-3',
    craft: 'Basketry & Woven Trays (Kere)',
    localName: 'Kere / Mesob',
    region: 'Throughout Sidama Zone',
    materials: ['Split bamboo strips', 'Dyed grass (natural and synthetic dyes)', 'Porcupine quill details (decorative)'],
    description: 'Tightly woven food service baskets, wall decorations, and traditional meal platforms (Mesob) in complex geometric and floral patterns. Sidama women basketry artisans often work in community weaving cooperatives.',
    whereToBuy: ['Yirgalem Saturday market', 'Hawassa lakefront souvenir vendors', 'Homestay artisan visits (book via platform)'],
    priceRangeUSD: '$8 – $60 per piece',
    culturalSignificance: 'The Mesob (raised basket table) is central to Sidama communal dining. As a souvenir, it is a functional piece of cultural heritage that can be used as wall art or a decorative bowl.'
  },
  {
    id: 'art-4',
    craft: 'Enset Fiber Products (Bosha)',
    localName: 'Bosha Fiber Work',
    region: 'Highland woredas throughout Sidama',
    materials: ['Dried enset leaf fibers', 'Enset pseudo-stem strips', 'Plant dyes'],
    description: 'Woven from the giant enset plant that sustains Sidama nutrition, these functional artisan products include mats, bags, rope, and storage containers. Enset fiber craft is increasingly being developed into export-quality fashion accessories by local cooperatives.',
    whereToBuy: ['Yirgalem artisan cooperative', 'Bensa highland market', 'Directly from host family artisans'],
    priceRangeUSD: '$5 – $35 per item',
    culturalSignificance: 'Enset (Ensete ventricosum) is called "the tree against hunger" in Sidama. Buying enset fiber products directly supports farming families who grow this indigenous crop sustainably.'
  },
  {
    id: 'art-5',
    craft: 'Green Coffee Roasting & Specialty Packs',
    localName: 'Bun (Coffee) Souvenir Packs',
    region: 'Bensa, Aleta Wondo, Yirgalem',
    materials: ['Ethiopian Arabica specialty green beans', 'Hand-roasted in clay pan (Mitad)', 'Craft paper or jute bag packaging'],
    description: 'The most beloved Sidama souvenir: locally roasted specialty coffee from the exact farm you visited. Many washing stations and host families sell small roasted or green packages. Green beans can be transported internationally more easily than roasted coffee.',
    whereToBuy: ['Daye Bensa farm shop', 'Aleto cooperative washing station', 'Yirgalem specialty coffee kiosk', 'Aregash Lodge coffee corner'],
    priceRangeUSD: '$8 – $25 per 250g bag',
    culturalSignificance: 'Bringing home coffee from Sidama closes the bean-to-cup story personally. Sharing Ethiopian coffee with family and friends at home is a beautiful way to continue cultural exchange beyond the journey.'
  }
];
