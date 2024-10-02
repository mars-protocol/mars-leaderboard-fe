import getTopTraders from 'api/leaderboard/getTopTraders'
import useSWR from 'swr'

export default function useTopTraders(page: number) {
  return useSWR(['leaderboard/topTraders', page], async () => getTopTraders(page), {
    refreshInterval: 60_000,
  })
}
