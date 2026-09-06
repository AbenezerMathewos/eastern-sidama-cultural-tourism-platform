export type TravelStyle = 'budget' | 'cultural' | 'comfort';
export type CurrencyCode = 'ETB' | 'USD' | 'EUR';

export interface BudgetEstimateInput {
  days: number;
  travelers: number;
  style: TravelStyle;
  currency: CurrencyCode;
}

export interface BudgetBreakdown {
  accommodation: number;
  mealsAndCoffee: number;
  transport: number;
  guideAndCommunity: number;
  activitiesAndFees: number;
  total: number;
}

// Approximate baseline costs per person per day in ETB
const DAILY_COSTS_ETB: Record<TravelStyle, {
  accommodation: number;
  mealsAndCoffee: number;
  transport: number;
  guideAndCommunity: number;
  activitiesAndFees: number;
}> = {
  budget: {
    accommodation: 1200,   // Local village guesthouse / rustic homestay
    mealsAndCoffee: 800,    // Traditional Enset meals, local eateries & street coffee
    transport: 400,         // Public minibuses, shared bajaj
    guideAndCommunity: 900, // Group community cultural guide share
    activitiesAndFees: 300  // Market entry & village permits
  },
  cultural: {
    accommodation: 3200,    // Authentic eco-homestay with private amenities
    mealsAndCoffee: 1600,   // Fresh organic home-cooked feasts & private coffee ceremonies
    transport: 1500,        // Dedicated private bajaj & inter-woreda vans
    guideAndCommunity: 2000,// Licensed local elder / bilingual cultural guide
    activitiesAndFees: 800  // Coffee farm tours, agroforestry workshops & museum
  },
  comfort: {
    accommodation: 7500,    // Highland eco-lodge / boutique lakeside resort
    mealsAndCoffee: 3000,   // Premium dining, specialty cupping tastings & banquets
    transport: 5000,        // Private 4WD vehicle with driver throughout
    guideAndCommunity: 3500,// Senior specialist cultural & birding guide
    activitiesAndFees: 1800 // Private workshops, cultural performances & VIP permits
  }
};

// Approximate exchange rates
const EXCHANGE_RATES: Record<CurrencyCode, number> = {
  ETB: 1,
  USD: 1 / 130, // ~130 ETB per USD
  EUR: 1 / 140  // ~140 ETB per EUR
};

export const calculateSidamaTripBudget = (input: BudgetEstimateInput): {
  breakdown: BudgetBreakdown;
  currency: CurrencyCode;
  perPersonTotal: number;
} => {
  const days = Math.max(1, input.days);
  const travelers = Math.max(1, input.travelers);
  const costs = DAILY_COSTS_ETB[input.style];
  const rate = EXCHANGE_RATES[input.currency];

  const accommodation = Math.round(costs.accommodation * days * travelers * rate);
  const mealsAndCoffee = Math.round(costs.mealsAndCoffee * days * travelers * rate);
  const transport = Math.round(costs.transport * days * Math.ceil(travelers / 3) * rate);
  const guideAndCommunity = Math.round(costs.guideAndCommunity * days * rate);
  const activitiesAndFees = Math.round(costs.activitiesAndFees * days * travelers * rate);

  const total = accommodation + mealsAndCoffee + transport + guideAndCommunity + activitiesAndFees;
  const perPersonTotal = Math.round(total / travelers);

  return {
    breakdown: {
      accommodation,
      mealsAndCoffee,
      transport,
      guideAndCommunity,
      activitiesAndFees,
      total
    },
    currency: input.currency,
    perPersonTotal
  };
};
