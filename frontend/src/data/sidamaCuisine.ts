export interface CulinaryDish {
  id: string;
  name: string;
  sidamaName: string;
  category: 'staple' | 'ceremonial' | 'breakfast' | 'beverage' | 'condiment';
  ingredients: string[];
  description: string;
  culturalContext: string;
  dietary: ('vegetarian' | 'vegan' | 'gluten-free' | 'contains-dairy')[];
  pairingRecommendation: string;
  etiquetteTip: string;
}

export const SIDAMA_CUISINE: CulinaryDish[] = [
  {
    id: 'wasasa-burisame',
    name: 'Wasasa / Burisame (Ceremonial Enset Porridge)',
    sidamaName: 'Wasasa (Burisame)',
    category: 'ceremonial',
    ingredients: ['Fermented Enset Bulla', 'Spiced clarified butter (Niter Kibe)', 'Fresh cow milk', 'Cardamom & herbal aromatics'],
    description: 'The crown culinary symbol of Sidama hospitality and festive celebrations. A rich, silky porridge made from refined Bulla (the starch extract of false banana), enriched generously with aromatic spiced butter and whole fresh milk.',
    culturalContext: 'Traditionally cooked by maternal elders in handcrafted clay pots during Fichee-Chambalaalla, wedding ceremonies, and to welcome honored guests into the home.',
    dietary: ['vegetarian', 'gluten-free', 'contains-dairy'],
    pairingRecommendation: 'Fresh warm whole milk or freshly brewed Sidama organic highland coffee.',
    etiquetteTip: 'Served warm in traditional wooden bowls. Guests are served first; it is customary to express admiration for the aroma before taking the first spoon.'
  },
  {
    id: 'wesse-kocho',
    name: 'Wesse (Traditional Baked Kocho Flatbread)',
    sidamaName: 'Wesse / Kocho',
    category: 'staple',
    ingredients: ['Fermented Enset pulp', 'Kosso/herb leaf seasoning', 'Clay griddle baking'],
    description: 'The sustaining bread of the Sidama highlands, prepared by fermenting the scraped pseudo-stem and corm of the Enset tree underground in earthen fermentation pits for several months.',
    culturalContext: 'Enset is known as "The Tree Against Hunger" in Ethiopia. The preparation of Kocho represents cooperative female solidarity, where neighbor women gather to scrape and process the fiber.',
    dietary: ['vegetarian', 'vegan', 'gluten-free'],
    pairingRecommendation: 'Tibbs stew, collard greens (Gomen), or Ayib (fresh Ethiopian curd cheese).',
    etiquetteTip: 'Break pieces using your right hand only and fold them to scoop stews or dips.'
  },
  {
    id: 'amulcho',
    name: 'Amulcho (Crisp Steamed Enset Flat Cake)',
    sidamaName: 'Amulcho',
    category: 'staple',
    ingredients: ['Fine-grated Enset', 'Banana leaves for wrapping', 'Open hearth fire steaming'],
    description: 'Thin, unleavened pancake-style bread made from freshly kneaded Enset pulp wrapped neatly in protective green Enset leaves and baked over charcoal.',
    culturalContext: 'Eaten as daily nourishment in morning hours before heading to highland coffee plots or livestock pasturing.',
    dietary: ['vegetarian', 'vegan', 'gluten-free'],
    pairingRecommendation: 'Ititu curd, local mountain honey, and steaming dark roast coffee.',
    etiquetteTip: 'Often unwrapped warm directly at the table; enjoy the earthy herbal leaf aroma.'
  },
  {
    id: 'buna-qala',
    name: 'Buna Qala (Spiced Butter-Poached Coffee Cherries)',
    sidamaName: 'Buna Qala',
    category: 'ceremonial',
    ingredients: ['Whole ripe red coffee cherries', 'Pure highland butter (Kibe)', 'Rue (Tena\'adam)', 'Nigella seed'],
    description: 'An ancient ceremonial preparation where intact sun-dried or freshly plucked ripe coffee cherries are gently stewed in clarified butter with aromatic highland herbs.',
    culturalContext: 'Shared as a spiritual benediction to invoke peace, fertility, and community welfare during elder councils and family milestones.',
    dietary: ['vegetarian', 'gluten-free', 'contains-dairy'],
    pairingRecommendation: 'Fresh raw milk or roasted barley snack (Kolo).',
    etiquetteTip: 'Receive the bowl with both hands extended and partake in the elder\'s spoken blessings before eating.'
  },
  {
    id: 'siljo',
    name: 'Siljo (Fermented Broad Bean & Mustard Dip)',
    sidamaName: 'Siljo',
    category: 'condiment',
    ingredients: ['Fava bean flour', 'Black mustard seed powder (Senafich)', 'Safflower infusion', 'Rue'],
    description: 'A zesty, probiotic-rich dip prepared through slow fermentation of broad bean flour and mustard seeds, delivering a vibrant pungent tang.',
    culturalContext: 'A traditional favorite throughout fasting periods and celebratory banquets to complement hearty Enset cakes.',
    dietary: ['vegetarian', 'vegan', 'gluten-free'],
    pairingRecommendation: 'Warm baked Kocho flatbread or steamed Amulcho.',
    etiquetteTip: 'Use a small strip of Kocho to swipe a modest amount from the communal serving dish.'
  },
  {
    id: 'ititu-sidama',
    name: 'Sidama Ititu (Natural Clay-Aged Curd Cheese)',
    sidamaName: 'Ititu',
    category: 'breakfast',
    ingredients: ['Fresh whole cow milk', 'Smoked clay pot vessel', 'Spiced whey culture'],
    description: 'Creamy, thick artisanal curd made by naturally culturing milk in smoke-cured clay gourds, imparting a distinctive rustic smoky note.',
    culturalContext: 'Reflects the ancient agro-pastoral heritage of the Sidama people, where cattle are symbols of wealth, honor, and life sustenance.',
    dietary: ['vegetarian', 'gluten-free', 'contains-dairy'],
    pairingRecommendation: 'Pure wild mountain honey and freshly roasted grain.',
    etiquetteTip: 'Often offered to guests upon entering the homestead as a refreshment after mountain trekking.'
  }
];

export const CUISINE_DIETARY_OPTIONS = [
  { id: 'all', label: 'All Specialties' },
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'vegan', label: 'Vegan / Plant-Based' },
  { id: 'gluten-free', label: 'Naturally Gluten-Free' }
];
