import { ColumnDef } from '@tanstack/react-table'

import { FormattedNumber } from 'components/common/FormattedNumber'
import { BN } from 'utils/helpers'

export const TOTAL_FRAGMENTS_META: ColumnDef<FragmentLeaderboardEntry> = {
  id: 'total_fragments',
  accessorKey: 'total_fragments',
  header: 'Total Fragments',
  enableSorting: true,
  meta: {
    className: 'text-right',
  },
}

interface Props {
  value: FragmentLeaderboardEntry
  isLoading?: boolean
}

export default function TotalFragments(props: Props) {
  const { value, isLoading } = props

  if (isLoading) {
    return <FormattedNumber amount={0} className='text-white' />
  }

  const fragments = BN(value.total_fragments).toNumber()

  return (
    <FormattedNumber
      amount={fragments}
      options={{
        minDecimals: 0,
        maxDecimals: 0,
        thousandSeparator: true,
      }}
      className='text-white'
    />
  )
}

