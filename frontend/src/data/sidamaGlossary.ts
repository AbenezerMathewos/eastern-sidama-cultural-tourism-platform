export interface SidamaPhrase {
  id: string;
  sidama: string;
  pronunciation: string;
  english: string;
  category: 'greeting' | 'hospitality' | 'coffee' | 'etiquette' | 'direction';
  culturalNote?: string;
}

export const SIDAMA_GLOSSARY: SidamaPhrase[] = [
  {
    id: 'greeting-hello',
    sidama: 'Keere!',
    pronunciation: 'Keh-reh',
    english: 'Hello / Peace / Greetings',
    category: 'greeting',
    culturalNote: 'The universal and most respectful Sidama greeting wishing peace upon the household.'
  },
  {
    id: 'greeting-morning',
    sidama: 'Keere goffani?',
    pronunciation: 'Keh-reh gof-fah-nee',
    english: 'Good morning (How did you wake up in peace?)',
    category: 'greeting',
    culturalNote: 'Customarily spoken with both hands open in warm welcome.'
  },
  {
    id: 'greeting-evening',
    sidama: 'Keere galte?',
    pronunciation: 'Keh-reh gahl-teh',
    english: 'Good evening (Did you spend the day peacefully?)',
    category: 'greeting',
    culturalNote: 'Used from late afternoon onwards across Sidama villages.'
  },
  {
    id: 'hospitality-welcome',
    sidama: 'Danchanna daytini!',
    pronunciation: 'Dahn-chan-na dah-yee-tee-nee',
    english: 'Welcome warmly!',
    category: 'hospitality',
    culturalNote: 'Hosts proclaim this when inviting guests into a traditional bamboo cottage.'
  },
  {
    id: 'hospitality-thankyou',
    sidama: 'Galatona / Magano keere uyohe',
    pronunciation: 'Gah-lah-toh-nah / Mah-gah-no keh-reh oo-yoh-heh',
    english: 'Thank you / May God grant you peace',
    category: 'hospitality',
    culturalNote: 'Expresses deep appreciation after a coffee ceremony or shared meal.'
  },
  {
    id: 'coffee-invitation',
    sidama: 'Buna age!',
    pronunciation: 'Boo-nah ah-geh',
    english: 'Come drink coffee!',
    category: 'coffee',
    culturalNote: 'Drinking freshly roasted coffee with rue herb and popped barley (kolo) is sacred hospitality.'
  },
  {
    id: 'coffee-blessing',
    sidama: 'Buni keere aanno!',
    pronunciation: 'Boo-nee keh-reh ahn-no',
    english: 'May the coffee bring peace and good tidings!',
    category: 'coffee',
    culturalNote: 'Said by the elder or guest upon receiving the first round (Abol).'
  },
  {
    id: 'etiquette-respect',
    sidama: 'Ayyaana',
    pronunciation: 'Aye-yah-nah',
    english: 'Spirit / Grace / Dignity',
    category: 'etiquette',
    culturalNote: 'Key Sidama moral virtue emphasizing reverence for nature and fellow humans.'
  },
  {
    id: 'direction-where',
    sidama: 'Hiikkonniiti?',
    pronunciation: 'Hee-kon-nee-tee',
    english: 'Where is it located?',
    category: 'direction',
    culturalNote: 'Helpful when asking locals for walking paths toward waterfalls or markets.'
  }
];

export const CULTURAL_ETIQUETTE_TIPS: string[] = [
  'Always greet community elders with a respectful bow and two hands extended.',
  'Accept the first cup of coffee (Abol) when invited into a household as refusing is considered turning away a blessing.',
  'Remove your shoes when entering the carpeted living area of a traditional bamboo dwelling.',
  'Ask for permission from your local guide or community elder before photographing sacred rituals or elderly persons.',
  'Support local agro-ecological producers by purchasing freshly ground coffee, honey, and bamboo craft directly from artisans.'
];
