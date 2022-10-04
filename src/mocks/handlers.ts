import { rest } from 'msw'

import { sets } from 'fixtures/sets'

export const handlers = [
  rest.get('https://api.pokemontcg.io/v2/sets', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: sets,
        page: 1,
        pageSize: 20,
        count: sets.length,
        totalCount: 100,
      }),
    )
  }),
]
