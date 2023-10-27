import { useCallback, useState } from 'react'

import { Link } from 'react-router-dom'

import { useGetSets } from 'hooks/useGetSets'

import { SetCard } from 'components/SetCard'
import { Button } from 'components/Button'
import { LoadingPokeBall } from 'components/LoadingPokeBall'
import { BreadcrumbHeader } from 'components/BreadcrumbHeader'
import { Card } from 'components/Card'
import { Input } from 'components/Input'
import { Select } from 'components/Select'

import type { Set } from 'types/fixtures/set'

const sortOptions = [
  { label: 'Release Date (ASC)', value: '-releaseDate' },
  { label: 'Release Date (DSC', value: 'releaseDate' },
]

export const Sets = () => {
  const [sortValue, setSortValue] = useState<string>(sortOptions[1].value)
  const [searchValue, setSearchValue] = useState<string>('')

  const { sets, hasMore, isFetching, loading, fetchMoreSets, fetchSets } = useGetSets({
    pageSize: 20,
    orderBy: sortValue,
    query: `name:${searchValue}*`,
  })

  const handleSearch = useCallback(() => {
    fetchSets()
  }, [fetchSets])

  const handleOnChange = useCallback((value) => setSearchValue(value), [])
  const handleOnChangeSort = useCallback((value) => setSortValue(value), [])

  return (
    <div>
      <BreadcrumbHeader
        title='Pokemon TCG Sets'
        breadcrumbs={[
          {
            label: 'Sets',
          },
        ]}
      />

      <div className='mb-4'>
        <Card>
          <div className='flex items-center gap-4 flex-col md:flex-row'>
            <Input onChange={handleOnChange} placeholder='Search for a set' />
            <div className='w-full md:flex-initial md:w-72'>
              <Select
                options={sortOptions}
                onChange={handleOnChangeSort}
                defaultValue={sortOptions[1].value}
              />
            </div>
            <Button onClick={handleSearch}>Search</Button>
          </div>
        </Card>
      </div>

      {loading && (
        <div className='flex justify-center'>
          <LoadingPokeBall size='100' loading={true} />
        </div>
      )}

      {sets && (
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          {sets.map((set: Set) => {
            return (
              <div key={set.id} className='flex-1 items-stretch'>
                <Link to={`/sets/${set.id}`}>
                  <SetCard {...set} />
                </Link>
              </div>
            )
          })}
        </div>
      )}

      {hasMore && (
        <div className='mt-4 flex justify-center'>
          <Button onClick={fetchMoreSets} disabled={isFetching}>
            Load More
          </Button>
        </div>
      )}
    </div>
  )
}
