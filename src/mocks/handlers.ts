import { rest } from 'msw'

import { sets } from 'fixtures/sets'
import { cards } from 'fixtures/cards'

export const handlers = [
  rest.get('https://api.pokemontcg.io/v2/sets', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: sets,
        page: 1,
        pageSize: sets.length,
        count: sets.length,
        totalCount: sets.length,
      }),
    )
  }),

  rest.get('https://api.pokemontcg.io/v2/cards', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: cards,
        page: 1,
        pageSize: cards.length,
        count: cards.length,
        totalCount: cards.length,
      }),
    )
  }),
]
