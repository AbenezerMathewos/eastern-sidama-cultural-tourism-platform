export interface EmergencyContact {
  id: string;
  name: string;
  number: string;
  description: string;
  available: string;
  category: 'emergency' | 'health' | 'tourism' | 'embassy';
}

export const emergencyContacts: EmergencyContact[] = [
  { id: 'ec-1', name: 'Ethiopian Emergency Line', number: '911', description: 'National police, fire and ambulance dispatch.', available: '24/7', category: 'emergency' },
  { id: 'ec-2', name: 'Hawassa Referral Hospital', number: '+251 46 220 4500', description: 'Main public hospital in Sidama regional capital Hawassa.', available: '24/7', category: 'health' },
  { id: 'ec-3', name: 'Yirgalem Hospital', number: '+251 46 555 0025', description: 'District hospital serving southern Sidama coffee belt.', available: '24/7', category: 'health' },
  { id: 'ec-4', name: 'Sidama Regional Tourism Bureau', number: '+251 46 220 7701', description: 'Official tourism support and visitor assistance office.', available: 'Mon–Fri 8:00–17:00', category: 'tourism' },
  { id: 'ec-5', name: 'Ethiopian Tourist Police (Addis HQ)', number: '+251 11 551 7100', description: 'National tourist police – report tourist fraud or robbery.', available: '24/7', category: 'tourism' },
  { id: 'ec-6', name: 'US Embassy Addis Ababa', number: '+251 11 130 6000', description: 'Emergency American Citizen Services line for US passport holders.', available: 'After-hours emergency only', category: 'embassy' },
  { id: 'ec-7', name: 'UK Embassy Addis Ababa', number: '+251 11 617 0100', description: 'British consular emergency assistance for UK nationals.', available: 'After-hours emergency only', category: 'embassy' },
  { id: 'ec-8', name: 'Hawassa Police Station', number: '+251 46 220 2222', description: 'Main police station for Hawassa city and surrounding areas.', available: '24/7', category: 'emergency' },
  { id: 'ec-9', name: 'St. Luke Catholic Hospital Wolisso (Referral)', number: '+251 11 224 0700', description: 'Referral hospital sometimes used for specialist care from Sidama.', available: '24/7', category: 'health' },
  { id: 'ec-10', name: 'Ethiopian Red Cross Society', number: '+251 11 515 6322', description: 'Emergency medical aid, blood bank, and relief services.', available: '24/7', category: 'health' }
];

export const safetyTips = [
  { title: 'Keep Copies of All Documents', body: 'Scan passport, visa, and insurance to cloud storage before departure. Email copies to a trusted contact.' },
  { title: 'Carry Emergency Cash in ETB', body: 'ATMs can be unavailable in rural highlands. Keep at least 1,000–2,000 ETB in small bills separately from your wallet.' },
  { title: 'Notify Your Host of Your Plans', body: 'Always tell your host family or guide about your daily itinerary for remote coffee farm and forest treks.' },
  { title: 'Drink Only Filtered or Bottled Water', body: 'Tap water in rural woredas is not treated. Use a filtered bottle or sealed commercial water in all small towns.' },
  { title: 'Respect Curfews and Festival Security', body: 'During Fichee-Chambalaalla festivities large crowds gather. Stay alert in public spaces and secure valuables inside.' }
];
