import classNames from 'classnames'
import { Suspense, useEffect } from 'react'
import { SWRConfig } from 'swr'

import Background from 'components/common/Background'
import Footer from 'components/common/Footer'
import PageMetadata from 'components/common/PageMetadata'
import Header from 'components/header/Header'
import { DEFAULT_SETTINGS } from 'constants/defaultSettings'
import { LocalStorageKeys } from 'constants/localStorageKeys'
import { debugSWR } from 'utils/middleware'
import { CircularProgress } from 'components/common/CircularProgress'
import Text from 'components/common/Text'
import { CosmosKitProvider } from 'components/providers/CosmosKitProvider'

function PageContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className={classNames('mx-auto flex justify-center w-full max-w-content')}>{children}</div>
  )
}

export default function Layout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (!window) return
    const theme = localStorage.getItem(LocalStorageKeys.THEME) ?? DEFAULT_SETTINGS.theme
    const root = window.document.documentElement
    root.setAttribute('data-theme', theme)
  }, [])

  return (
    <>
      <SWRConfig value={{ use: [debugSWR] }}>
        <CosmosKitProvider>
          <Suspense>
            <PageMetadata />
            <Background />
            <Header />
            <main
              className={classNames(
                'md:min-h-[calc(100dvh-81px)]',
                'mt-[25px]',
                'flex',
                'min-h-screen-full w-full relative',
                'gap-4 p-2 pb-20',
                'md:gap-6 md:px-4 md:py-6',
                'transition-all duration-500',
                'justify-center',
              )}
            >
              <PageContainer>{children}</PageContainer>
            </main>
            <Footer />
          </Suspense>
        </CosmosKitProvider>
      </SWRConfig>
    </>
  )
}
