import getTop5Traders from 'api/leaderboard/getTop5Traders'
import useSWR from 'swr'

export default function useTopTraders() {
  return useSWR(['leaderboard/top5Traders'], async () => getTop5Traders(), {
    refreshInterval: 60_000,
  })
}
