export interface WildlifeSpecies {
  id: string;
  name: string;
  scientificName: string;
  category: 'mammal' | 'reptile' | 'amphibian' | 'fish';
  iucnStatus: 'LC' | 'NT' | 'VU' | 'EN' | 'CR';
  whereSeen: string[];
  bestMonths: string;
  description: string;
  conservationNotes: string;
}

export const sidamaWildlife: WildlifeSpecies[] = [
  { id: 'wl-1', name: 'Guereza Colobus Monkey', scientificName: 'Colobus guereza', category: 'mammal', iucnStatus: 'LC', whereSeen: ['Wondo Genet forest', 'Yirgalem riparian woodland'], bestMonths: 'Year-round', description: 'Large black-and-white monkey with a magnificent flowing white cape. Moves in troops through tall forest canopy.', conservationNotes: 'Habitat loss from forest clearance for coffee expansion is the primary threat. Support only shade-grown coffee producers.' },
  { id: 'wl-2', name: 'Anubis Baboon', scientificName: 'Papio anubis', category: 'mammal', iucnStatus: 'LC', whereSeen: ['Hawassa lake fringes', 'Wondo Genet open woodland', 'Bensa highland edges'], bestMonths: 'Year-round', description: 'Large ground-dwelling primate living in multi-male troops. Often spotted near villages and forest edges at dawn.', conservationNotes: 'Do not feed baboons – habituation leads to crop raiding behavior that causes community-wildlife conflict.' },
  { id: 'wl-3', name: 'Hippopotamus', scientificName: 'Hippopotamus amphibius', category: 'mammal', iucnStatus: 'VU', whereSeen: ['Lake Hawassa northern shores', 'Awasa Wildlife Reserve'], bestMonths: 'Year-round (best at dawn/dusk)', description: 'A population of approximately 30–50 hippos inhabits Lake Hawassa. Best seen from the lakeshore boardwalk at sunrise.', conservationNotes: 'IUCN Vulnerable. Hippos are responsible for more human fatalities in Africa than any large animal – stay on designated viewing platforms and never enter the water near hippo habitat.' },
  { id: 'wl-4', name: 'Nile Monitor Lizard', scientificName: 'Varanus niloticus', category: 'reptile', iucnStatus: 'LC', whereSeen: ['Lake Hawassa shoreline', 'Hawella Tula wetlands', 'River banks near Yirgalem'], bestMonths: 'Oct – Apr (active in dry season)', description: 'Africa\'s largest lizard, reaching up to 2m. Regularly seen basking on rocks and logs along Lake Hawassa\'s edge.', conservationNotes: 'Harmless to humans if unprovoked. Do not disturb or attempt to handle wild monitors.' },
  { id: 'wl-5', name: 'African Clawless Otter', scientificName: 'Aonyx capensis', category: 'mammal', iucnStatus: 'NT', whereSeen: ['Lake Hawassa reed beds', 'Wondo Genet stream', 'Yirgalem river gorge'], bestMonths: 'Nov – Mar', description: 'Charismatic freshwater otter. Rarely seen but present in Hawassa lake reed beds. Best spotted at quiet dawn hours.', conservationNotes: 'Near Threatened. Vulnerable to water pollution from agricultural runoff and reed clearing around Lake Hawassa.' },
  { id: 'wl-6', name: 'Ethiopian Highland Hare', scientificName: 'Lepus habessinicus', category: 'mammal', iucnStatus: 'LC', whereSeen: ['Open highland meadows', 'Coffee farm edges', 'Hula moorland'], bestMonths: 'Year-round (crepuscular)', description: 'A near-endemic highland hare active at dawn and dusk in Sidama\'s open highland grasslands and moorland edges.', conservationNotes: 'Common but increasingly confined to remnant grassland between intensive coffee farms. A signal species for habitat connectivity.' }
];
