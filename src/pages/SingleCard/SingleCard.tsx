import { useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import cheerio from 'cheerio'

import { BreadcrumbHeader } from 'components/BreadcrumbHeader'
import { LoadingPokeBall } from 'components/LoadingPokeBall'
import { Button } from 'components/Button'
import { Paragraph } from 'components/Paragraph'
import { Heading } from 'components/Heading'

import { Card } from 'components/Card'

import { useGetCard } from 'hooks/useGetCard'

function generateSetId(inputString) {
  const parts = inputString
    .split(/(\d+|[a-zA-Z]+)/)
    .filter(Boolean)
    .map((part) => {
      if (/^\d+$/.test(part)) {
        const number = parseInt(part, 10)
        return number < 10 ? `0${number}` : part
      }
      return part
    })

  if (parts.length >= 2) {
    parts.splice(0, 2, parts.slice(0, 2).join('')) // Change '-' to ''
  }

  return parts[0]
}

async function scrapeWebsite(url) {
  try {
    const response = await axios.get(`https://cors-anywhere.herokuapp.com/${url}`)
    // const response = await axios.get(url)
    const $ = cheerio.load(response.data)

    // Now you can use jQuery-like syntax to select and manipulate elements
    // const pageTitle = $('.wp-block-post-title').text()
    // const paragraphText = $('.wp-container-7 p').text()
    const inStock = $('.alertBox--error')
    const price = $('.productView-details .price.price--withTax').text()

    return {
      inStock: inStock.length === 0,
      price,
    }
  } catch (error) {
    console.error('Error scraping website:', error)
    throw error
  }
}

function addLeadingZeros(inputString) {
  const parts = inputString.split('-')
  const firstPart = generateSetId(parts[0])
  const secondPart = parts[1].padStart(3, '0')

  return `${firstPart}-${secondPart}`
}

export const SingleCard = () => {
  const { cardId } = useParams()
  const { card, loading } = useGetCard(cardId)
  const [data, setData] = useState<any>()
  const [searchingStores, setSearchingStores] = useState(false)

  const handleSearchStores = useCallback(async () => {
    if (!card) return
    setSearchingStores(true)
    const getThoseMonsUrl = `${addLeadingZeros(card.id)}-${
      card.set.printedTotal
    }-${card.name.replace(/\s/g, '-')}/`
    await scrapeWebsite(`https://getthosemons.co.nz/${getThoseMonsUrl}`)
      .then((result) => {
        console.log(result)
        setData(result)
      })
      .catch((error) => {
        console.error('Error in useEffect:', error)
      })
      .finally(() => {
        setSearchingStores(false)
      })
  }, [card])

  if (loading) {
    return (
      <div className='flex justify-center'>
        <LoadingPokeBall size='100' loading={true} />
      </div>
    )
  }

  if (!card) {
    return <>error</>
  }
  // console.log(card.id)
  const getThoseMonsUrl = `${addLeadingZeros(card.id)}-${card.set.printedTotal}-${card.name.replace(
    /\s/g,
    '-',
  )}/`

  return (
    <div>
      <BreadcrumbHeader
        title={card?.name}
        breadcrumbs={[
          {
            label: 'Sets',
            path: '/sets',
          },
          {
            label: card.set.name,
            path: `/sets/${card.set.id}`,
          },
          {
            label: card?.id,
          },
        ]}
      />

      <div className='grid grid-flow-row-dense grid-cols-3 mb-6 gap-4'>
        <div>
          <img src={card?.images.large} alt={card?.name} />
        </div>
        <div className='col-span-2'>
          <div className='mb-4'>
            <Card full={false}>
              <Heading level='2'>{card.name}</Heading>
              <Paragraph>{card?.flavorText}</Paragraph>
            </Card>
          </div>
          <Card full={false}>
            <Heading level='3'>Search Stores</Heading>
            <Paragraph>Search stores for stock and prices</Paragraph>
            <Button onClick={handleSearchStores} disabled={searchingStores}>
              Search
            </Button>
            {searchingStores && (
              <div className='flex justify-center'>
                <LoadingPokeBall size='100' loading={true} />
              </div>
            )}

            {data && (
              <div className='mt-4'>
                <Heading level='5'>GetThoseMons</Heading>
                {data.inStock ? (
                  <div
                    className='flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800'
                    role='alert'
                  >
                    <svg
                      className='flex-shrink-0 inline w-4 h-4 mr-3'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z' />
                    </svg>
                    <span className='sr-only'>Info</span>
                    <div>
                      <span className='font-medium'>In Stock</span> for {data.price}{' '}
                      <a
                        href={`https://getthosemons.co.nz/${getThoseMonsUrl}`}
                        className='font-semibold underline hover:no-underline'
                        target='_blank'
                        rel='noreferrer'
                      >
                        Go to Listing
                      </a>
                    </div>
                  </div>
                ) : (
                  <div
                    className='flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800'
                    role='alert'
                  >
                    <svg
                      className='flex-shrink-0 inline w-4 h-4 mr-3'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z' />
                    </svg>
                    <span className='sr-only'>Info</span>
                    <div>
                      <span className='font-medium'>Out of Stock</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
