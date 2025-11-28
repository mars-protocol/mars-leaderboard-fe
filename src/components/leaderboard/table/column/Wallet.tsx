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

  const truncateAddress = (address: string) => {
    if (address.length <= 10) return address
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <Text size='sm' className='text-white/80 text-left text-xs md:text-sm'>
      <span className='md:hidden'>{truncateAddress(value.wallet)}</span>
      <span className='hidden md:inline'>{value.wallet}</span>
    </Text>
  )
}
