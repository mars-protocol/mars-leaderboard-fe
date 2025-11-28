import getFragmentLeaderboard from 'api/leaderboard/getFragmentLeaderboard'
import chainConfig from 'config/chain'
import useSWRInfinite from 'swr/infinite'

interface FragmentLeaderboardResponse {
  data: FragmentLeaderboardEntry[]
  page: number
  limit: number
  total: number
  last_updated: number
}

export default function useFragmentLeaderboard(pageSize = 25) {
  const getKey = (pageIndex: number, previousPageData: FragmentLeaderboardResponse | null) => {
    if (!chainConfig.endpoints.amberBackend) return null
    if (previousPageData && previousPageData.data.length < pageSize) {
      return null
    }

    return chainConfig.endpoints.amberBackend
      ? ['fragmentLeaderboard', chainConfig.id, pageIndex + 1, pageSize]
      : null
  }

  const { data, size, setSize, isLoading, isValidating } =
    useSWRInfinite<FragmentLeaderboardResponse>(
      getKey,
      async ([, , page]) => {
        const response = await getFragmentLeaderboard(Number(page))
        return response as FragmentLeaderboardResponse
      },
      {
        revalidateOnFocus: false,
      },
    )

  const fragmentLeaderboard = data?.flatMap((page) => page.data) ?? []
  const totalLoaded = fragmentLeaderboard.length
  const totalAvailable = data?.[0]?.total ?? 0

  const hasMore = totalLoaded < totalAvailable

  const loadMore = () => {
    if (!isValidating && hasMore) {
      setSize(size + 1)
    }
  }

  return {
    data: fragmentLeaderboard,
    isLoading,
    hasMore,
    loadMore,
    isValidating,
  }
}
