import getTradersLiquidations from 'api/leaderboard/getTradersLiquidations'
import useSWR from 'swr'

export default function useLiquidations() {
  return useSWR(['leaderboard/tradersLiquidations'], async () => getTradersLiquidations(), {
    refreshInterval: 60_000,
  })
}
