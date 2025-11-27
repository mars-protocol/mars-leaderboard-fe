import classNames from 'classnames'

import { Logo } from 'components/common/Icons'
import WalletConnectButton from 'components/common/WalletConnectButton'

export default function Header() {
  return (
    <header
      className={classNames(
        'fixed left-0 top-0 z-50 w-full max-w-screen-full',
        'before:content-[" "] before:absolute before:inset-0 before:-z-1 before:rounded-sm before:backdrop-blur-sticky',
      )}
    >
      <div className='flex items-center justify-between p-4 h-18 mx-auto max-w-screen-2xl'>
        <span className='w-40'>
          <Logo />
        </span>
        <WalletConnectButton />
      </div>
    </header>
  )
}
