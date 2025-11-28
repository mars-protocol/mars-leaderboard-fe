import { ColumnDef } from '@tanstack/react-table'
import classNames from 'classnames'

import Text from 'components/common/Text'

export const RANK_META: ColumnDef<FragmentLeaderboardEntry> = {
  id: 'rank',
  header: 'Rank',
  meta: {
    className: 'text-right',
  },
}

interface Props {
  value: FragmentLeaderboardEntry
  isLoading?: boolean
}

export default function Rank(props: Props) {
  const { value, isLoading } = props

  if (isLoading) {
    return (
      <Text size='sm' className='text-white'>
        -
      </Text>
    )
  }

  const rank = value.rank
  const isTopThree = rank <= 3

  const formattedRank = rank.toString().padStart(2, '0')

  return (
    <Text
      className={classNames(
        isTopThree
          ? 'text-white font-bold italic text-base md:text-[22px]'
          : 'text-white/60 font-normal text-xs md:text-sm',
      )}
    >
      {formattedRank}
    </Text>
  )
}
