export interface VisaRequirement {
  countryGroup: string;
  countries: string[];
  visaType: string;
  canApplyOnArrival: boolean;
  canApplyOnline: boolean;
  processingDays: string;
  fee: string;
  maxStayDays: number;
  notes: string;
}

export const visaRequirements: VisaRequirement[] = [
  {
    countryGroup: "eVisa Countries (Most Nationalities)",
    countries: ["USA", "UK", "Germany", "France", "Canada", "Australia", "Netherlands", "Sweden", "Japan", "South Korea", "Most EU countries", "Many African nations"],
    visaType: "eVisa (Electronic Visa)",
    canApplyOnArrival: false,
    canApplyOnline: true,
    processingDays: "3 – 7 business days",
    fee: "USD 82 (single entry 30 days) | USD 112 (single entry 90 days)",
    maxStayDays: 90,
    notes: "Apply at evisa.gov.et. Upload passport bio-data page and recent photo. Approved eVisa must be printed and shown at immigration. Valid for entry via Addis Ababa Bole International Airport (ADD) and main land border crossings."
  },
  {
    countryGroup: "Visa on Arrival Countries",
    countries: ["Kenya (selected nationalities)", "Djibouti", "Eritrea"],
    visaType: "Visa on Arrival",
    canApplyOnArrival: true,
    canApplyOnline: false,
    processingDays: "Immediate at port of entry",
    fee: "USD 50 – 70 depending on stay duration",
    maxStayDays: 30,
    notes: "Available only at Bole International Airport. Carry cash USD for visa fee payment. Immigration can be slow during peak arrivals – allow extra time."
  },
  {
    countryGroup: "Visa-Free Countries",
    countries: ["Seychelles", "Lesotho", "Madagascar (pending bilateral agreements)"],
    visaType: "Visa-Free Entry",
    canApplyOnArrival: false,
    canApplyOnline: false,
    processingDays: "N/A",
    fee: "Free",
    maxStayDays: 30,
    notes: "Verify current bilateral agreement status before travel as these arrangements change. Ethiopian Ministry of Foreign Affairs website lists current visa-free countries."
  }
];

export const entryRequirements = [
  { title: "Valid Passport", detail: "Must be valid for at least 6 months beyond your planned departure date from Ethiopia." },
  { title: "Yellow Fever Certificate", detail: "Required if arriving from or transiting through a Yellow Fever endemic country. Keep your ICVP card accessible." },
  { title: "Return / Onward Ticket", detail: "Immigration officers may request proof of onward travel. Have a return ticket or confirmed next-country flight booked." },
  { title: "Proof of Accommodation", detail: "Hotel booking confirmation or host family invitation letter (for homestay visits) is recommended." },
  { title: "Sufficient Funds", detail: "Immigration may ask about financial means for your stay. $50 USD/day is a common benchmark, though rarely enforced." },
  { title: "eVisa Print-out", detail: "Print your approved eVisa or save a high-quality screenshot accessible offline. Do not rely on mobile data at immigration." }
];
