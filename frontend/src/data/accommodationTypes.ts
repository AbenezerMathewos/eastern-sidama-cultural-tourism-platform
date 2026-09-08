export interface AccommodationType {
  id: string;
  type: string;
  typicalCostUSD: string;
  typicalCostETB: string;
  description: string;
  bestFor: string[];
  examples: string[];
  amenities: string[];
  bookingTips: string;
}

export const accommodationTypes: AccommodationType[] = [
  {
    id: 'acc-1',
    type: 'Community Homestay',
    typicalCostUSD: '$8 – $20 per night',
    typicalCostETB: '1,000 – 2,500 ETB',
    description: 'Stay with a Sidama host family in a traditional compound home. Typically includes breakfast and dinner of enset-based dishes, a private guest room, and access to the family coffee ceremony.',
    bestFor: ['Authentic cultural immersion', 'Budget travel', 'Coffee farm access', 'Learning Sidamigna language basics'],
    examples: ['Bensa Highland Homestays', 'Yirgalem Enset Farm Stays', 'Aleta Wondo Coffee Family Hosts'],
    amenities: ['Meals included', 'Traditional bed (Kete)', 'Outdoor pit latrine or VIP toilet', 'Solar/battery lighting', 'Mobile phone charging'],
    bookingTips: 'Book via the Visit Eastern Sidama platform to ensure fair community revenue sharing and verified host safety standards.'
  },
  {
    id: 'acc-2',
    type: 'Eco-Lodge & Tented Camp',
    typicalCostUSD: '$25 – $70 per night',
    typicalCostETB: '3,000 – 8,500 ETB',
    description: 'Eco-certified lodges and permanent tented camps set in coffee agroforests, lakeshores, or mountain ridges. Designed for low environmental impact with nature-first design philosophy.',
    bestFor: ['Nature & birdwatching', 'Couples and honeymoons', 'Photography expeditions', 'Highland trekking base camps'],
    examples: ['Aregash Lodge (Yirgalem)', 'Wabe Shebelle Hotel (Wondo Genet vicinity)', 'Sidama Highlands Camp (Hula)'],
    amenities: ['En-suite bathroom', 'Solar power', 'Wi-Fi (limited)', 'Restaurant & bar', 'Guided nature walks'],
    bookingTips: 'Book directly or via the platform 2+ weeks in advance for peak season (Jan–Mar, Oct–Nov). Bring a headlamp for camp-to-dining walkways at night.'
  },
  {
    id: 'acc-3',
    type: 'Mid-Range City Hotel',
    typicalCostUSD: '$30 – $80 per night',
    typicalCostETB: '3,500 – 9,600 ETB',
    description: 'Comfortable business and leisure hotels in Hawassa and Yirgalem city centers, offering reliable hot water, Wi-Fi, air conditioning, and a restaurant.',
    bestFor: ['Business travelers', 'First-time visitors', 'Airport proximity', 'Group travel with children'],
    examples: ['Haile Resort Hawassa', 'Lewi Resort Hawassa', 'Pinna Hotel Hawassa', 'Sunny Side Hotel Yirgalem'],
    amenities: ['Hot shower', '24-hr reception', 'Restaurant', 'Air conditioning', 'Parking', 'Wi-Fi'],
    bookingTips: 'Haile Resort offers the best lake views in Hawassa. Ask for a lake-facing room. Rates can be negotiated for stays of 3+ nights in low season.'
  },
  {
    id: 'acc-4',
    type: 'Budget Guest House (Pension)',
    typicalCostUSD: '$4 – $12 per night',
    typicalCostETB: '500 – 1,500 ETB',
    description: 'Basic family-run guest houses (locally called "Pension" or "Bet") found throughout small towns. Simple private rooms, shared bathrooms, and Ethiopian breakfast available.',
    bestFor: ['Backpackers', 'Solo travelers', 'Extended regional travel', 'Market research trips'],
    examples: ['Various pensions in Aleta Wondo town center', 'Daye Pension – Yirgalem', 'Cafeteria pensions along Hawassa-Dilla highway'],
    amenities: ['Private room', 'Shared bathroom', 'Ethiopian breakfast option', 'Basic lock & key security'],
    bookingTips: 'Inspect rooms before paying. Request a room away from the street for quieter sleep. Avoid budget pensions near bus terminals in Hawassa for safety.'
  }
];
