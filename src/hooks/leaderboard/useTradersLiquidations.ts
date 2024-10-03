import getTradersLiquidations from 'api/leaderboard/getTradersLiquidations'
import useSWR from 'swr'

export default function useLiquidations(page = 1, pageSize = 6) {
  return useSWR(
    ['leaderboard/tradersLiquidations', page, pageSize],
    async () => getTradersLiquidations(page, pageSize),
    {
      refreshInterval: 60_000,
    },
  )
}
