import classNames from 'classnames'
import { useCallback, useEffect, useMemo } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import Text from 'components/common/Text'
import ChainSelect from 'components/header/ChainSelect'
import useStore from 'store'
import { getPage, getRoute } from 'utils/route'

interface Props {
  menuTree: () => MenuTreeEntry[]
}

export default function MobileNavigation(props: Props) {
  const { menuTree } = props
  const mobileNavExpanded = useStore((s) => s.mobileNavExpanded)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const currentPage = getPage(pathname)

  const menu = useMemo(() => menuTree(), [menuTree])

  useEffect(() => {
    if (mobileNavExpanded) {
      document.body.classList.add('h-screen-full', 'overflow-hidden')
    } else {
      document.body.classList.remove('h-screen-full', 'overflow-hidden')
    }

    return () => {
      document.body.classList.remove('h-screen-full', 'overflow-hidden')
    }
  }, [mobileNavExpanded])

  const selectPage = useCallback(
    (page: Page) => {
      window.scrollTo(0, 0)
      if (typeof window !== 'undefined') setTimeout(() => window.scrollTo(0, 0), 200)
      useStore.setState({ mobileNavExpanded: false })
      navigate(getRoute(getPage(page), searchParams))
    },
    [navigate, searchParams],
  )

  return (
    <nav
      className={classNames(
        'fixed md:hidden max-w-screen-full w-screen-full top-18 p-2 pt-4 pb-20 transition-all overflow-y-scroll h-[calc(100dvh-72px)] z-20 items-start',
        mobileNavExpanded ? 'right-0 opacity-100' : '-right-full opacity-0',
      )}
    >
      <div className='flex flex-wrap gap-4'>
        <div className='flex items-center justify-between w-full'>
          <Text size='sm'>Outpost:</Text>
          <div className='relative'>
            <ChainSelect withText />
          </div>
        </div>
      </div>
    </nav>
  )
}
