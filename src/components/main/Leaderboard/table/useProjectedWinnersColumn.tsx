import { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'
import Account from 'components/main/Leaderboard/table/common/Account'
import DisplayCurrency from 'components/common/DisplayCurrency'
import { BNCoin } from 'types/classes/BNCoin'
import { BN } from 'utils/helpers'
import { PRICE_ORACLE_DECIMALS } from 'constants/query'

export default function useProjectedWinnersColumn() {
  return useMemo<ColumnDef<ProjectedWinnersData>[]>(() => {
    return [
      {
        header: 'Trader',
        meta: { className: 'max-w-30' },
        cell: ({ row }) => {
          return <Account value={row.original.trader ? row.original.trader : 'N/A'} />
        },
      },
      {
        header: 'Achievement',
        meta: { className: 'max-w-30' },
        cell: ({ row }) => {
          const coinValue =
            'total_liquidated_amount' in row.original
              ? BNCoin.fromDenomAndBigNumber('usd', BN(row.original.total_liquidated_amount ?? 0))
              : BNCoin.fromDenomAndBigNumber(
                  'usd',
                  BN(row.original.total_pnl ?? 0).shiftedBy(-PRICE_ORACLE_DECIMALS),
                )

          return (
            <DisplayCurrency
              coin={coinValue}
              options={{
                abbreviated: false,
              }}
              showSignPrefix
              className='text-xs'
            />
          )
        },
      },
      {
        header: 'Description',
        meta: { className: 'max-w-30' },
        cell: ({ row }) => {
          return <Account value={row.original.description} />
        },
      },
      {
        header: 'Reward',
        meta: { className: 'max-w-30' },
        cell: ({ row }) => {
          return <Account value={row.original.reward} />
        },
      },
    ]
  }, [])
}
