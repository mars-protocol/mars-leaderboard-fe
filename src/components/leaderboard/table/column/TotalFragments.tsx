import { ColumnDef } from '@tanstack/react-table'

import { FormattedNumber } from 'components/common/FormattedNumber'
import Loading from 'components/common/Loading'
import { MarsFragments } from 'components/common/Icons'
import { BN } from 'utils/helpers'

export const TOTAL_FRAGMENTS_META: ColumnDef<FragmentLeaderboardEntry> = {
  id: 'total_fragments',
  header: 'Total Fragments',
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
    return (
      <div className='flex items-center justify-end gap-2'>
        <MarsFragments className='w-4 h-4 text-white' />
        <Loading className='h-4 w-18' />
      </div>
    )
  }

  const fragments = BN(value.total_fragments).toNumber()

  return (
    <div className='flex items-center justify-end gap-2'>
      <MarsFragments className='w-4 h-4 text-white' />
      <FormattedNumber
        amount={fragments}
        options={{
          minDecimals: 0,
          maxDecimals: 0,
          thousandSeparator: true,
        }}
        className='text-white'
      />
    </div>
  )
}
