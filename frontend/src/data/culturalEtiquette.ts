export interface DressCodeRule {
  id: string;
  context: string;
  guidelines: string[];
  doNots: string[];
  notes: string;
}

export interface CulturalProtocol {
  id: string;
  title: string;
  category: 'greetings' | 'hospitality' | 'ceremonies' | 'photography' | 'general';
  description: string;
  dos: string[];
  donts: string[];
}

export const dressCodeRules: DressCodeRule[] = [
  {
    id: 'dress-1',
    context: 'Visiting Rural Homestays & Elders',
    guidelines: ['Cover shoulders and knees for both men and women.', 'Lightweight loose-fitting cotton or linen is ideal.', 'Remove shoes before entering the main living space (Bale) when invited by the host.', 'Women may be offered a traditional Sidama netela (shawl) to drape over shoulders – accept it graciously.'],
    doNots: ['Shorts above knee for men or women in elder-attended settings.', 'Sleeveless tops or halter necks.', 'Bright heavy perfume which can disrupt the scent of ceremonial incense.'],
    notes: 'Host families genuinely appreciate modest guests – it signals cultural respect and deepens your welcome.'
  },
  {
    id: 'dress-2',
    context: 'Attending a Sidama Coffee Ceremony (Buna Tetu)',
    guidelines: ['Business-casual to smart-casual is appropriate.', 'Men can wear a clean collared shirt.', 'Wearing a traditional Ethiopian cotton garment is welcomed if offered.', 'Sit cross-legged or on provided stools – avoid pointing feet at the fire or host.'],
    doNots: ['Attend while dressed in sportswear or swimwear.', 'Decline the first round of coffee (Abol) – it is the host\'s offering of community.'],
    notes: 'Three rounds of coffee (Abol, Tona, Baraka) are customary. Staying for all three rounds is an act of respect and gratitude.'
  },
  {
    id: 'dress-3',
    context: 'Fichee-Chambalaalla Festival (Sidama New Year)',
    guidelines: ['Bright festive colors are celebrated during the festival.', 'Traditional white with colorful borders (like Ethiopian dress) is appreciated and culturally resonant.', 'Women wearing traditional Sidama cotton dress (Wandaro) are warmly welcomed.'],
    doNots: ['Black attire (associated with mourning in Sidama tradition).', 'Overly revealing festival/rave-style clothing in village settings.'],
    notes: 'Fichee-Chambalaalla is an UNESCO Intangible Cultural Heritage. Dressing respectfully honors this global recognition.'
  },
  {
    id: 'dress-4',
    context: 'Trekking & Outdoor Activities',
    guidelines: ['Moisture-wicking long trousers protect against highland sun and thorny trails.', 'Light-colored clothing reflects sunlight at altitude (2,000–2,600m).', 'Layering is essential: temperatures can swing 15°C between dawn and noon.'],
    doNots: ['Cotton-only base layers that stay wet after heavy forest dew.', 'Sandals on unpaved coffee farm trails.'],
    notes: 'Many trails pass through farming communities. Modest, practical clothing respects both local culture and the highland environment.'
  }
];

export const culturalProtocols: CulturalProtocol[] = [
  {
    id: 'prot-1',
    title: 'Greetings & Respect for Elders',
    category: 'greetings',
    description: 'Sidama culture places immense value on elder respect. Greetings are an important social ritual and should never be rushed.',
    dos: ['Greet elders and community leaders first when entering a group.', 'Use both hands when shaking hands with an elder (right hand supported by left arm).', 'Learn basic Sidamigna greetings: "Ikkido?" (How are you?) and "Yoo" (I am fine).', 'Bow slightly when being introduced to community elders or clan leaders.'],
    donts: ['Walk past elders without acknowledgment.', 'Use first names for elders without permission.', 'Interrupt an elder who is speaking.']
  },
  {
    id: 'prot-2',
    title: 'Coffee Ceremony Hospitality',
    category: 'hospitality',
    description: 'The Buna Tetu (coffee ceremony) is the cornerstone of Sidama social life. Being invited to one is an honor.',
    dos: ['Accept every cup offered to you gracefully.', 'Hold the small handleless cup (Jebena cup) with both hands when receiving from an elder.', 'Express appreciation: "Galatoomme" (Thank you) after each round.', 'Participate in the ceremonial grass-spreading and incense burning if invited.'],
    donts: ['Rush the ceremony – it should last 30–90 minutes.', 'Ask for sugar unless it is offered (traditional Sidama coffee is drunk black with salt or butter).', 'Use your phone extensively during the ceremony.']
  },
  {
    id: 'prot-3',
    title: 'Photography Etiquette',
    category: 'photography',
    description: 'Photography is a privilege in Sidama communities, not a right. Always seek informed verbal consent.',
    dos: ['Ask permission verbally before photographing any person, especially elders and women.', 'Show subjects their photos on your camera screen afterward – this often creates genuine joy.', 'Offer to share digital copies via WhatsApp with hosts who are willing.', 'Focus creative lens on landscapes, food, and ceremonies with full-group consent.'],
    donts: ['Point a camera at women in private courtyards without asking.', 'Photograph sacred ceremonial sites or clan objects without explicit invitation.', 'Sell or publish photos commercially without written consent.', 'Use flash photography during night ceremonies.']
  }
];
