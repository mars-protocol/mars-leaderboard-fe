import { useMemo } from 'react'
import useFragmentLeaderboard from 'hooks/leaderboard/useFragmentLeaderboard'
import { BN } from 'utils/helpers'

const TOTAL_REWARD_POOL = 45_000_000 // 45M MARS

export function useTotalFragments() {
  const { data: fragmentLeaderboard } = useFragmentLeaderboard(50)

  const totalFragments = useMemo(() => {
    if (!fragmentLeaderboard || fragmentLeaderboard.length === 0) {
      return null
    }

    const sum = fragmentLeaderboard.reduce((acc, entry) => {
      return acc.plus(BN(entry.total_fragments))
    }, BN(0))

    return sum.toNumber()
  }, [fragmentLeaderboard])

  return totalFragments
}

export function useEstimatedMarsRewards(
  userFragments: number | null,
  totalFragments: number | null,
) {
  const estimatedRewards = useMemo(() => {
    if (!userFragments || !totalFragments || totalFragments === 0) {
      return null
    }

    const reward = (userFragments / totalFragments) * TOTAL_REWARD_POOL
    return reward
  }, [userFragments, totalFragments])

  return estimatedRewards
}
