import { useEffect, useState } from 'react'

import { Button } from 'components/Button'

import { PokemonCardInfo } from 'components/PokemonCardInfo'

import { useGetCards } from 'hooks/useGetCard'

import { MouseEvent } from 'react'

export const SearchCard = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [search, setSearch] = useState(false)
  const [pokemonData, setPokemonData] = useState()

  const { data, loading } = useGetCards({
    query: `name:"${searchTerm}*"`,
    pageSize: 1,
    manual: !search,
  })

  useEffect(() => {
    if (data) {
      setSearch(false)
      if (data.data.length) {
        setPokemonData(data.data[0])
      } else {
        setPokemonData(undefined)
      }
    }
  }, [data])

  const handleSearch = (e: MouseEvent) => {
    e.preventDefault()
    setSearch(true)
    setPokemonData(undefined)
  }

  return (
    <div className='grid grid-flow-row-dense grid-cols-3 mb-6 gap-3'>
      <div>
        <div className='flex items-center'>
          <label htmlFor='simple-search' className='sr-only'>
            Search For Card
          </label>
          <div className='relative w-full'>
            <div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
              <svg
                aria-hidden='true'
                className='w-5 h-5 text-gray-500 dark:text-gray-400'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                  clipRule='evenodd'
                ></path>
              </svg>
            </div>
            <input
              type='text'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-3  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='Search For Card'
              onChange={(e) => setSearchTerm(e.target.value)}
              required
            />
          </div>
          <Button
            className='ml-2'
            onClick={handleSearch}
            disabled={loading || searchTerm.length === 0}
          >
            Search
          </Button>
        </div>
      </div>

      {(pokemonData || search) && (
        <div className='col-span-2'>
          <PokemonCardInfo card={pokemonData} loading={loading} />
        </div>
      )}
      {data && data?.data.length === 0 && (
        <div className='col-span-2'>
          <div className='flex flex-col items-center justify-center'>
            <h1 className='text-2xl font-bold text-gray-700 dark:text-gray-200'>
              No Results Found
            </h1>
            <p className='text-gray-500 dark:text-gray-400'>Try searching for a different card</p>
          </div>
        </div>
      )}
    </div>
  )
}
