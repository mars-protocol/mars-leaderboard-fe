import { ColumnDef, Row } from '@tanstack/react-table'

import Rank, { RANK_META } from 'components/leaderboard/table/column/Rank'
import TotalFragments, {
  TOTAL_FRAGMENTS_META,
} from 'components/leaderboard/table/column/TotalFragments'
import Wallet, { WALLET_META } from 'components/leaderboard/table/column/Wallet'

import { useMemo } from 'react'

interface Props {
  isLoading: boolean
}

export default function useFragmentLeaderboardColumns(props: Props) {
  const { isLoading } = props

  return useMemo<ColumnDef<FragmentLeaderboardEntry>[]>(() => {
    return [
      {
        ...RANK_META,
        cell: ({ row }: { row: Row<FragmentLeaderboardEntry> }) => (
          <Rank value={row.original} isLoading={isLoading} />
        ),
      },
      {
        ...WALLET_META,
        cell: ({ row }: { row: Row<FragmentLeaderboardEntry> }) => (
          <Wallet value={row.original} isLoading={isLoading} />
        ),
      },
      {
        ...TOTAL_FRAGMENTS_META,
        cell: ({ row }: { row: Row<FragmentLeaderboardEntry> }) => (
          <TotalFragments value={row.original} isLoading={isLoading} />
        ),
      },
    ]
  }, [isLoading])
}
