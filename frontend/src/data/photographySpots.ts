export interface PhotoSpot {
  id: string;
  name: string;
  town: string;
  coordinates: [number, number];
  type: 'landscape' | 'culture' | 'wildlife' | 'urban' | 'coffee';
  bestLight: 'golden-hour-morning' | 'golden-hour-evening' | 'midday' | 'any';
  description: string;
  tips: string[];
  difficulty: 'easy' | 'moderate' | 'challenging';
  permitRequired: boolean;
}

export const photographySpots: PhotoSpot[] = [
  {
    id: 'photo-1',
    name: 'Lake Hawassa Fishermen Dawn',
    town: 'Hawassa',
    coordinates: [7.059, 38.462],
    type: 'culture',
    bestLight: 'golden-hour-morning',
    description: 'Traditional papyrus-reed boats (tankwa) depart at first light with Tilapia nets. The mist on the lake and the silhouetted fishermen create one of Ethiopia\'s most iconic images.',
    tips: ['Arrive before sunrise (6:00 AM) at the Tikur Wuha fishing jetty.', 'Approach fishermen respectfully and offer a small tip (50 ETB) before shooting.', 'Use a 70-200mm telephoto to compress the lake mist and boats for a painterly effect.', 'The light lasts only 20–30 minutes at peak golden quality.'],
    difficulty: 'easy',
    permitRequired: false
  },
  {
    id: 'photo-2',
    name: 'Bensa Coffee Harvest Red Carpet',
    town: 'Bensa',
    coordinates: [6.45, 38.32],
    type: 'coffee',
    bestLight: 'golden-hour-morning',
    description: 'During October–January harvest season, raised African drying beds are spread with thousands of red and orange coffee cherries – an abstract, textural feast for macro photography.',
    tips: ['Visit Daye Bensa washing station to photograph fresh cherry sorting.', 'Overhead/flat lay compositions work brilliantly for macro lens shots of cherries.', 'Early morning light from the east glows through the semi-transparent red cherries.', 'Ask the station manager before shooting employees at work.'],
    difficulty: 'moderate',
    permitRequired: false
  },
  {
    id: 'photo-3',
    name: 'Wondo Genet Colobus Forest Walk',
    town: 'Wondo Genet',
    coordinates: [7.066, 38.622],
    type: 'wildlife',
    bestLight: 'golden-hour-morning',
    description: 'The ancient forest of Wondo Genet hosts large black-and-white Colobus monkey troops that move through the canopy at dawn. The dappled light through Podocarpus trees is ethereal.',
    tips: ['Enter the forest between 6:30–8:30 AM for best light and active wildlife.', 'A 400mm or 500mm telephoto is ideal for canopy monkey shots.', 'Move slowly and quietly – sudden movement causes flight response.', 'The forest floor creates excellent leading lines with shaft light.'],
    difficulty: 'moderate',
    permitRequired: false
  },
  {
    id: 'photo-4',
    name: 'Fichee-Chambalaalla Village Procession',
    town: 'Hawassa / Yirgalem',
    coordinates: [7.058, 38.474],
    type: 'culture',
    bestLight: 'any',
    description: 'During the Sidama New Year (June/July), entire communities dress in white cotton and march between hamlets with flowers, ululating and drumming. A spectacular celebration of ethnic identity and UNESCO heritage.',
    tips: ['The procession typically begins at the clan elder\'s compound at 9:00 AM.', 'Shoot wide to capture the entire procession as a river of white through green hills.', 'A 35mm or 50mm prime lens works beautifully for intimate portrait moments.', 'Ask a local guide to introduce you – community hosts often welcome respectful photographers into procession.'],
    difficulty: 'easy',
    permitRequired: false
  },
  {
    id: 'photo-5',
    name: 'Sidama Highland Ridge at Hula',
    town: 'Hula',
    coordinates: [6.636, 38.365],
    type: 'landscape',
    bestLight: 'golden-hour-evening',
    description: 'The sweeping ridge above Hula town offers a panoramic view of the entire Sidama highlands, Rift Valley escarpment, and on clear days, Dinsho peaks to the east.',
    tips: ['Drive the dirt road above Hula market 6 km to the summit viewpoint.', 'The ridge often catches dramatic storm light in June–September rainy season.', 'Bring a wide-angle (16–35mm) for landscape sweeps and a tripod for dusk shots.', 'The view is best from mid-afternoon through golden hour (4:30–6:00 PM).'],
    difficulty: 'moderate',
    permitRequired: false
  },
  {
    id: 'photo-6',
    name: 'Sidama Traditional Market Day – Yirgalem',
    town: 'Yirgalem',
    coordinates: [6.753, 38.418],
    type: 'urban',
    bestLight: 'midday',
    description: 'Yirgalem\'s twice-weekly market draws Sidama farmers in traditional wraps, merchants with spice mounds, and women selling enset products. A vivid tapestry of color, commerce, and community.',
    tips: ['Market days are Monday and Thursday – arrive by 8:00 AM before crowds peak.', 'The spice merchants in the inner ring offer vibrant color compositions.', 'A street-length portrait lens (85mm) gives working distance for candid shots.', 'Always smile and greet before raising your camera to any individual.'],
    difficulty: 'easy',
    permitRequired: false
  }
];
