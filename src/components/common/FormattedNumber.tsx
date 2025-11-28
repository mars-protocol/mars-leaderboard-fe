import classNames from 'classnames'
import React from 'react'

import { formatValue } from 'utils/formatters'

interface Props {
  amount: number
  options?: FormatOptions
  className?: string
  parentheses?: boolean
  smallerThanThreshold?: boolean
}

export const FormattedNumber = React.memo((props: Props) => {
  let options = props.options

  if (props.smallerThanThreshold) {
    const prefix =
      options?.prefix && options.prefix.substring(0, 1) !== '<' ? `< ${options.prefix}` : '< '
    options = { ...options, prefix }
  }

  return (
    <p
      className={classNames(
        'number',
        props.parentheses && 'before:content-["("] after:content-[")"]',
        props.className,
      )}
    >
      {formatValue(props.amount.toString(), options)}
    </p>
  )
})

FormattedNumber.displayName = 'FormattedNumber'
