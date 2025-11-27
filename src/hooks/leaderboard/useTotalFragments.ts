import { useMemo } from 'react'

const TOTAL_REWARD_POOL = 45_000_000 // 45M MARS

/**
 * Hook to estimate MARS rewards based on user fragments and total fragments
 * Formula: (User Fragments / Total Fragments) × 45,000,000 MARS
 */
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
