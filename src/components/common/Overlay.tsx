import classNames from 'classnames'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  show: boolean
  setShow: (show: boolean) => void
}

export default function Overlay(props: Props) {
  const onClickAway = () => {
    props.setShow(false)
  }

  if (!props.show) return null

  return (
    <>
      <div className={classNames('fixed isolate z-50', props.className)}>{props.children}</div>
      <div
        className='fixed inset-0 z-40 bg-black/50 backdrop-blur-xs cursor-pointer'
        onClick={onClickAway}
        role='button'
        aria-label='Close overlay'
      />
    </>
  )
}
