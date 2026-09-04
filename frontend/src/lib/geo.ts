// Eastern Sidama Cultural Tourism Geographic Coordinates & Landmark Registry

export interface GeoPoint {
  lat: number;
  lng: number;
}

export interface CulturalLandmark {
  id: string;
  name: string;
  zone: string;
  category: "heritage" | "coffee" | "nature" | "food" | "homestay";
  lat: number;
  lng: number;
  description: string;
  elevation?: string;
  highlight: string;
}

// Center of Eastern Sidama Cultural Tourism Zone
export const SIDAMA_MAP_CENTER: [number, number] = [6.85, 38.52];
export const SIDAMA_DEFAULT_ZOOM = 10;

// Key Cultural Sites and Attractions across Eastern Sidama
export const SIDAMA_CULTURAL_LANDMARKS: CulturalLandmark[] = [
  {
    id: "gudumale-hawassa",
    name: "Gudumale Cultural Ground (Hawassa)",
    zone: "Hawassa",
    category: "heritage",
    lat: 7.0583,
    lng: 38.4789,
    description: "The sacred assembly ground for Fichee-Chambalaalla, the Sidama New Year celebration inscribed on the UNESCO Intangible Cultural Heritage list.",
    highlight: "UNESCO World Heritage Site & Traditional Elders Assembly"
  },
  {
    id: "lake-hawassa-amora",
    name: "Amora Gedel & Lake Hawassa",
    zone: "Hawassa",
    category: "nature",
    lat: 7.053,
    lng: 38.455,
    description: "Vibrant lakeside fish market, traditional papyrus canoes, and sanctuary for Marabou storks, colobus monkeys, and pelicans.",
    highlight: "Traditional Fish Market & Wildlife Trails"
  },
  {
    id: "yirgalem-dale-forest",
    name: "Yirgalem Dale Ancient Coffee Forest",
    zone: "Yirgalem",
    category: "coffee",
    lat: 6.75,
    lng: 38.4167,
    description: "Centuries-old shade-grown Sidama garden coffee farms, bamboo hut villages, and traditional Sidama honey harvesting.",
    elevation: "1,770m",
    highlight: "Birthplace of Shade-Grown Sidama Garden Coffee"
  },
  {
    id: "wondo-genet-springs",
    name: "Wondo Genet Natural Thermal Springs",
    zone: "Wondo Genet",
    category: "nature",
    lat: 7.0167,
    lng: 38.6167,
    description: "Lush montane rainforest featuring natural warm mineral springs, waterfall trails, and medicinal botanical flora.",
    elevation: "1,880m",
    highlight: "Medicinal Thermal Springs & Mountain Bird Sanctuary"
  },
  {
    id: "aleta-wendo-belt",
    name: "Aleta Wendo High-Altitude Farm Belt",
    zone: "Aleta Wendo",
    category: "coffee",
    lat: 6.6,
    lng: 38.4167,
    description: "Picturesque hilly valleys with family-owned micro-farms, organic false banana (Enset) farming, and coffee processing mills.",
    elevation: "1,950m",
    highlight: "Enset (Kocho) Bread Processing & Mountain Coffee Tasting"
  },
  {
    id: "bensa-daye-specialty",
    name: "Bensa & Daye Cup of Excellence Mountain",
    zone: "Bensa",
    category: "coffee",
    lat: 6.5167,
    lng: 38.7667,
    description: "Internationally celebrated specialty micro-climate producing some of the world's most prized Ethiopian coffee harvests.",
    elevation: "2,100m+",
    highlight: "World-Renowned Micro-Lot Highland Coffee Tastings"
  },
  {
    id: "hula-highlands",
    name: "Hula Sidama Cultural Plateau",
    zone: "Hula",
    category: "homestay",
    lat: 6.4833,
    lng: 38.5167,
    description: "Misty highlands where traditional Sidama pastoral culture, wool weaving, and multi-generational family homestays thrive.",
    elevation: "2,600m",
    highlight: "Authentic Rural Homestays & High-Mountain Trekking"
  }
];

/**
 * Extract or resolve [latitude, longitude] for any tour/experience.
 * Handles GeoJSON [lng, lat], coordinate string "lat, lng", or intelligent name matching.
 */
export const resolveExperienceCoordinates = (experience: any, indexFallback: number = 0): [number, number] => {
  if (!experience) return SIDAMA_MAP_CENTER;

  // 1. Check GeoJSON startLocation.coordinates [lng, lat]
  const geoCoords = experience.startLocation?.coordinates;
  if (Array.isArray(geoCoords) && geoCoords.length >= 2) {
    const lng = Number(geoCoords[0]);
    const lat = Number(geoCoords[1]);
    if (!isNaN(lat) && !isNaN(lng) && lat >= 3 && lat <= 15 && lng >= 33 && lng <= 48) {
      // In Ethiopia geographic bounds: return [lat, lng]
      return [lat, lng];
    }
  }

  // 2. Check locationCoordinates string e.g. "7.0504, 38.4764"
  const rawStr = experience.locationCoordinates;
  if (typeof rawStr === "string" && rawStr.includes(",")) {
    const parts = rawStr.split(",").map(s => parseFloat(s.trim()));
    if (parts.length >= 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
      return [parts[0], parts[1]];
    }
  }

  // 3. Match against known Sidama localities from title/location/summary
  const text = `${experience.title || ""} ${experience.location || ""} ${experience.summary || ""} ${experience.description || ""}`.toLowerCase();

  if (text.includes("bensa") || text.includes("daye")) return [6.5167 + (indexFallback % 5) * 0.008, 38.7667 + (indexFallback % 5) * 0.006];
  if (text.includes("wondo")) return [7.0167 + (indexFallback % 5) * 0.006, 38.6167 + (indexFallback % 5) * 0.005];
  if (text.includes("yirgalem") || text.includes("dale")) return [6.75 + (indexFallback % 5) * 0.007, 38.4167 + (indexFallback % 5) * 0.005];
  if (text.includes("aleta") || text.includes("wendo")) return [6.6 + (indexFallback % 5) * 0.006, 38.4167 + (indexFallback % 5) * 0.006];
  if (text.includes("hula")) return [6.4833 + (indexFallback % 5) * 0.005, 38.5167 + (indexFallback % 5) * 0.005];
  if (text.includes("lake") || text.includes("fish") || text.includes("amora")) return [7.053 + (indexFallback % 5) * 0.004, 38.455 + (indexFallback % 5) * 0.004];
  if (text.includes("hawassa") || text.includes("gudumale") || text.includes("fichee")) return [7.0583 + (indexFallback % 5) * 0.005, 38.4789 + (indexFallback % 5) * 0.005];

  // 4. Default distribution around Eastern Sidama center for variety
  const angle = (indexFallback * 60 * Math.PI) / 180;
  const radius = 0.08 + (indexFallback % 3) * 0.04;
  return [
    SIDAMA_MAP_CENTER[0] + Math.sin(angle) * radius,
    SIDAMA_MAP_CENTER[1] + Math.cos(angle) * radius
  ];
};
