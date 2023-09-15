import { useState, useEffect } from 'react'

import axios from 'axios'

import type { Set } from 'types/fixtures/set'

const apiRoute = 'https://api.pokemontcg.io/v2/sets'

const getSet = async ({ id }) => {
  try {
    const response = await axios.get(`${apiRoute}/${id}`)
    return response
  } catch (error: any) {
    throw new Error(error)
  }
}

export const useGetSet = (id: string | number) => {
  const [set, setSet] = useState<Set>()

  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState()

  useEffect(() => {
    ;(async () => {
      await getSet({ id })
        .then((res) => {
          setSet(res?.data.data)
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false))
    })()
    return () => {
      // this now gets called when the component unmounts
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- want this to run on mount
  }, [])

  return {
    set,
    loading,
    error,
  }
}
