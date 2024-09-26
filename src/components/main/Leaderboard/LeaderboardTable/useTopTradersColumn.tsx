import { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'
import Position, {
  POSITION_META,
} from 'components/main/Leaderboard/LeaderboardTable/common/Position'
import Account from 'components/main/Leaderboard/LeaderboardTable/common/Account'
import DisplayCurrency from 'components/common/DisplayCurrency'
import { FormattedNumber } from 'components/common/FormattedNumber'

export default function useTopTraderColumns(data: TopTradersData[]) {
  return useMemo<ColumnDef<TopTradersData>[]>(() => {
    return [
      {
        ...POSITION_META,
        cell: ({ row }) => {
          return <Position value={row.original.position as number} />
        },
      },
      {
        accessorKey: 'trader',
        header: 'Account ID',
        meta: { className: 'max-w-30' },
        cell: ({ row }) => {
          return <Account value={'trader1' as string} />
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
        accessorKey: 'total_pnl',
        header: 'Profit & Loss (PnL)',
        cell: ({ row }) => {
          const pnlValue = parseFloat(row.original.total_pnl)
          return (
            <FormattedNumber
              amount={pnlValue}
              
              options={{ abbreviated: true, maxDecimals: 2, prefix: '$' }}
              animate
            />
          )
        },
      },
    ]
  }, [])
}
