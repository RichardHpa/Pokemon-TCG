import { useCallback, useState } from 'react'
import axios from 'axios'
import { load } from 'cheerio'

import { Alert } from 'components/Alert'
import { Button } from 'components/Button'
import { Card } from 'components/Card'
import { Heading } from 'components/Heading'
import { LoadingPokeBall } from 'components/LoadingPokeBall'
import { Paragraph } from 'components/Paragraph'

import { storesList, stores } from 'utils/stores'

import { proxyServerUrl } from 'constants/api'

import { Card as CardProps } from 'types/fixtures/card'

interface StockFinderProps {
  card: CardProps
}

function stripCorsAnywhere(url) {
  // Check if the URL starts with proxyServerUrl
  if (url.startsWith(proxyServerUrl)) {
    // Remove the prefix and return the rest of the URL
    return url.replace(proxyServerUrl, '')
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

  await Promise.allSettled(
    url.map((endpoint) => axios.get(endpoint, { withCredentials: false })),
  ).then(
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
}

const formatStoreUrls = async (card) => {
  const allUrls: string[] = []
  storesList.forEach((store) => {
    const parsedUrls = stores[store].parser(card)
    allUrls.push(...parsedUrls)
  })
  return allUrls
}

export const StockFinder = ({ card }: StockFinderProps) => {
  const [searchingStores, setSearchingStores] = useState(false)
  const [data, setData] = useState<any>()

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
              break
            }
          }
        }
        setData(finalObject)
      })
      .finally(() => {
        setSearchingStores(false)
      })
  }, [card])

  return (
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
                        We were unable to find a result from this site, though they still might have
                        this card if you search for it yourself.
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
  )
}
