export interface MusicTradition {
  id: string;
  name: string;
  sidamaName: string;
  category: 'music' | 'dance' | 'instrument';
  occasion: string[];
  description: string;
  culturalSignificance: string;
  whereSeen: string[];
  bestTime: string;
  tip: string;
}

export const sidamaMusicDanceTraditions: MusicTradition[] = [
  {
    id: 'music-1',
    name: 'Duro Chant',
    sidamaName: 'Duro',
    category: 'music',
    occasion: ['Funerals', 'Memorial gatherings', 'Ancestral ceremonies'],
    description:
      'A solemn, deeply resonant antiphonal chant led by community elders. Call-and-response verses honour the life of the deceased and guide their spirit to the ancestors. The lead chanter (Duro-gira) improvises praise poetry while the assembly echoes a refrain.',
    culturalSignificance:
      'Central to Sidama mortuary rituals. The Duro is believed to ease the transition of the soul and signal communal grief. It is also a living oral archive — eulogies encode genealogies and clan histories.',
    whereSeen: ['Village funeral compounds', 'Clan elder gatherings in Aleta Wendo', 'Hawassa peri-urban Sidama neighbourhoods'],
    bestTime: 'Year-round (occasion-dependent)',
    tip: 'Always ask permission before attending or recording a Duro ceremony. Dress conservatively and accept any food offered as a mark of respect.',
  },
  {
    id: 'music-2',
    name: 'Shagayye Celebration Song',
    sidamaName: 'Shagayye',
    category: 'music',
    occasion: ['Joyful ceremonies', 'Weddings', 'Harvest celebrations', 'Coming-of-age rites'],
    description:
      'An exuberant, ululation-rich communal song performed almost exclusively by women. Short melodic phrases are layered with high-pitched calls (lilili) and handclapping. Shagayye signals happiness and communal blessing.',
    culturalSignificance:
      'Women\'s primary musical voice in Sidama society. Shagayye affirms community bonds during life transitions and is considered a powerful blessing from the female lineage.',
    whereSeen: ['Wedding venues across Yirgalem and Dale', 'Luwa age-grade ceremonies', 'Cultural tourism showcases in Hawassa'],
    bestTime: 'Harvest season (Oct–Dec), wedding season (Jan–Mar)',
    tip: 'Women travelers are sometimes warmly invited to join ululations — a joyful compliment if offered.',
  },
  {
    id: 'music-3',
    name: 'Fuke Warrior Dance',
    sidamaName: 'Fuke',
    category: 'dance',
    occasion: ['Luwa age-grade transitions', 'Harvest celebrations', 'Cultural festivals'],
    description:
      'A powerful stamping and leaping men\'s dance originating from warrior traditions. Dancers form concentric lines, moving in unison with dramatic high kicks and rhythmic ground-strikes. The lead dancer (Fuke-hira) improvises acrobatic solo sequences.',
    culturalSignificance:
      'Embodiment of Sidama masculine valor and community solidarity. The Fuke marks graduation of young men into the Gadaa-influenced Luwa system age grades.',
    whereSeen: ['Luwa ceremonies in Boricha and Dale', 'Sidama Nation Day celebrations (Nov 19)', 'Cultural showcases at Hawassa'],
    bestTime: 'November (Nation Day season), June–July (Luwa season)',
    tip: 'The ground literally shakes during Fuke. Position yourself at the edge of the circle for the best view, and leave the inner performance space clear.',
  },
  {
    id: 'music-4',
    name: 'Afole Women\'s Dance',
    sidamaName: 'Afole',
    category: 'dance',
    occasion: ['Weddings', 'Engagement ceremonies', 'Women\'s celebrations'],
    description:
      'A graceful, shoulder-and-hip dance performed by women in their finest traditional shalamas (cotton wraps). Movement is subtle — controlled shoulder rolls, gentle hip sways, and slow turning — contrasting dramatically with the vigour of men\'s dances.',
    culturalSignificance:
      'Expression of Sidama femininity, elegance, and joy. Afole also signals the transition of a bride into a new household and is a form of social bonding among women.',
    whereSeen: ['Wedding compounds throughout Eastern Sidama', 'Cultural tourism experiences in Yirgalem'],
    bestTime: 'Dry season wedding months (Jan–Mar, Jun–Aug)',
    tip: 'Female travelers who accept an invitation to try Afole steps are warmly embraced by the community.',
  },
  {
    id: 'music-5',
    name: 'Woma Traditional Lyre',
    sidamaName: 'Woma (Krar)',
    category: 'instrument',
    occasion: ['Evening storytelling', 'Praise poetry sessions', 'Cultural gatherings'],
    description:
      'A five- or six-stringed bowl lyre made from calabash and goat skin, plucked to accompany praise poetry (Durishi) and oral history recitation. Each instrument is hand-crafted and often decorated with colourful beadwork.',
    culturalSignificance:
      'The woma is the voice of Sidama oral literature. Master players (woma-gira) are community griots — keepers of genealogy, clan histories, and ethical teachings encoded in poetic verse.',
    whereSeen: ['Evening cultural gatherings in Aleta Wendo', 'Sidama coffee ceremony accompaniment', 'Sidama Cultural Centre in Hawassa'],
    bestTime: 'Year-round (evening events)',
    tip: 'Ask your host if they know a woma player — most villages have at least one elder who performs informally after dinner.',
  },
  {
    id: 'music-6',
    name: 'Kombolcha Drum Ensemble',
    sidamaName: 'Kombolcha',
    category: 'instrument',
    occasion: ['Public ceremonies', 'Harvest festivals', 'Royal/elder assemblies'],
    description:
      'A set of large, double-headed cylindrical drums played in interlocking polyrhythmic patterns. The lead drum (kombolcha-gira) sets the tempo and signals transitions between ceremony phases, while supporting drums weave syncopated counter-rhythms.',
    culturalSignificance:
      'Kombolcha drumming historically announced important community decisions, summoned clan gatherings, and marked the passage of sacred time during the Luwa cycle.',
    whereSeen: ['Sidama Nation Day parades', 'Major clan elder assemblies', 'Cultural tourism showcases'],
    bestTime: 'November (Nation Day), harvest season',
    tip: 'The kombolcha ensemble is often heard before it is seen — follow the deep bass thrum to find the ceremony.',
  },
  {
    id: 'music-7',
    name: 'Siinqee Song',
    sidamaName: 'Siinqee',
    category: 'music',
    occasion: ['Women\'s rights disputes', 'Peace-making ceremonies', 'Women\'s empowerment gatherings'],
    description:
      'A distinctive collective chant sung by groups of women bearing the siinqee (a ritual wooden staff). The song is both a plea and a demand — traditionally, a woman singing Siinqee is protected by customary law from interference.',
    culturalSignificance:
      'One of the most powerful expressions of women\'s agency in Sidama culture. The siinqee institution grants women the authority to resolve disputes and demand justice within the customary legal framework.',
    whereSeen: ['Women\'s customary justice gatherings', 'Cultural heritage demonstrations', 'Hawassa cultural centre events'],
    bestTime: 'Year-round (occasion-dependent)',
    tip: 'Witnessing a Siinqee ceremony is a rare privilege. Observe silently and respectfully — this is an active expression of Sidama women\'s rights.',
  },
  {
    id: 'music-8',
    name: 'Coffee Ceremony Song (Buna Qala)',
    sidamaName: 'Buna Qala',
    category: 'music',
    occasion: ['Daily coffee ceremonies', 'Guest welcoming', 'Morning blessings'],
    description:
      'Gentle, melodic humming and rhythmic chanting that accompanies the Sidama coffee ceremony. Songs praise the land, the rains, and the coffee itself as a gift from God. Sometimes performed call-and-response as the hostess roasts, grinds, and pours the coffee.',
    culturalSignificance:
      'Elevates the coffee ceremony from a daily ritual to a spiritual act. The Buna Qala reinforces Sidama identity as the original cultivators and ceremonial stewards of Arabica coffee.',
    whereSeen: ['Home coffee ceremonies throughout Sidama', 'Coffee farm stays in Bensa', 'Cultural experiences in Yirgalem'],
    bestTime: 'Year-round (morning)',
    tip: 'Three rounds of coffee are traditional — declining after the first two is considered impolite. Enjoy the music between rounds.',
  },
];