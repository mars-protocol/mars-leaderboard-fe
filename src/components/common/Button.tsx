import classNames from 'classnames'
import React from 'react'

interface BaseButtonProps {
  children?: React.ReactNode
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  className?: string
}

interface ButtonAsButton extends BaseButtonProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: never
}

interface ButtonAsAnchor extends BaseButtonProps, React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
}

type ButtonProps = ButtonAsButton | ButtonAsAnchor

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(function Button(
  { children, className = '', leftIcon, rightIcon, href, ...props },
  ref,
) {
  const baseStyles =
    'flex items-center gap-2 px-4 py-2 rounded-sm border border-white/10 bg-white/5 hover:bg-white/10 text-white text-sm transition-colors cursor-pointer'

  if (href) {
    return (
      <a
        ref={ref as React.ForwardedRef<HTMLAnchorElement>}
        href={href}
        className={classNames(baseStyles, className)}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {leftIcon}
        {children}
        {rightIcon}
      </a>
    )
  }

  return (
    <button
      ref={ref as React.ForwardedRef<HTMLButtonElement>}
      className={classNames(baseStyles, className)}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  )
})

Button.displayName = 'Button'

export default Button
