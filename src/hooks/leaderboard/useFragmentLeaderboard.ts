import getFragmentLeaderboard from 'api/leaderboard/getFragmentLeaderboard'
import chainConfig from 'config/chain'
import useSWR from 'swr'

export default function useFragmentLeaderboard(page: number) {
  return useSWR(
    chainConfig.endpoints.amberBackend
      ? `chains/${chainConfig.id}/fragmentLeaderboard/${page}`
      : null,
    async () => {
      const response = await getFragmentLeaderboard(page)
      console.log(response, 'response')

      if (Array.isArray(response)) return []

      if (response?.data && Array.isArray(response.data)) {
        return response.data as FragmentLeaderboardEntry[]
      }

      return []
    },
    {
      revalidateOnFocus: false,
      suspense: false,
    },
  )
}
