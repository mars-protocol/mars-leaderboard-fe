import { ColumnDef } from '@tanstack/react-table'

import Text from 'components/common/Text'

export const RANK_META: ColumnDef<FragmentLeaderboardEntry> = {
  id: 'rank',
  accessorKey: 'rank',
  header: 'Rank',
  enableSorting: true,
  meta: {
    className: 'text-left',
  },
}

interface Props {
  value: FragmentLeaderboardEntry
  isLoading?: boolean
}

export default function Rank(props: Props) {
  const { value, isLoading } = props

  if (isLoading) {
    return <Text size='sm' className='text-white'>-</Text>
  }

  return (
    <Text size='sm' className='text-white'>
      {value.rank}
    </Text>
  )
}

