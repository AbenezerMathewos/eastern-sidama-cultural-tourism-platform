export interface InternetConnectivity {
  area: string;
  coverage: 'excellent' | 'good' | 'limited' | 'none';
  providers: string[];
  typicalSpeedMbps: string;
  bestSimCard: string;
  notes: string;
}

export const connectivityGuide: InternetConnectivity[] = [
  { area: 'Hawassa City Center', coverage: 'excellent', providers: ['Ethio Telecom 4G/LTE', 'Telebirr Data', 'Safaricom Ethiopia (limited)'], typicalSpeedMbps: '10–40 Mbps (4G)', bestSimCard: 'Ethio Telecom SIM', notes: 'Best connectivity in the region. Buy and register an Ethio Telecom SIM at Bole airport or the Hawassa Ethio Telecom office.' },
  { area: 'Yirgalem Town', coverage: 'good', providers: ['Ethio Telecom 4G', 'Safaricom Ethiopia (pilot)'], typicalSpeedMbps: '5–20 Mbps', bestSimCard: 'Ethio Telecom SIM', notes: 'Aregash Lodge has dedicated Wi-Fi. Town center cafes offer limited free Wi-Fi.' },
  { area: 'Aleta Wondo', coverage: 'good', providers: ['Ethio Telecom 3G/4G'], typicalSpeedMbps: '2–10 Mbps', bestSimCard: 'Ethio Telecom SIM', notes: 'Coverage is good in town center. Signal weakens on roads toward washing stations.' },
  { area: 'Bensa Highland Coffee Belt', coverage: 'limited', providers: ['Ethio Telecom 3G (patchy)'], typicalSpeedMbps: '0.5–3 Mbps', bestSimCard: 'Ethio Telecom SIM (pre-loaded with data)', notes: 'Download offline maps (Maps.me or Google Maps offline) before leaving Hawassa. Signal drops in deep valleys and dense forest.' },
  { area: 'Hula & Remote Highland Woredas', coverage: 'limited', providers: ['Ethio Telecom 2G/3G (very intermittent)'], typicalSpeedMbps: '<1 Mbps or none', bestSimCard: 'N/A – rely on SMS only', notes: 'Essentially offline territory. Notify your home contacts before entering. Satellite communicators (Garmin inReach) recommended for multi-day highland treks.' },
  { area: 'Wondo Genet', coverage: 'good', providers: ['Ethio Telecom 4G'], typicalSpeedMbps: '5–15 Mbps', bestSimCard: 'Ethio Telecom SIM', notes: 'Hotel Wi-Fi available at Wondo Genet spa hotels. Data coverage is reliable in the resort area.' }
];

export const techTips = [
  { title: 'Buy a Local SIM at Arrival', body: 'Ethio Telecom SIM cards are available at Bole International Airport departures hall. Registration requires your passport. A 20GB bundle costs approximately 300 ETB ($2.30).' },
  { title: 'Download Offline Maps Before Leaving Hawassa', body: 'Google Maps and Maps.me offline downloads for the Sidama Zone are 400–600 MB. Download on lodge Wi-Fi before any highland excursion.' },
  { title: 'WhatsApp Works Well', body: 'WhatsApp is the primary communication app for hosts, guides, and local businesses across Ethiopia. Add your host\'s WhatsApp before departure.' },
  { title: 'Power Banks Are Essential', body: 'Rural homestays use solar lighting with limited device charging ports. A 20,000 mAh power bank is worth its weight.' },
  { title: 'VPN May Be Required', body: 'Some social media platforms are intermittently restricted in Ethiopia. A reliable VPN app installed before arrival ensures access.' }
];
