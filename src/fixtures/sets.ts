import type { Set } from 'types/fixtures/set'

export const sets: Set[] = [
  {
    id: 'swsh11',
    name: 'Lost Origin',
    series: 'Sword & Shield',
    printedTotal: 196,
    total: 217,
    legalities: {
      unlimited: 'Legal',
      standard: 'Legal',
      expanded: 'Legal',
    },
    ptcgoCode: 'LOR',
    releaseDate: '2022/09/09',
    updatedAt: '2022/09/09 13:45:00',
    images: {
      symbol: 'https://images.pokemontcg.io/swsh11/symbol.png',
      logo: 'https://images.pokemontcg.io/swsh11/logo.png',
    },
  },
  {
    id: 'pgo',
    name: 'Pokémon GO',
    series: 'Sword & Shield',
    printedTotal: 78,
    total: 88,
    legalities: {
      unlimited: 'Legal',
      standard: 'Legal',
      expanded: 'Legal',
    },
    ptcgoCode: 'PGO',
    releaseDate: '2022/07/01',
    updatedAt: '2022/07/06 17:07:00',
    images: {
      symbol: 'https://images.pokemontcg.io/pgo/symbol.png',
      logo: 'https://images.pokemontcg.io/pgo/logo.png',
    },
  },
  {
    id: 'swsh10tg',
    name: 'Astral Radiance Trainer Gallery',
    series: 'Sword & Shield',
    printedTotal: 30,
    total: 30,
    legalities: {
      unlimited: 'Legal',
      standard: 'Legal',
      expanded: 'Legal',
    },
    ptcgoCode: 'ASR',
    releaseDate: '2022/05/27',
    updatedAt: '2022/05/27 09:45:00',
    images: {
      symbol: 'https://images.pokemontcg.io/swsh10tg/symbol.png',
      logo: 'https://images.pokemontcg.io/swsh10tg/logo.png',
    },
  },
]

export const set = sets[0]
