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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isValidating) {
          loadMore()
        }
      },
      { threshold: 0.1 },
    )

    if (observerRef.current) {
      observer.observe(observerRef.current)
    }

    return () => observer.disconnect()
  }, [hasMore, isValidating, loadMore])

  return (
    <div className='w-full'>
      <Intro />
      <FragmentStats />
      <UserRankingCard />
      <Table
        columns={columns}
        data={fragmentLeaderboard || []}
        initialSorting={[{ id: 'rank', desc: false }]}
      />
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
  )
}
