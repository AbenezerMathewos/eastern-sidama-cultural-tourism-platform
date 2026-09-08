export interface HikingTrail {
  id: string;
  name: string;
  startPoint: string;
  endPoint: string;
  difficulty: 'easy' | 'moderate' | 'challenging';
  distanceKm: number;
  elevationGainM: number;
  durationHours: string;
  trailType: 'loop' | 'out-and-back' | 'point-to-point';
  highlights: string[];
  description: string;
  bestSeason: string;
  guideRequired: boolean;
  coordinates: { start: [number, number]; end: [number, number] };
}

export const hikingTrails: HikingTrail[] = [
  {
    id: 'trail-1',
    name: 'Wondo Genet Forest Loop',
    startPoint: 'Wondo Genet Spa Hotel',
    endPoint: 'Wondo Genet Spa Hotel',
    difficulty: 'easy',
    distanceKm: 4.5,
    elevationGainM: 120,
    durationHours: '1.5 – 2.5 hrs',
    trailType: 'loop',
    highlights: ['Colobus monkey sightings', 'Natural thermal springs', 'Ancient Podocarpus forest', 'Birding: Ethiopian Oriole, Wattled Ibis'],
    description: 'A gentle forest loop through dense Wondo Genet woodland. The trail passes natural hot springs where you can dip after the walk. Ideal for first-time visitors and families.',
    bestSeason: 'Oct – Mar (dry). Accessible year-round.',
    guideRequired: false,
    coordinates: { start: [7.066, 38.622], end: [7.066, 38.622] }
  },
  {
    id: 'trail-2',
    name: 'Bensa Highland Coffee Trail',
    startPoint: 'Bensa Market Town',
    endPoint: 'Daye Bensa Washing Station',
    difficulty: 'moderate',
    distanceKm: 10,
    elevationGainM: 480,
    durationHours: '4 – 6 hrs',
    trailType: 'point-to-point',
    highlights: ['Wild Coffea arabica shrubs in native habitat', 'Traditional Sidama homestead compounds', 'Panoramic highland ridge views', 'Highland bird species including Rüppell\'s Robin-Chat'],
    description: 'A rewarding highland trail through one of the world\'s most celebrated specialty coffee origins. The path winds through Arabica agroforest, eucalyptus groves, and farming communities before arriving at the famous Daye Bensa washing station.',
    bestSeason: 'Nov – Feb (dry, peak coffee harvest season).',
    guideRequired: true,
    coordinates: { start: [6.45, 38.32], end: [6.42, 38.29] }
  },
  {
    id: 'trail-3',
    name: 'Hula Ridge Summit Trek',
    startPoint: 'Hula Town Market',
    endPoint: 'Hula Summit Viewpoint (2,560m)',
    difficulty: 'challenging',
    distanceKm: 14,
    elevationGainM: 780,
    durationHours: '5 – 8 hrs',
    trailType: 'out-and-back',
    highlights: ['360° panoramic Rift Valley views', 'Afro-alpine moorland habitat', 'Enset farming terraces', 'Sunrise photography from summit ridge'],
    description: 'The highest accessible ridge walk in the Sidama highlands. After a sustained climb from Hula market, the trail opens to expansive moorland views across the Rift Valley and Dinsho peaks. Demanding but deeply rewarding.',
    bestSeason: 'Oct – Jan (clear skies). Avoid Jun–Aug monsoon.',
    guideRequired: true,
    coordinates: { start: [6.636, 38.365], end: [6.61, 38.34] }
  },
  {
    id: 'trail-4',
    name: 'Yirgalem Riverside Birding Walk',
    startPoint: 'Aregash Lodge – Yirgalem',
    endPoint: 'Yirgalem River Gorge',
    difficulty: 'easy',
    distanceKm: 3.5,
    elevationGainM: 60,
    durationHours: '1.5 – 2 hrs',
    trailType: 'out-and-back',
    highlights: ['Common waxbill colonies', 'Giant Kingfisher', 'Riverine fig forest', 'Traditional weaving homesteads en route'],
    description: 'A peaceful morning walk from Aregash Lodge to the forested river gorge below Yirgalem. Rich birding habitat with excellent views of kingfishers, bee-eaters, and forest francolins in the riparian vegetation.',
    bestSeason: 'Year-round. Best birding Apr – Jul (breeding season).',
    guideRequired: false,
    coordinates: { start: [6.753, 38.418], end: [6.741, 38.411] }
  }
];
