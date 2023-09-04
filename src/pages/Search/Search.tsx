import { useState, useCallback, useMemo } from 'react'
import axios from 'axios'

import { BreadcrumbHeader } from 'components/BreadcrumbHeader'
import { Card } from 'components/Card'
import { Input } from 'components/Input'
import { Button } from 'components/Button'
import { Select } from 'components/Select'
import { LoadingPokeBall } from 'components/LoadingPokeBall'

import { pokemonTypes } from 'constants/pokemonTypes'

import type { Card as CardProps } from 'types/fixtures/card'
import type { PokemonTcgAPIResponse } from 'types/apiResponse'

interface Response extends PokemonTcgAPIResponse {
  data: CardProps[]
}

const pokemonTypeOptions = pokemonTypes.map((type) => {
  return {
    label: type.charAt(0).toUpperCase() + type.slice(1),
    value: type,
  }
})
const selectOptions = [{ label: 'Choose a type' }, ...pokemonTypeOptions]
const sortOptions = [
  { label: 'Release Date (ASC)', value: '-set.releaseDate,number' },
  { label: 'Release Date (DSC', value: 'set.releaseDate,number' },
]

const pageSize = 20
const useFetchCards = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<Response>()
  const [type, setType] = useState<string>()
  const [name, setName] = useState<string>()
  const [sort, setSort] = useState<string>()
  const [page, setPage] = useState<number>(1)
  const [isFetching, setIsFetching] = useState(false)

  const fetchCards = async ({
    type: newType = '*',
    name: newName = '*',
    sort: newSort = sortOptions[0].value,
  }) => {
    setIsFetching(true)
    setLoading(true)
    setType(newType)
    setName(newName)
    setSort(newSort)
    setData(undefined)
    const url = `https://api.pokemontcg.io/v2/cards?page=${page}&pageSize=${pageSize}&q=types:${newType} name:${newName}*&orderBy=${newSort}`
    await axios
      .get(url)
      .then((res) => {
        setData(res.data)
      })
      .finally(() => {
        setLoading(false)
        setIsFetching(false)
      })
  }

  const loadMore = async () => {
    setIsFetching(true)
    const url = `https://api.pokemontcg.io/v2/cards?page=1&pageSize=${
      pageSize * (page + 1)
    }&q=types:${type} name:${name}*&orderBy=${sort}`
    console.log(url)
    await axios
      .get(url)
      .then((res) => {
        setData(res.data)
      })
      .finally(() => {
        setPage(page + 1)
        setLoading(false)
        setIsFetching(false)
      })
  }

  return {
    loading,
    data,
    fetchCards,
    isFetching,
    loadMore,
  }
}

export const Search = () => {
  const [inputValue, setInputValue] = useState<string>()
  const [selectValue, setSelectValue] = useState<string>()
  const [sortValue, setSortValue] = useState<string>()

  const { loading, fetchCards, data, loadMore, isFetching } = useFetchCards()
  const handleOnChange = useCallback((e) => setInputValue(e.target.value), [])
  const handleOnChangeSelect = useCallback((e) => setSelectValue(e.target.value), [])
  const handleOnChangeSort = useCallback((e) => setSortValue(e.target.value), [])

  const showMore = useMemo(() => {
    if (data?.data?.length) {
      return data.data.length < data.totalCount
    }

    return false
  }, [data])

  const handleSearch = useCallback(async () => {
    await fetchCards({
      type: selectValue,
      name: inputValue,
      sort: sortValue,
    })
  }, [fetchCards, inputValue, selectValue, sortValue])

  return (
    <div>
      <BreadcrumbHeader title={'Search for cards'} />

      <div className='mb-4'>
        <Card>
          <div className='flex items-center gap-4 flex-col md:flex-row'>
            <Input onChange={handleOnChange} placeholder='Search for a card' />
            <div className='w-full md:flex-initial md:w-64'>
              <Select options={selectOptions} onChange={handleOnChangeSelect} />
            </div>
            <div className='w-full md:flex-initial md:w-72'>
              <Select options={sortOptions} onChange={handleOnChangeSort} />
            </div>
            <Button onClick={handleSearch}>Search</Button>
          </div>
        </Card>
      </div>

      {loading && (
        <div className='flex justify-center mb-2'>
          <LoadingPokeBall size='100' loading={true} />
        </div>
      )}

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-4'>
        {data?.data.map((card: CardProps) => {
          return (
            <div key={card.id}>
              <img src={card?.images.small} alt={card?.name} />
            </div>
          )
        })}
      </div>

      {showMore && (
        <div className='mt-4 flex justify-center'>
          <Button onClick={loadMore} disabled={isFetching}>
            Load More
          </Button>
        </div>
      )}
    </div>
  )
}
