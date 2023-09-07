import { useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { load } from 'cheerio'

import { BreadcrumbHeader } from 'components/BreadcrumbHeader'
import { LoadingPokeBall } from 'components/LoadingPokeBall'
import { Button } from 'components/Button'
import { Paragraph } from 'components/Paragraph'
import { Heading } from 'components/Heading'
import { Alert } from 'components/Alert'

import { Card } from 'components/Card'

import { useGetCard } from 'hooks/useGetCard'

import { storesList, stores } from 'utils/stores'

// async function scrapeWebsite(url) {
//   try {
//     const response = await axios.get(`https://cors-anywhere.herokuapp.com/${url}`)
//     // const response = await axios.get(url)

//     const $ = load(response.data)

//     // Now you can use jQuery-like syntax to select and manipulate elements
//     // const pageTitle = $('.wp-block-post-title').text()
//     // const paragraphText = $('.wp-container-7 p').text()
//     const inStock = $('.alertBox--error')
//     const price = $('.productView-details .price.price--withTax').text()

//     return {
//       inStock: inStock.length === 0,
//       price,
//     }
//   } catch (error) {
//     console.error('Error scraping website:', error)
//     throw error
//   }
// }

function stripCorsAnywhere(url) {
  // Check if the URL starts with "https://cors-anywhere.herokuapp.com/"
  if (url.startsWith('https://cors-anywhere.herokuapp.com/')) {
    // Remove the prefix and return the rest of the URL
    return url.replace('https://cors-anywhere.herokuapp.com/', '')
  } else {
    // If the URL doesn't start with the prefix, return it unchanged
    return url
  }
}

function getWordAfterHttps(url) {
  const regex = /https:\/\/([^/]+)/
  const match = url.match(regex)

  if (match && match[1]) {
    const parts = match[1].split('.')
    if (parts.length > 0) {
      return parts[0]
    }
  }

  return null
}

async function scrapeWebsites(url) {
  const responses = {}
  // try {
  await Promise.allSettled(url.map((endpoint) => axios.get(endpoint))).then(
    axios.spread((...allData) => {
      allData.forEach((data) => {
        if (data.status === 'rejected') {
          const failedRequest = stripCorsAnywhere(data.reason.request.responseURL)
          responses[failedRequest] = {
            status: 'failed',
          }
        } else {
          const requestUrl = stripCorsAnywhere(data.value.request.responseURL)
          const storeKey = getWordAfterHttps(requestUrl)
          const $ = load(data.value.data)
          const outOfStockEl = $(stores[storeKey].soldOutEl)
          const price = $(stores[storeKey].priceEl).text()

          responses[requestUrl] = {
            status: 'success',
            inStock: outOfStockEl.length === 0,
            price,
          }
        }
      })
    }),
  )
  return responses
  // } catch (error) {
  //   console.error('Error scraping website:', error)
  // }
}

const formatStoreUrls = async (card) => {
  const allUrls: string[] = []
  storesList.forEach((store) => {
    const parsedUrls = stores[store].parser(card)
    allUrls.push(...parsedUrls)
  })
  return allUrls
}

export const SingleCard = () => {
  const { cardId } = useParams()
  const { card, loading } = useGetCard(cardId)
  const [data, setData] = useState<any>()
  const [searchingStores, setSearchingStores] = useState(false)

  const handleSearchStores = useCallback(async () => {
    if (!card) return
    setSearchingStores(true)
    const formattedUrls = await formatStoreUrls(card)

    await scrapeWebsites(formattedUrls)
      .then((res) => {
        const finalObject = {}

        for (const url in res) {
          for (const key in stores) {
            if (url.startsWith(stores[key].url)) {
              if (!finalObject[key]) {
                finalObject[key] = []
              }
              finalObject[key].push({
                status: res[url].status,
                url,
                inStock: res[url].inStock,
                price: res[url].price,
              })
              break // Once a match is found, no need to check other keys
            }
          }
        }
        setData(finalObject)
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

  const tcgVariants = Object.keys(card.tcgplayer.prices);

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
              <Paragraph>Artist: {card.artist}</Paragraph>
              <Paragraph>
                Card Type: {card.supertype}&nbsp; 
                (
                  {card.subtypes && card.subtypes.length >= 0 && (
                    <span>
                      {card.subtypes.map((subtype,i) => {
                        if(i < card.subtypes.length - 1){
                          return(
                            <span key={subtype}>{subtype}; </span>
                          )
                        } else {
                          return(
                            <span key={subtype}>{subtype}</span>
                          )
                        }

                      })}
                    </span>
                  )}
                )
              </Paragraph>

              {card.abilities && card.abilities.length >= 0 && (
                    <div>
                      <Paragraph>Abilities: </Paragraph>
                      {card.abilities.map((ability) => {
                        return(
                          <div key={ability.name}> {ability.name} ({ability.type}) - {ability.text} </div>
                        )
                      }
                      )}
                    </div>
                  )                    
              }

              <br />
              <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                              <th scope="col" className="px-6 py-3">
                                  Variant
                              </th>
                              <th scope="col" className="px-6 py-3">
                                  Market Price
                              </th>
                              <th scope="col" className="px-6 py-3">
                                  Range
                              </th>

                          </tr>
                      </thead>
                      <tbody>
                        {tcgVariants.map((variant) => {
                          return(
                            <tr key={variant} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                              <td className="px-6 py-4">{variant}</td>
                              <td className="px-6 py-4">${card.tcgplayer.prices[variant].market} USD</td>
                              <td className="px-6 py-4">${card.tcgplayer.prices[variant].low} - ${card.tcgplayer.prices[variant].high} USD</td>
                              
                            </tr>
                          )
                          }
                        )}
                      </tbody>
                  </table>
              </div>

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

            {!searchingStores && data && (
              <div className='mt-4'>
                {storesList.map((store) => {
                  return (
                    <div key={store}>
                      <Heading level='5' key={store}>
                        <a href={stores[store].url} target='_blank' rel='noreferrer'>
                          {stores[store].name}
                        </a>
                      </Heading>

                      {data[store].length > 1 && (
                        <Paragraph>We found multiple variants of this card for this site</Paragraph>
                      )}

                      {data[store].map((result) => {
                        if (result.status === 'success') {
                          if (result.inStock) {
                            return (
                              <Alert status='success' key={result.url}>
                                <span className='font-medium'>In Stock</span> for {result.price}{' '}
                                <a
                                  href={result.url}
                                  className='font-semibold underline hover:no-underline'
                                  target='_blank'
                                  rel='noreferrer'
                                >
                                  Go to Listing
                                </a>
                              </Alert>
                            )
                          }
                          return (
                            <Alert status='error' key={result.url}>
                              <span className='font-medium'>Out of Stock</span>
                            </Alert>
                          )
                        }
                        return (
                          <Alert status='info' key={result.url}>
                            <span className='font-medium'>
                              We were unable to find a result from this site, though they still
                              might have this card if you search for it yourself.
                            </span>
                          </Alert>
                        )
                      })}
                    </div>
                  )
                })}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
