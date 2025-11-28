import useFragmentLeaderboard from 'hooks/leaderboard/useFragmentLeaderboard'
import useFragmentLeaderboardColumns from 'components/leaderboard/table/useFragmentLeaderboardColumns'
import Table from 'components/common/Table'
import Intro from 'components/intro/Intro'
import FragmentStats from 'components/FragmentStats'
import UserRankingCard from 'components/leaderboard/UserRankingCard'
import Text from 'components/common/Text'
import { useEffect, useRef } from 'react'

export default function MainPage() {
  const {
    data: fragmentLeaderboard,
    isLoading,
    hasMore,
    loadMore,
    isValidating,
  } = useFragmentLeaderboard(25)
  const columns = useFragmentLeaderboardColumns({ isLoading })
  const observerRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isValidating) {
          loadMore()
        }
      },
      {
        threshold: 0.1,
        root: scrollContainerRef.current,
      },
    )

    if (observerRef.current) {
      observer.observe(observerRef.current)
    }

    return () => observer.disconnect()
  }, [hasMore, isValidating, loadMore])

  return (
    <div className='w-full flex flex-col'>
      <Intro />
      <FragmentStats />
      <UserRankingCard />
      <div
        ref={scrollContainerRef}
        className='flex-1 overflow-y-auto max-h-[calc(100vh-400px)] min-h-96'
      >
        <Table columns={columns} data={fragmentLeaderboard || []} />
        {hasMore && (
          <div ref={observerRef} className='h-20 flex items-center justify-center'>
            {isValidating && (
              <Text size='sm' className='text-white/60'>
                Loading more...
              </Text>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
