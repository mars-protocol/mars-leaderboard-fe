import { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'
import Position, { POSITION_META } from 'components/main/Leaderboard/table/common/Position'
import Account from 'components/main/Leaderboard/table/common/Account'
import DisplayCurrency from 'components/common/DisplayCurrency'
import { BNCoin } from 'types/classes/BNCoin'
import { BN } from 'utils/helpers'
import { PRICE_ORACLE_DECIMALS } from 'constants/query'
import { TextLink } from 'components/common/TextLink'
import Text from 'components/common/Text'
import { ExternalLink } from 'components/common/Icons'

export default function useTopTraderColumns() {
  return useMemo<ColumnDef<TopTradersData>[]>(() => {
    return [
      {
        ...POSITION_META,
        cell: ({ row }) => {
          return <Position value={row.original.position} />
        },
      },
      {
        header: 'Trader',
        meta: { className: 'max-w-30' },
        cell: ({ row }) => {
          return <Account value={row.original.trader} />
        },
      },
      {
        header: 'Account ID',
        meta: { className: 'max-w-30' },
        cell: ({ row }) => {
          const url = `https://perps.marsprotocol.io/wallets/neutron/portfolio/${row.original.account_id}`
          return (
            <div
              className='flex items-center justify-end space-x-1'
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              <Text size='xs'>{row.original.account_id}</Text>
              <TextLink
                href={url}
                target='_blank'
                title={`Mars Protocol Account ID #${row.original.account_id}`}
              >
                <ExternalLink className='w-3 h-3 text-white/40 hover:text-inherit hover:cursor-pointer' />
              </TextLink>
            </div>
          )
        },
      },
      {
        accessorKey: 'total_pnl',
        id: 'total_pnl',
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
