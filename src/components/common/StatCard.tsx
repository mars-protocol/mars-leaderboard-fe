import classNames from 'classnames'
import Loading from 'components/common/Loading'
import Text from 'components/common/Text'

type StatCardProps = {
  value: React.ReactNode
  label: string
  size?: string
  isLoading?: boolean
}

export function StatCard({
  value,
  label,
  size = 'text-4xl md:text-5xl',
  isLoading = false,
}: StatCardProps) {
  return (
    <div className='flex flex-col items-center text-center'>
      {isLoading ? (
        <Loading className='h-6 w-24 md:h-8 md:w-32 my-2' />
      ) : (
        <span
          className={classNames(
            size,
            'font-bold bg-linear-to-br from-white via-white to-white/60 bg-clip-text text-transparent',
          )}
        >
          {value}
        </span>
      )}
      <Text size='sm' className='uppercase tracking-wide text-white/40'>
        {label}
      </Text>
    </div>
  )
}
