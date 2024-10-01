import getTopTraders from 'api/leaderboard/getTopTraders'
import useSWR from 'swr'

export default function useTopTraders() {
  return useSWR(['leaderboard/topTraders'], async () => getTopTraders(), {
    refreshInterval: 60_000,
  })
}
