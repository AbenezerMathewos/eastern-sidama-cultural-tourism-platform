export interface TransitOption {
  id: string;
  name: string;
  localName: string;
  category: "urban" | "intercity" | "highland" | "air";
  bestFor: string;
  typicalCostETB: string;
  costUSD: string;
  availability: string;
  recommendedFor: string[];
  safetyTips: string[];
  icon: string;
}

export interface TransitHub {
  name: string;
  city: string;
  type: string;
  coordinates: [number, number];
  routesServed: string[];
}

export const TRANSIT_OPTIONS: TransitOption[] = [
  {
    id: "transit-bajaj",
    name: "Bajaj (Three-Wheeler)",
    localName: "Bajaj / Auto-rickshaw",
    category: "urban",
    bestFor: "Short trips within Hawassa, Yirgalem, Aleta Wondo, and Wondo Genet town centers.",
    typicalCostETB: "30 - 80 ETB (Shared) | 150 - 300 ETB (Contract/Private)",
    costUSD: "~$0.30 - $2.50",
    availability: "6:00 AM - 10:00 PM throughout urban centers",
    recommendedFor: ["Lake Hawassa waterfront", "City restaurants", "Local coffee bars", "Hotel transfers"],
    safetyTips: [
      "Agree on the fare before boarding if taking a private contract (Kurit).",
      "Keep backpacks between your legs away from open side curtains.",
      "Cash in small ETB denominations is required; drivers rarely have change for 200 ETB notes."
    ],
    icon: "Car"
  },
  {
    id: "transit-minibus",
    name: "Minibus Taxi & Coaster",
    localName: "Taxi / Coaster",
    category: "intercity",
    bestFor: "Budget travel between Hawassa, Yirgalem, Aleta Wondo, Dilla, and Leku.",
    typicalCostETB: "70 - 200 ETB depending on corridor distance",
    costUSD: "~$0.60 - $1.80",
    availability: "Continuous departures from sunrise to dusk from main bus terminals (Menahariya)",
    recommendedFor: ["Inter-town day excursions", "Market day travel", "Eco-trail base transfers"],
    safetyTips: [
      "Board at the official terminal (Menahariya) to ensure set tariff rates.",
      "Tell the Woyala (conductor) your drop-off landmark clearly in advance.",
      "Carry water and snacks during market days when traffic slows around intersections."
    ],
    icon: "Bus"
  },
  {
    id: "transit-4wd",
    name: "Private 4WD Vehicle & Local Driver",
    localName: "Kira Mekina (Rental)",
    category: "highland",
    bestFor: "Navigating rugged highland trails, washing stations in Bensa, Garamba Mountain, and deep coffee forests.",
    typicalCostETB: "4,500 - 8,000 ETB / day (fuel inclusive or per arrangement)",
    costUSD: "~$35 - $65 / day",
    availability: "Pre-booking arranged via registered platform tour operators and hosts",
    recommendedFor: ["Highland coffee washing station tours", "Mountain trekking trailheads", "Family & group travel"],
    safetyTips: [
      "Ensure vehicle has high ground clearance (Land Cruiser, Patrol, or Hilux) for rainy season dirt tracks.",
      "Hire drivers experienced with Sidama highland micro-climates and wet clay topography.",
      "Confirm spare tire, jack, and tow cable before heading into remote woredas."
    ],
    icon: "Shield"
  },
  {
    id: "transit-air",
    name: "Domestic Flight (Hawassa Airport - HWA)",
    localName: "Hawassa Yaberewochi Marefya",
    category: "air",
    bestFor: "Fast, scenic connection between Addis Ababa Bole (ADD) and the Sidama capital.",
    typicalCostETB: "3,800 - 7,500 ETB one-way (Discounted with Ethiopian Airlines international ticket)",
    costUSD: "~$35 - $65 one-way",
    availability: "Daily scheduled Bombardier Q400 flights (40 min flight time)",
    recommendedFor: ["International arrivals", "Time-pressed travelers", "Comfort seekers"],
    safetyTips: [
      "Book early during festival weeks (Fichee-Chambalaalla in June/July).",
      "Hawassa Airport is located 15 km north of Hawassa center; arrange airport pickup with your host.",
      "Checked baggage limit is 23 kg on domestic flights."
    ],
    icon: "Plane"
  }
];

export const TRANSIT_HUBS: TransitHub[] = [
  {
    name: "Hawassa Central Menahariya (Bus Terminal)",
    city: "Hawassa",
    type: "Regional Bus & Taxi Terminal",
    coordinates: [7.0504, 38.4763],
    routesServed: ["Yirgalem", "Aleta Wondo", "Wondo Genet", "Shashemene", "Addis Ababa", "Bensa"]
  },
  {
    name: "Hawassa Domestic Airport (HWA)",
    city: "Hawassa",
    type: "Commercial Airport",
    coordinates: [7.0986, 38.4989],
    routesServed: ["Addis Ababa Bole International (ADD)"]
  },
  {
    name: "Yirgalem Town Terminal",
    city: "Yirgalem",
    type: "Inter-woreda Minibus Station",
    coordinates: [6.7538, 38.4184],
    routesServed: ["Aroresa", "Hawassa", "Wondo Genet", "Apostate Eco-lodge routes"]
  },
  {
    name: "Aleta Wondo Coffee Corridor Station",
    city: "Aleta Wondo",
    type: "Highland Gateway Hub",
    coordinates: [6.595, 38.417],
    routesServed: ["Dilla", "Bensa coffee belt", "Chire", "Yirga Cheffe border"]
  }
];
