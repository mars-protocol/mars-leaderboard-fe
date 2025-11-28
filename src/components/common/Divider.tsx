import classNames from 'classnames'

type DividerProps = {
  width?: string
  marginTop?: string
  className?: string
}

export function Divider({ width = 'w-12', marginTop = 'md:mt-7', className = '' }: DividerProps) {
  return (
    <div
      className={classNames(
        'relative z-10 hidden h-px shrink-0 bg-linear-to-r from-transparent via-white/40 to-transparent md:block',
        width,
        marginTop,
        className,
      )}
    />
  )
}
