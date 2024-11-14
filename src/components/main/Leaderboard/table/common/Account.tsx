import Text from 'components/common/Text'

interface Props {
  value: string | number
}

export default function Account(props: Props) {
  const { value } = props

  return (
    <div className='flex items-center justify-end'>
      <Text size='xs'>{value}</Text>
    </div>
  )
}
