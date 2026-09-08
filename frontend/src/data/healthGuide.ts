export interface HealthVaccine {
  name: string;
  recommended: boolean;
  notes: string;
}

export interface HealthTip {
  id: string;
  title: string;
  body: string;
  category: 'food' | 'water' | 'insects' | 'altitude' | 'general';
}

export const vaccines: HealthVaccine[] = [
  { name: 'Yellow Fever', recommended: true, notes: 'Required if arriving from a Yellow Fever endemic country. Proof of vaccination may be checked at Bole airport.' },
  { name: 'Hepatitis A', recommended: true, notes: 'Strongly recommended for all travelers. Virus spread through contaminated food and water.' },
  { name: 'Typhoid', recommended: true, notes: 'Recommended particularly for adventure travelers eating at local markets and village homestays.' },
  { name: 'Hepatitis B', recommended: true, notes: 'Recommended if you may need medical treatment or have contact with blood/bodily fluids.' },
  { name: 'Rabies (Pre-Exposure)', recommended: false, notes: 'Consider if trekking through remote forested highland areas where medical care may be 6+ hours away.' },
  { name: 'Meningococcal (ACWY)', recommended: false, notes: 'Consider for extended stays during dry season when risk is higher in highland communities.' },
  { name: 'COVID-19', recommended: true, notes: 'Keep vaccinations current per your home country guidelines.' },
  { name: 'Routine Vaccinations', recommended: true, notes: 'Ensure MMR, DPT, and polio are up to date before any international travel.' }
];

export const healthTips: HealthTip[] = [
  { id: 'h-1', title: 'Malaria Prevention', body: 'Malaria risk exists at lower elevations around Hawassa lake and Wondo Genet. Take prescription antimalarials and use DEET repellent, long sleeves, and bed nets after dusk.', category: 'insects' },
  { id: 'h-2', title: 'Water Safety', body: 'Only drink bottled or filtered water. Use a travel water filter (LifeStraw or Sawyer Squeeze) at homestays. Avoid ice in drinks outside certified hotels.', category: 'water' },
  { id: 'h-3', title: 'Food Hygiene at Markets', body: 'Injera from licensed restaurants is generally safe. Avoid raw salads and unpeeled fruit bought at open-air market stalls. "If you cannot peel it, leave it."', category: 'food' },
  { id: 'h-4', title: 'Altitude Awareness', body: 'Bensa, Hula, and highland coffee zones sit at 2,100–2,600m. Ascend slowly. Drink extra water, avoid alcohol on day 1, and rest if you develop headache or nausea.', category: 'altitude' },
  { id: 'h-5', title: 'Sun & Heat Exposure', body: 'The Equatorial sun at altitude is intense. Wear SPF 50+, a wide-brimmed hat, and UV sunglasses. Stay hydrated and seek shade between 11:00 and 14:00.', category: 'general' },
  { id: 'h-6', title: 'Traveler\'s Diarrhea Kit', body: 'Pack oral rehydration salts (ORS), loperamide (Imodium), and an antibiotic (ciprofloxacin or azithromycin) prescribed by your doctor for moderate-to-severe diarrhea.', category: 'general' }
];
