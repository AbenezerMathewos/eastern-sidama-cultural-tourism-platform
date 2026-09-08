export interface PackingItem {
  id: string;
  name: string;
  category: 'clothing' | 'footwear' | 'weather' | 'health' | 'gear' | 'culture';
  season: 'all' | 'dry' | 'rainy';
  essential: boolean;
  notes: string;
}

export interface PackingCategory {
  key: PackingItem['category'];
  title: string;
  iconName: string;
  description: string;
}

export const packingCategories: PackingCategory[] = [
  {
    key: 'clothing',
    title: 'Clothing & Layers',
    iconName: 'Shirt',
    description: 'Modest, breathable daywear with warm highland layers for evenings.'
  },
  {
    key: 'footwear',
    title: 'Footwear',
    iconName: 'Footprints',
    description: 'Sturdy shoes for walking red volcanic soil and coffee agroforestry paths.'
  },
  {
    key: 'weather',
    title: 'Weather & Sun',
    iconName: 'Sun',
    description: 'Sun protection for Rift Valley daylight and rain essentials for afternoon showers.'
  },
  {
    key: 'health',
    title: 'Health & Personal Care',
    iconName: 'ShieldAlert',
    description: 'Personal first aid, insect repellant, and hydration essentials.'
  },
  {
    key: 'gear',
    title: 'Electronics & Gear',
    iconName: 'Camera',
    description: 'Power banks, adapters, and camera protection for forest walks.'
  },
  {
    key: 'culture',
    title: 'Cultural Modesty & Gifts',
    iconName: 'Sparkles',
    description: 'Modest wraps (Netela/Scarf) and respectful community homestay tokens.'
  }
];

export const packingItems: PackingItem[] = [
  {
    id: 'pack-1',
    name: 'Lightweight Fleece or Thermal Jacket',
    category: 'clothing',
    season: 'all',
    essential: true,
    notes: 'Highland towns like Hula and Bensa drop to 8-12°C at night even in dry months.'
  },
  {
    id: 'pack-2',
    name: 'Modest Long Trousers or Midi/Maxi Skirts',
    category: 'clothing',
    season: 'all',
    essential: true,
    notes: 'Sidama rural communities appreciate shoulders and knees covered.'
  },
  {
    id: 'pack-3',
    name: 'Waterproof Breathable Rain Jacket',
    category: 'weather',
    season: 'rainy',
    essential: true,
    notes: 'Critical from June through September (Kiremt) and April-May (Belg).'
  },
  {
    id: 'pack-4',
    name: 'Sturdy Waterproof Hiking Boots / Trail Shoes',
    category: 'footwear',
    season: 'all',
    essential: true,
    notes: 'Soil in coffee farms can become slippery clay when damp.'
  },
  {
    id: 'pack-5',
    name: 'Slip-on Shoes / Sandals for Homestays',
    category: 'footwear',
    season: 'all',
    essential: false,
    notes: 'Shoes are removed before stepping onto grass-carpeted floors in traditional Wollo huts.'
  },
  {
    id: 'pack-6',
    name: 'Light Cotton Scarf or Traditional Netela',
    category: 'culture',
    season: 'all',
    essential: true,
    notes: 'Useful for sun protection, dust on gravel roads, and covering shoulders when visiting elders.'
  },
  {
    id: 'pack-7',
    name: 'High-SPF Sunscreen & Broad-Brimmed Hat',
    category: 'weather',
    season: 'dry',
    essential: true,
    notes: 'High altitude UV index near the Equator is intense around Hawassa and Aleta Wondo.'
  },
  {
    id: 'pack-8',
    name: 'DEET or Picaridin Insect Repellent',
    category: 'health',
    season: 'all',
    essential: true,
    notes: 'Hawassa lakeside and lower elevations have mosquitoes at dusk.'
  },
  {
    id: 'pack-9',
    name: 'Insulated Reusable Water Bottle with Filter',
    category: 'health',
    season: 'all',
    essential: true,
    notes: 'Minimizes single-use plastic while ensuring clean hydration during village excursions.'
  },
  {
    id: 'pack-10',
    name: 'High-Capacity Power Bank (10,000+ mAh)',
    category: 'gear',
    season: 'all',
    essential: true,
    notes: 'Rural villages may have intermittent electricity or solar-only charging.'
  },
  {
    id: 'pack-11',
    name: 'Type C & F European Plug Adapters',
    category: 'gear',
    season: 'all',
    essential: true,
    notes: 'Standard 220V round-pin sockets are used across Ethiopian lodges and guest houses.'
  },
  {
    id: 'pack-12',
    name: 'Electrolyte Packets & Oral Rehydration Salts',
    category: 'health',
    season: 'all',
    essential: false,
    notes: 'Helps with acclimatization and long sunny walks through coffee groves.'
  }
];
