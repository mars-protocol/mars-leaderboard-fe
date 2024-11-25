import Button from 'components/common/Button'
import Text from 'components/common/Text'

interface Props {
  currentPage: number
  totalPages: number
  onPageChange: (newPage: number) => void
}

export default function Pagination(props: Props) {
  const { currentPage, totalPages, onPageChange } = props

  return (
    <div className='flex justify-end gap-3 items-end'>
      <Text size='2xs' className='text-white/50 mt-1'>
        Page {currentPage} out of {totalPages}
      </Text>
      <div className='flex gap-2'>
        <Button
          variant='solid'
          color='tertiary'
          text={'Prev'}
          size='xs'
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        <Button
          variant='solid'
          color='tertiary'
          text={'Next'}
          size='xs'
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </div>
    </div>
  )
}
