import getLiquidations from 'api/leaderboard/getLiquidations'
import useSWR from 'swr'

export default function useLiquidations(page = 1, pageSize = 15) {
  return useSWR(
    ['leaderboard/liquidations', page, pageSize],
    async () => getLiquidations(page, pageSize),
    {
      refreshInterval: 60_000,
    },
  )
}
