export interface CurrencyTip {
  id: string;
  title: string;
  body: string;
  icon: string;
}

export interface MoneyExchangeLocation {
  name: string;
  city: string;
  type: string;
  address: string;
  notes: string;
}

export const ETB_RATE_NOTE = "1 USD ≈ 120–128 ETB (Sep 2026). Rates vary between CBE, commercial banks, and licensed forex bureaus. Always check the National Bank of Ethiopia (NBE) daily rate.";

export const currencyTips: CurrencyTip[] = [
  { id: 'cur-1', title: 'Carry Ethiopian Birr (ETB) in Small Denominations', body: 'Most rural markets, bajaj drivers, and village homestay hosts cannot break 200 ETB notes. Stock up on 10, 50, and 100 ETB bills at a city ATM.', icon: 'Coins' },
  { id: 'cur-2', title: 'Best ATMs: Commercial Bank of Ethiopia (CBE)', body: 'CBE ATMs in Hawassa and Yirgalem reliably accept Visa/Mastercard. Withdraw in the morning to avoid queues and machine outages.', icon: 'CreditCard' },
  { id: 'cur-3', title: 'Telebirr for Mobile Payments', body: 'Ethiopia\'s dominant mobile money service (Ethio Telecom Telebirr) is accepted at an increasing number of restaurants, hotels, and shops in Hawassa. Ask hosts to receive Telebirr for accommodation fees.', icon: 'Smartphone' },
  { id: 'cur-4', title: 'Licensed Forex Bureau Rates vs. Banks', body: 'Government-authorized forex bureaus often offer slightly better rates than CBE for cash USD/EUR exchange. Hawassa has 3 licensed bureaus near the Piazza area.', icon: 'ArrowLeftRight' },
  { id: 'cur-5', title: 'Avoid Black Market Currency Exchange', body: 'Street currency exchange is illegal and unsafe. Exchangers often use counterfeit bills or sleight-of-hand. Use only CBE, licensed forex bureaus, or hotel front desks.', icon: 'AlertTriangle' },
  { id: 'cur-6', title: 'Budget for Cash-Only Experiences', body: 'Coffee ceremony tips, guided village walks, artisan weaving purchases, and local market stalls are entirely cash-only. Budget 200–500 ETB per activity for tipping local hosts.', icon: 'Coffee' }
];

export const exchangeLocations: MoneyExchangeLocation[] = [
  { name: 'Commercial Bank of Ethiopia – Hawassa Main Branch', city: 'Hawassa', type: 'Bank & ATM', address: 'Hawassa Piazza, near Lewi Resort', notes: 'Most reliable ATM in the region. Accepts Visa, Mastercard. Limit 10,000 ETB per withdrawal.' },
  { name: 'Dashen Bank – Hawassa Branch', city: 'Hawassa', type: 'Bank & ATM', address: 'Hawassa Main Road, near Sunshine Hotel', notes: 'Good backup ATM. Occasionally out of service on Sundays.' },
  { name: 'Wegagen Bank Forex Bureau – Hawassa', city: 'Hawassa', type: 'Licensed Forex Bureau', address: 'Near Hawassa Bus Terminal', notes: 'Licensed cash USD/EUR exchange. Slightly better rate than CBE on most days.' },
  { name: 'CBE Branch – Yirgalem', city: 'Yirgalem', type: 'Bank & ATM', address: 'Yirgalem Town Center', notes: 'The only reliable ATM in Yirgalem. Withdraw cash here before heading to Aleta Wondo or highland coffee woredas.' },
  { name: 'Aleta Wondo CBE Agency', city: 'Aleta Wondo', type: 'Bank Agency', address: 'Aleta Wondo Market Road', notes: 'Limited cash withdrawal via agent banking. Not ATM. Suitable for small transactions only.' }
];
