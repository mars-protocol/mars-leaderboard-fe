import classNames from 'classnames'
import React from 'react'

interface ButtonProps {
  children?: React.ReactNode
  className?: string
  disabled?: boolean
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  type?: 'button' | 'submit' | 'reset'
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { children, className = '', disabled = false, onClick, type = 'button', leftIcon, rightIcon },
  ref,
) {
  const isDisabled = disabled

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      onClick={isDisabled ? undefined : onClick}
      className={classNames(
        // Base styles
        'relative z-1 flex items-center justify-center group',
        'appearance-none break-normal rounded-sm',
        'px-4 py-1.5 text-sm',

        // Primary button colors & borders
        'bg-[hsl(var(--color-body))]',
        'border border-primary',
        'overflow-hidden',
        'shadow-[0_0_20px_hsl(var(--color-primary)/0.15)]',

        // Primary button text styles
        'text-white font-bold',
        'drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]',

        // Hover animations - bottom oval glow effect (only when not disabled)
        !isDisabled && 'before:content-[""]',
        !isDisabled && 'before:absolute before:w-[200%] before:h-48',
        !isDisabled && 'before:left-1/2 before:top-[75%] before:-translate-x-1/2',
        !isDisabled && 'before:bg-primary before:rounded-[50%] before:blur-md',
        !isDisabled && 'before:opacity-0 before:z-[-1]',
        !isDisabled && 'before:transition-opacity before:duration-300 before:ease-in-out',
        !isDisabled && 'hover:before:opacity-100',

        // Hover animations - overlay effect (only when not disabled)
        !isDisabled && 'after:content-[""]',
        !isDisabled && 'after:absolute after:inset-0',
        !isDisabled && 'after:bg-primary/5',
        !isDisabled && 'after:opacity-0 after:z-0',
        !isDisabled && 'after:transition-opacity after:duration-300',
        !isDisabled && 'hover:after:opacity-100',

        // Interactive states
        isDisabled
          ? 'cursor-not-allowed pointer-events-none opacity-40 grayscale'
          : 'hover:cursor-pointer',

        // Transitions
        'transition-all duration-300',

        className,
      )}
    >
      <span className='relative z-10 flex items-center'>
        {leftIcon && <span className='flex items-center justify-center mr-2'>{leftIcon}</span>}
        {children}
        {rightIcon && <span className='flex items-center justify-center ml-2'>{rightIcon}</span>}
      </span>
    </button>
  )
})

export default Button
