import { useParams } from 'react-router-dom'

import { BreadcrumbHeader } from 'components/BreadcrumbHeader'
import { LoadingPokeBall } from 'components/LoadingPokeBall'

import { useGetSet } from 'hooks/useGetSet'

export const Set = () => {
  const { id } = useParams()
  const { data, loading, error } = useGetSet(id)

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
            label: data?.data?.name,
          },
        ]}
      />

      {loading && (
        <div className='flex justify-center'>
          <LoadingPokeBall size='100' loading={true} />
        </div>
      )}

      <div>
        <p>{data?.releaseDate}</p>
      </div>
    </div>
  )
}
