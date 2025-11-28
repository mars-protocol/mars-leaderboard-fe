import { useEffect } from 'react'
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

export default function useFragmentLeaderboard(pageSize = 50) {
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
      async ([, , page, limit]) => {
        const response = await getFragmentLeaderboard(Number(page), Number(limit))
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

  // Automatically load all pages on mount
  useEffect(() => {
    if (!isLoading && !isValidating && hasMore && totalAvailable > 0) {
      const totalPages = Math.ceil(totalAvailable / pageSize)
      if (size < totalPages) {
        setSize(totalPages)
      }
    }
  }, [isLoading, isValidating, hasMore, totalAvailable, pageSize, size, setSize])

  return {
    data: fragmentLeaderboard,
    isLoading,
    hasMore,
    isValidating,
  }
}
