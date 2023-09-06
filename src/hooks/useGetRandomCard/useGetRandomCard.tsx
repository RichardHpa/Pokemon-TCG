import { useEffect, useState } from 'react'
import axios from 'axios'

import type { Card } from 'types/fixtures/card'

const apiRoute = 'https://api.pokemontcg.io/v2/cards'
const currentTotalPokemon = 1020

export const useGetRandomCard = () => {
  const [randomCard, setRandomCard] = useState<Card>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    setLoading(true)
    setRandomCard(undefined)
    const randomPokemonNum = Math.floor(Math.random() * currentTotalPokemon)
    axios
      .get(apiRoute, {
        params: {
          q: `nationalPokedexNumbers:[${randomPokemonNum} TO ${randomPokemonNum}]`,
          page: 1,
          pageSize: 1,
        },
      })
      .then((initialReq) => {
        const { totalCount, data } = initialReq.data
        const randomPage = Math.floor(Math.random() * totalCount) + 1
        if (randomPage === 1) {
          setLoading(false)
          setRandomCard(data[0])
          return
        }
        axios
          .get(apiRoute, {
            params: {
              q: `nationalPokedexNumbers:[${randomPokemonNum} TO ${randomPokemonNum}]`,
              page: randomPage,
              pageSize: 1,
            },
          })
          .then((randomReq) => {
            setRandomCard(randomReq.data.data[0])
            setLoading(false)
          })
          .catch((err) => {
            setError(err)
          })
      })
      .catch((err) => {
        setError(err)
      })
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    data: randomCard,
    error,
    loading,

    fetchRandomCard: fetchData,
  }
}
