import { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'
import Account from 'components/main/Leaderboard/table/common/Account'
import Position, { POSITION_META } from 'components/main/Leaderboard/table/common/Position'
import DisplayCurrency from 'components/common/DisplayCurrency'
import { BNCoin } from 'types/classes/BNCoin'
import { BN } from 'utils/helpers'

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
          return (
            <DisplayCurrency
              coin={BNCoin.fromDenomAndBigNumber('usd', BN(row.original.total_liquidated_amount))}
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
        accessorKey: 'amount_of_liquidations',
        header: '# Liquidations',
        meta: { className: 'max-w-20' },
        cell: ({ row }) => {
          return <Account value={row.original.number_liquidations as string} />
        },
      },
    ]
  }, [])
}
