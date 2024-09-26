import { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'
import Account from 'components/main/Leaderboard/LeaderboardTable/common/Account'

export default function useProjectedWinnersColumn() {
  return useMemo<ColumnDef<ProjectedWinnersData>[]>(() => {
    return [
      {
        accessorKey: 'metric',
        header: 'Metric',
        meta: { className: 'max-w-20' },
        cell: ({ row }) => {
          return <Account value={row.original.metric as string} />
        },
      },
      {
        accessorKey: 'achievement',
        header: 'Achievement',
        meta: { className: 'max-w-30' },
        cell: ({ row }) => {
          return <Account value={row.original.achievement as string} />
        },
      },
      {
        accessorKey: 'description',
        header: 'Description',
        meta: { className: 'max-w-30' },
        cell: ({ row }) => {
          return <Account value={row.original.description as string} />
        },
      },
      {
        accessorKey: 'reward',
        header: 'Reward',
        meta: { className: 'max-w-30' },
        cell: ({ row }) => {
          return <Account value={row.original.reward as string} />
        },
      },
    ]
  }, [])
}
