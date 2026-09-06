export interface CulturalFestival {
  id: string;
  name: string;
  sidamaName: string;
  category: 'unesco' | 'seasonal' | 'market' | 'ritual';
  timing: string;
  approximateMonth: string;
  location: string;
  woreda: string;
  description: string;
  culturalSignificance: string;
  rituals: string[];
  travelerTips: string;
  unescoInscribed: boolean;
}

export const SIDAMA_FESTIVALS: CulturalFestival[] = [
  {
    id: 'fichee-chambalaalla',
    name: 'Fichee-Chambalaalla (Sidama New Year)',
    sidamaName: 'Fichee-Chambalaalla Ayyaana',
    category: 'unesco',
    timing: 'Determined annually by Ayanto (Sidama lunar astrologers)',
    approximateMonth: 'June or July',
    location: 'Gudumaale Grounds, Hawassa & community sites across Eastern Sidama',
    woreda: 'Hawassa / All Sidama Woredas',
    description: 'Inscribed on the UNESCO Representative List of the Intangible Cultural Heritage of Humanity in 2015. Fichee is the quintessential Sidama celebration of unity, generational blessing, and cosmic renewal.',
    culturalSignificance: 'Marks the start of the Sidama New Year according to the traditional lunar-solar calendar. Elders bestow communal blessings, settle lingering disputes, and celebrate intergenerational peace.',
    rituals: [
      'Ayanto astrologers identify the start date using constellation and lunar cycles',
      'Qeexala communal folk songs and energetic dances performed door-to-door',
      'Preparation of sacred feast with Buurisame (Enset porridge with melted spiced butter and milk)',
      'Blessing ceremonies led by the clan leader (Woma) at sacred Gudumaale grounds'
    ],
    travelerTips: 'Visitors should dress respectfully in traditional or modest attire. Always request permission before photographing elders and during prayer invocations.',
    unescoInscribed: true
  },
  {
    id: 'luwa-initiation',
    name: 'Luwa Age-Set Transition Ceremony',
    sidamaName: 'Luwa Seera',
    category: 'ritual',
    timing: 'Every 7 years rotation between cyclical generation-sets',
    approximateMonth: 'Periodic (determined by elders)',
    location: 'Highland ceremonial groves throughout Eastern Sidama',
    woreda: 'Aleta Wondo, Dale & Hula',
    description: 'The ancient indigenous Sidama socio-political governance system that elevates cohort generations into civic leadership and elder stewardship.',
    culturalSignificance: 'Central to the democratic Songo council governance. Initiates assume collective responsibility for peacekeeping, justice enforcement, and environmental protection.',
    rituals: [
      'Gudumaale sacred grove congregation under ancient Podocarpus trees',
      'Transmission of oral ancestral customary laws (Seera)',
      'Hair shaving rites and presentation of ceremonial staff',
      'Blessing and affirmation by outgoing senior elders (Cimeeyye)'
    ],
    travelerTips: 'This is a deeply solemn rite. Observers are welcome at designated outer perimeters when accompanied by accredited local cultural guides.',
    unescoInscribed: false
  },
  {
    id: 'buna-qala-blessing',
    name: 'Buna Qala Coffee Harvest Blessing',
    sidamaName: 'Buna Qala Ayyaana',
    category: 'seasonal',
    timing: 'Early harvest and communal prayer periods',
    approximateMonth: 'October - December',
    location: 'Family homesteads and coffee cooperatives in Bensa, Dale, & Aleta Wondo',
    woreda: 'Bensa / Dale',
    description: 'An intimate culinary and spiritual ceremony where whole ripe coffee cherries are pan-roasted with clarified spiced butter (kibe) and offered with prayers for abundance.',
    culturalSignificance: 'Deeply honors the sacred gift of coffee (Buna) to the Sidama people. It symbolizes fertility, hospitable welcome, and spiritual gratitude to Creator (Magano).',
    rituals: [
      'Hand-picking prime ripe red coffee cherries from garden plots',
      'Pan-roasting cherries with aromatic spices and fresh farm butter',
      'Sharing roasted cherries in communal wooden bowls with prayers',
      'Fresh milk toast accompanying hot fresh coffee'
    ],
    travelerTips: 'Accepting the offering with both hands is a gesture of deep respect. Compliment the host with "Galatatoommo" (Thank you).',
    unescoInscribed: false
  },
  {
    id: 'songida-market-gathering',
    name: 'Songida Regional Vibrant Market Day',
    sidamaName: 'Songida Gaba',
    category: 'market',
    timing: 'Weekly rotating market days (e.g., Saturday and Wednesday)',
    approximateMonth: 'Year-round',
    location: 'Yirgalem, Bensa (Daye), & Aleta Chuko open markets',
    woreda: 'Dale, Bensa, Aleta Chuko',
    description: 'Bustling highland gatherings where farmers, artisans, weavers, and coffee traders converge to trade fresh produce, handwoven baskets, pottery, and livestock.',
    culturalSignificance: 'More than commerce; Songida markets serve as communication centers for community news, matchmaking, and cultural exchange.',
    rituals: [
      'Display of hand-carved Sidama wooden stools, mortar and pestles',
      'Enset (Kocho and Bulla) cake trading wrapped in lush green banana leaves',
      'Fresh mountain honey and organic garden spice trading',
      'Gathering at local tea and coffee shelters for community conversations'
    ],
    travelerTips: 'Cash in smaller denominations of Ethiopian Birr is essential. Mornings from 9:00 AM to 1:00 PM are the most vibrant times to visit.',
    unescoInscribed: false
  },
  {
    id: 'ayanto-lunar-observation',
    name: 'Ayanto Stargazing & Lunar Determination',
    sidamaName: 'Ayanto Qara Doogo',
    category: 'ritual',
    timing: 'New moon cycles leading to seasonal shifts',
    approximateMonth: 'May - June',
    location: 'Highland ridges and astronomy observation hilltops in Dale & Hula',
    woreda: 'Dale / Hula',
    description: 'The ancient astronomical observation practiced by hereditary Sidama timekeepers known as Ayanto to maintain the 28-day lunar calendar and forecast weather patterns.',
    culturalSignificance: 'Preserves indigenous astronomical knowledge passed down across dozens of generations, dictating agricultural cycles and festival schedules.',
    rituals: [
      'Night-sky tracking of star clusters and lunar crescent alignment',
      'Reading meteorological indicators in wind directions and morning dew',
      'Convening with the Clan Council to proclaim ceremonial calendars'
    ],
    travelerTips: 'Night tours must be arranged exclusively with licensed cultural guides with prior village council clearance.',
    unescoInscribed: false
  }
];

export const FESTIVAL_CATEGORIES = [
  { id: 'all', label: 'All Celebrations' },
  { id: 'unesco', label: 'UNESCO Inscribed' },
  { id: 'seasonal', label: 'Seasonal & Harvest' },
  { id: 'ritual', label: 'Traditional Rites' },
  { id: 'market', label: 'Market Gatherings' }
];
