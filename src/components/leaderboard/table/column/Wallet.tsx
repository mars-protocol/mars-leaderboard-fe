import { ColumnDef } from '@tanstack/react-table'

import Text from 'components/common/Text'
import { truncate } from 'utils/formatters'

export const WALLET_META: ColumnDef<FragmentLeaderboardEntry> = {
  id: 'wallet',
  accessorKey: 'wallet',
  header: 'Wallet',
  enableSorting: true,
  meta: {
    className: 'text-left',
  },
}

interface Props {
  value: FragmentLeaderboardEntry
  isLoading?: boolean
}

export default function Wallet(props: Props) {
  const { value, isLoading } = props

  if (isLoading) {
    return <Text size='sm' className='text-white'>-</Text>
  }

  return (
    <Text size='sm' className='text-white'>
      {truncate(value.wallet, [10, 8])}
    </Text>
  )
}

