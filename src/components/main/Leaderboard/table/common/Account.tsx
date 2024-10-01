import Text from 'components/common/Text'

export const ACCOUNT_META = {
  id: 'account_id',
  header: 'Account ID',
  accessorKey: 'account_id',
  meta: { className: 'max-w-30' },
}

interface Props {
  value: string
}

export default function Account(props: Props) {
  const { value } = props

  return (
    <div className='flex items-center justify-end'>
      <Text size='xs'>{value}</Text>
    </div>
  )
}
