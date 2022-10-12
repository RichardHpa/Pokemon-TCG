import { rest } from 'msw'

import { sets } from 'fixtures/sets'
import { cards } from 'fixtures/cards'

export const handlers = [
  rest.get('https://api.pokemontcg.io/v2/sets', (req, res, ctx) => {
    const pageSize = req.url.searchParams.get('pageSize')
    // return all sets if pageSize is not specified
    let response = sets
    if (pageSize) {
      response = sets.slice(0, Number(pageSize))
    }

    return res(
      ctx.status(200),
      ctx.json({
        data: response,
        page: 1,
        pageSize: response.length,
        count: response.length,
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
