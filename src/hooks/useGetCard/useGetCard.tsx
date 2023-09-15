import { useGetCards } from 'hooks/useGetCards'

export const useGetCard = (cardId: string) => {
  const { cards, loading } = useGetCards({
    query: `id:${cardId}`,
  })

  return {
    card: cards ? cards[0] : undefined,
    loading,
    error:
      loading === false && cards?.length === 0 ? `Cannot find a card with id:${cardId}` : undefined,
  }
}
