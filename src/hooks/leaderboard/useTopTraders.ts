import getTopTraders from 'api/leaderboard/getTopTraders'
import useSWR from 'swr'

export default function useTopTraders(page: number, sortOrder: 'asc' | 'desc', sortField: string) {
  return useSWR(
    ['leaderboard/topTraders', page, sortOrder, sortField],
    async () => getTopTraders(page, sortOrder, sortField),
    {
      refreshInterval: 60_000,
    },
  )
}
