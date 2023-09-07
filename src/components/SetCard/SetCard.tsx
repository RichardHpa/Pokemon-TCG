import { Card } from 'components/Card'
import { Paragraph } from 'components/Paragraph'
import { Heading } from 'components/Heading'

import type { Set } from 'types/fixtures/set'

interface SetCardProps
  extends Pick<Set, 'name' | 'series' | 'releaseDate' | 'total' | 'printedTotal'> {
  image: string
}

export const SetCard = ({
  image,
  name,
  series,
  releaseDate,
  total,
  printedTotal,
}: SetCardProps) => {
  const secretTotal = total - printedTotal
  return (
    <Card>
      <div className='flex flex-col h-full'>
        <div className='flex justify-center mb-4'>
          <img className='w-full max-w-xs' src={image} alt={`${name} logo`} />
        </div>

        <div className='mt-auto'>
          <Heading level='4'>{name}</Heading>

          <Paragraph>
            {series} - {releaseDate}
          </Paragraph>
          <Paragraph>
            {total} Cards ({secretTotal} Secret Cards)
          </Paragraph>
        </div>
      </div>
    </Card>
  )
}
