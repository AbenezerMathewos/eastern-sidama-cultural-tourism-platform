export interface BirdSpecies {
  id: string;
  commonName: string;
  scientificName: string;
  family: string;
  status: 'endemic' | 'near-endemic' | 'migrant' | 'resident';
  iucnStatus: 'LC' | 'NT' | 'VU' | 'EN' | 'CR';
  whereSeen: string[];
  bestMonths: string;
  description: string;
  plumage: string;
}

export const sidamaBirds: BirdSpecies[] = [
  { id: 'bird-1', commonName: 'White-tailed Swallow', scientificName: 'Hirundo megaensis', family: 'Hirundinidae', status: 'endemic', iucnStatus: 'VU', whereSeen: ['Yabello border area transitional bush', 'Sidama lowland acacia savanna'], bestMonths: 'Oct – Mar', description: 'One of Ethiopia\'s rarest swallows. Restricted to a tiny range straddling Borana/Sidama borders.', plumage: 'Glossy blue-black above, white underparts, distinctive white outer tail feathers.' },
  { id: 'bird-2', commonName: 'Banded Barbet', scientificName: 'Lybius undatus', family: 'Lybiidae', status: 'endemic', iucnStatus: 'LC', whereSeen: ['Yirgalem agroforestry gardens', 'Hawassa city parks', 'Coffee farm shade trees'], bestMonths: 'Year-round', description: 'A striking barbet species endemic to Ethiopia and Eritrea. Common in Sidama highland gardens.', plumage: 'Black and white barring on wings, red forehead patch, pale bill.' },
  { id: 'bird-3', commonName: 'African Fish Eagle', scientificName: 'Icthyophaga vocifer', family: 'Accipitridae', status: 'resident', iucnStatus: 'LC', whereSeen: ['Lake Hawassa shoreline', 'Wondo Genet forest streams'], bestMonths: 'Year-round', description: 'Iconic African raptor whose haunting call echoes across Lake Hawassa at dawn and dusk.', plumage: 'Chestnut body, white head and chest, yellow cere, powerful yellow talons.' },
  { id: 'bird-4', commonName: 'Ethiopian Oriole', scientificName: 'Oriolus monacha', family: 'Oriolidae', status: 'endemic', iucnStatus: 'LC', whereSeen: ['Wondo Genet forest canopy', 'Yirgalem shade coffee trees', 'Bensa agroforest edge'], bestMonths: 'Year-round', description: 'An Ethiopian highland endemic with a rich, fluting call. Most easily spotted in Wondo Genet\'s tall forest.', plumage: 'Black hood contrasting with bright yellow body and tail, red bill.' },
  { id: 'bird-5', commonName: 'Abyssinian Ground Hornbill', scientificName: 'Bucorvus abyssinicus', family: 'Bucorvidae', status: 'resident', iucnStatus: 'LC', whereSeen: ['Open grassland south of Hawassa', 'Sidama lowland savanna edges'], bestMonths: 'Oct – May', description: 'One of Africa\'s most impressive birds – the size of a turkey and walks in slow, stately groups.', plumage: 'All black with striking red and blue facial skin, white primary feathers visible in flight.' },
  { id: 'bird-6', commonName: 'Black-winged Lovebird', scientificName: 'Agapornis taranta', family: 'Psittacidae', status: 'endemic', iucnStatus: 'LC', whereSeen: ['Sidama highland forests above 1,800m', 'Yirgalem juniper and Hagenia woodland'], bestMonths: 'Year-round', description: 'Ethiopia\'s only endemic parrot. Small and fast-moving through highland forest canopies.', plumage: 'Bright green body, red forehead (male), black flight feathers, red bill.' },
  { id: 'bird-7', commonName: 'Wattled Ibis', scientificName: 'Bostrychia carunculata', family: 'Threskiornithidae', status: 'endemic', iucnStatus: 'LC', whereSeen: ['Hawassa lake shore mudflats', 'Sidama highland meadows and farmland'], bestMonths: 'Year-round', description: 'Ethiopia\'s signature wetland bird. Large flocks feed in highland meadows at dusk.', plumage: 'Dark brown-black overall with a distinctive white wing patch and a pendulous red wattle.' },
  { id: 'bird-8', commonName: 'Rüppell\'s Robin-Chat', scientificName: 'Cossypha semirufa', family: 'Muscicapidae', status: 'near-endemic', iucnStatus: 'LC', whereSeen: ['Wondo Genet dense undergrowth', 'Coffee farm hedgerows', 'Yirgalem forest edge'], bestMonths: 'Apr – Aug (vocal)', description: 'A secretive but vocal bird of highland forest edges. Its mellifluous song is one of the finest in the Sidama highlands.', plumage: 'Orange-rufous underparts, slate-grey back, white supercilium, dark eye-stripe.' }
];
