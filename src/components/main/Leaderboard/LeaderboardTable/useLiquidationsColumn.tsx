import { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'
import Account from 'components/main/Leaderboard/LeaderboardTable/common/Account'
import Position, {
  POSITION_META,
} from 'components/main/Leaderboard/LeaderboardTable/common/Position'

export default function useLiquidationsColumn() {
  return useMemo<ColumnDef<LiquidationsData>[]>(() => {
    return [
      {
        ...POSITION_META,
        cell: ({ row }) => {
          return <Position value={row.original.position as number} />
        },
      },
      {
        accessorKey: 'trader',
        header: 'Trader',
        meta: { className: 'max-w-30' },
        cell: ({ row }) => {
          return <Account value={row.original.trader as string} />
        },
      },
      {
        accessorKey: 'account_id',
        header: 'Account ID',
        meta: { className: 'max-w-30' },
        cell: ({ row }) => {
          return <Account value={row.original.account_id as string} />
        },
      },
      {
        accessorKey: 'liquidations',
        header: '$ Liquidated',
        cell: ({ row }) => {
          //   return <DisplayCurrency coin={row.original.pnl} />
          return <Account value={row.original.amount_liquidations as string} />
        },
      },
      {
        accessorKey: 'amount_of_liquidations',
        header: 'Number of Liquidations',
        meta: { className: 'max-w-20' },
        cell: ({ row }) => {
          //   return <DisplayCurrency coin={row.original.pnl} />
          return <Account value={row.original.number_liquidations as string} />
        },
      },
    ]
  }, [])
}
