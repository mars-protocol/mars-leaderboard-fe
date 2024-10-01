import { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'
import Position, { POSITION_META } from 'components/main/Leaderboard/table/common/Position'
import Account from 'components/main/Leaderboard/table/common/Account'
import DisplayCurrency from 'components/common/DisplayCurrency'
import { BNCoin } from 'types/classes/BNCoin'
import { BN } from 'utils/helpers'
import { PRICE_ORACLE_DECIMALS } from 'constants/query'

export default function useTopTraderColumns() {
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
        accessorKey: 'total_pnl',
        header: 'Profit & Loss (PnL)',
        cell: ({ row }) => {
          return (
            <DisplayCurrency
              coin={BNCoin.fromDenomAndBigNumber(
                'usd',
                BN(row.original.total_pnl).shiftedBy(-PRICE_ORACLE_DECIMALS),
              )}
              options={{
                abbreviated: false,
              }}
              showSignPrefix
              className='text-xs'
            />
          )
        },
      },
    ]
  }, [])
}
