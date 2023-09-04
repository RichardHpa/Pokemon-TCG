import { useParams } from 'react-router-dom'

import { BreadcrumbHeader } from 'components/BreadcrumbHeader'
import { LoadingPokeBall } from 'components/LoadingPokeBall'
import { Button } from 'components/Button'
import { SingleCardThumbnail } from 'components/SingleCardThumbnail'

import { useGetSet } from 'hooks/useGetSet'
import { useGetCards } from 'hooks/useGetCards'

import type { Card as CardProps } from 'types/fixtures/card'

export const Set = () => {
  const { id } = useParams()
  const { data, loading, error } = useGetSet(id)

  const {
    cards,
    loading: cardsLoading,
    hasMore,
    fetchMoreCards,
    isFetching,
  } = useGetCards({
    query: `set.id:"${id}"`,
    pageSize: 30,
    orderBy: 'number',
  })

  if (error) {
    return <div>Error</div>
  }

  return (
    <div>
      <BreadcrumbHeader
        title={data?.name}
        breadcrumbs={[
          {
            label: 'Sets',
            path: '/sets',
          },
          {
            label: data?.name,
          },
        ]}
      />

      {loading || cardsLoading ? (
        <div className='flex justify-center'>
          <LoadingPokeBall size='100' loading={true} />
        </div>
      ) : (
        <>
          <div>
            <p>{data?.releaseDate}</p>
          </div>

          {cards && (
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 my-4'>
              {cards.map((card: CardProps) => {
                return <SingleCardThumbnail key={card.id} card={card} />
              })}
            </div>
          )}

          {hasMore && (
            <div className='mt-4 flex justify-center'>
              <Button onClick={fetchMoreCards} disabled={isFetching}>
                Load More
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
