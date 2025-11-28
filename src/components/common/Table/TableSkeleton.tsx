import classNames from 'classnames'

import Loading from 'components/common/Loading'
import Text from 'components/common/Text'

interface Props {
  labels: string[]
  rowCount: number
  alignments?: ('left' | 'right')[]
}

export default function TableSkeleton(props: Props) {
  const { labels, rowCount, alignments = [] } = props

  return (
    <table className='w-full'>
      <thead className='sticky top-0 z-20 bg-body'>
        <tr className='relative h-12 bg-body'>
          <th
            colSpan={labels.length}
            className={classNames('absolute -inset-x-2 top-0 bottom-0 bg-body z-0')}
          />
          <th
            colSpan={labels.length}
            className={classNames(
              'absolute inset-0 my-2 mx-1 z-1',
              'bg-linear-to-r from-white/10 to-white/3 -skew-x-25',
            )}
          />
          {labels.map((label, index) => {
            const alignment = alignments[index] || 'right'
            const isLeft = alignment === 'left'
            return (
              <th
                key={label}
                className={classNames(
                  'relative z-10',
                  'px-4 py-3 md:px-16 md:py-4',
                  alignment === 'right' ? 'text-right' : 'text-left',
                )}
              >
                <div
                  className={classNames(
                    'flex items-center',
                    isLeft ? 'justify-start' : 'justify-end w-full',
                  )}
                >
                  <Text
                    tag='span'
                    size='xs'
                    className={classNames(
                      'font-normal text-white/40 uppercase tracking-wide text-[10px] md:text-xs',
                      alignment === 'right' ? 'text-right' : 'text-left',
                    )}
                  >
                    {label}
                  </Text>
                </div>
              </th>
            )
          })}
        </tr>
      </thead>
      <tbody>
        {Array(rowCount)
          .fill(null)
          .map((_, index) => {
            return (
              <tr key={index} className='group relative h-10 md:h-14 z-0'>
                <td
                  colSpan={labels.length}
                  className={classNames(
                    'absolute inset-0 mt-0 mb-1 mx-2 transition-all duration-200 group-hover:bg-white/5',
                    'bg-linear-to-r from-white/3 to-white/1',
                    'border-solid -skew-x-25 border border-white/10',
                    'z-0',
                  )}
                />
                {labels.map((_, index2) => {
                  const alignment = alignments[index2] || 'right'
                  const isLeft = alignment === 'left'
                  return (
                    <td
                      key={`${index}-${index2}`}
                      className={classNames(
                        'text-xs md:text-sm text-white/80 text-right px-4 md:px-16 relative z-10',
                        isLeft ? 'text-left' : 'text-right',
                      )}
                    >
                      <div
                        className={classNames(
                          'flex items-center',
                          isLeft ? 'justify-start' : 'justify-end',
                        )}
                      >
                        <Loading className='w-20 h-3' />
                      </div>
                    </td>
                  )
                })}
              </tr>
            )
          })}
      </tbody>
    </table>
  )
}
