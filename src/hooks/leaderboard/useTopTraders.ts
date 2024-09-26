import getTopTraders from 'api/leaderboard/getTopTraders'
import useSWR from 'swr'

export default function useTopTraders(page = 1, pageSize = 15) {
  return useSWR(
    ['leaderboard/topTraders', page, pageSize],
    async () => getTopTraders(page, pageSize),
    {
      refreshInterval: 60_000,
    },
  )
}
