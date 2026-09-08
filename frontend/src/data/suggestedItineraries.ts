export interface ItineraryDay {
  day: number;
  title: string;
  location: string;
  activities: string[];
  meals: string;
  accommodation: string;
  highlight: string;
  distanceKm?: number;
}

export interface SuggestedItinerary {
  id: string;
  title: string;
  duration: string;
  days: number;
  theme: string;
  difficulty: 'easy' | 'moderate' | 'challenging';
  totalCostUSD: string;
  bestSeason: string;
  overview: string;
  schedule: ItineraryDay[];
}

export const suggestedItineraries: SuggestedItinerary[] = [
  {
    id: 'itin-1',
    title: 'Sidama Coffee & Culture Weekend',
    duration: '3 Days / 2 Nights',
    days: 3,
    theme: 'Coffee Terroir & Highland Culture',
    difficulty: 'easy',
    totalCostUSD: '$120 – $200 per person',
    bestSeason: 'October – March (dry season)',
    overview: 'A perfect first visit to Eastern Sidama: spend two nights among the mist-draped highlands, witness a Sidama coffee ceremony, visit a specialty washing station, and share meals with a host family in Yirgalem.',
    schedule: [
      {
        day: 1,
        title: 'Arrival in Hawassa & Lake Promenade',
        location: 'Hawassa',
        activities: ['Fly Addis Ababa (ADD) → Hawassa (HWA) or drive (275 km / 3.5 hrs)', 'Lakeside walk along Hawassa waterfront & fishermen's market', 'Sunset coffee ceremony at your hotel or hosted café'],
        meals: 'Lunch at Haile Resort lakeside restaurant | Dinner: local tej house',
        accommodation: 'Haile Resort Hawassa or Lewi Resort',
        highlight: 'First sighting of Lake Hawassa's hippos and African fish eagles at dusk.'
      },
      {
        day: 2,
        title: 'Yirgalem Coffee Agro-Forest Walk',
        location: 'Yirgalem',
        activities: ['Minibus to Yirgalem (45 min)', 'Guided coffee agroforest walk with local farmer', 'Visit a Sidama Specialty Coffee washing station during pulping season', 'Traditional enset cooking workshop with host family'],
        meals: 'Breakfast: injera & honey at homestay | Lunch: packed field lunch | Dinner: enset-based feast with family',
        accommodation: 'Aregash Eco-Lodge or Community Homestay (Yirgalem)',
        highlight: 'Hand-pick ripe red coffee cherries at 2,000m elevation and watch them be pulped.',
        distanceKm: 45
      },
      {
        day: 3,
        title: 'Wondo Genet Hot Springs & Return',
        location: 'Wondo Genet → Hawassa → Departure',
        activities: ['Morning walk in the Wondo Genet botanical garden and bird forest', 'Soak in natural mineral hot springs (Filwoha)', 'Return to Hawassa for airport transfer or onward journey'],
        meals: 'Breakfast at lodge | Lunch: Wondo Genet garden café',
        accommodation: 'N/A (departure day)',
        highlight: 'Wondo Genet forest is home to Colobus monkeys and over 150 endemic bird species.',
        distanceKm: 20
      }
    ]
  },
  {
    id: 'itin-2',
    title: 'Bensa Highland Coffee Belt Trek',
    duration: '5 Days / 4 Nights',
    days: 5,
    theme: 'Specialty Coffee Sourcing & Birdwatching',
    difficulty: 'moderate',
    totalCostUSD: '$250 – $420 per person',
    bestSeason: 'November – February',
    overview: 'A deep dive into the legendary Bensa coffee origin—visiting micro-lot washing stations, tasting rare natural and washed lots at source, and trekking between highland communities at 2,200–2,600m altitude.',
    schedule: [
      { day: 1, title: 'Addis → Hawassa → Yirgalem', location: 'Hawassa / Yirgalem', activities: ['Fly or drive to Hawassa', 'Transfer to Yirgalem by minibus', 'Rest and acclimatization at eco-lodge'], meals: 'Dinner at lodge', accommodation: 'Aregash Lodge – Yirgalem', highlight: 'First taste of Yirgalem natural-process coffee at lodge.' },
      { day: 2, title: 'Yirgalem to Aleta Wondo Coffee Trail', location: 'Aleta Wondo', activities: ['4WD transfer to Aleta Wondo highland entrance', 'Visit Aleto cooperative washing station', 'Afternoon cupping session with local cooperative head'], meals: 'Full board at community guesthouse', accommodation: 'Community Guesthouse – Aleta Wondo', highlight: 'Cup 8 micro-lots from the Aleto Aleto cooperative at source.', distanceKm: 30 },
      { day: 3, title: 'Bensa Highlands Trek Day 1', location: 'Bensa', activities: ['4WD to Bensa trailhead (2,100m)', 'Full-day trek through Arabica shade-grown forest (10 km)', 'Overnight at Bensa homestay family'], meals: 'Packed lunch on trail | Homestay dinner', accommodation: 'Bensa Highland Homestay', highlight: 'Walk through wild endemic forest where Coffea arabica evolved.', distanceKm: 10 },
      { day: 4, title: 'Bensa Highlands Trek Day 2 & Washing Station', location: 'Bensa', activities: ['Morning trek to highest ridge viewpoint (2,580m)', 'Visit Bensa Bombe Washing Station during peak harvest', 'Drive down to Yirgalem'], meals: 'Homestay breakfast | Lodge dinner', accommodation: 'Aregash Lodge – Yirgalem', highlight: 'Panoramic view of the entire Sidama highlands and Rift Valley escarpment.' },
      { day: 5, title: 'Return Journey', location: 'Yirgalem → Hawassa → Addis', activities: ['Final cupping and coffee tasting notes review', 'Market shopping for green or roasted specialty coffee beans', 'Return to Hawassa airport or continue onward'], meals: 'Breakfast at lodge', accommodation: 'N/A', highlight: 'Return home with premium Bensa specialty coffee sourced directly from the producers.' }
    ]
  }
];
