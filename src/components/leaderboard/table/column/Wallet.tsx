import { ColumnDef } from '@tanstack/react-table'

import Text from 'components/common/Text'

export const WALLET_META: ColumnDef<FragmentLeaderboardEntry> = {
  id: 'wallet',
  header: 'Wallet',
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
    return (
      <Text size='sm' className='text-white'>
        -
      </Text>
    )
  }

  return (
    <Text size='sm' className='text-white/80 text-left'>
      {value.wallet}
    </Text>
  )
}
