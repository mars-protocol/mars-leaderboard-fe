import classNames from 'classnames'

import { Logo } from 'components/common/Icons'
import { NavLink } from 'components/header/navigation/desktop/NavLink'

export default function Header() {
  return (
    <>
      <header
        className={classNames(
          'fixed left-0 top-0 z-50 w-full max-w-screen-full',
          'before:content-[" "] before:absolute before:inset-0 before:-z-1 before:h-full before:w-full before:rounded-sm before:backdrop-blur-sticky',
        )}
      >
        <div className='flex items-center justify-between px-4 py-4 border-b h-18 border-white/20'>
          <div className='relative z-50 flex items-center flex-1'>
            <NavLink isHome item={{ pages: ['main'], label: 'home' }}>
              <span className='block w-10 h-10'>
                <Logo className='text-white' />
              </span>
            </NavLink>
          </div>
        </div>
      </header>
    </>
  )
}
