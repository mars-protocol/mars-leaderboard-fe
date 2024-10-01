import Text from 'components/common/Text'

export const POSITION_META = {
  id: 'position',
  header: 'Pos',
  accessorKey: 'position',
  meta: { className: 'max-w-10' },
}

interface Props {
  value: number
}

export default function Position(props: Props) {
  const { value } = props
  return (
    <div className='flex items-center justify-end'>
      <Text size='xs'>#{value}</Text>
    </div>
  )
}
