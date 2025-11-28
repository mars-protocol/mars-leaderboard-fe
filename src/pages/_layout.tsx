import classNames from 'classnames'
import { Suspense } from 'react'

import Footer from 'components/common/Footer'
import Header from 'components/header/Header'
import { CosmosKitProvider } from 'components/providers/CosmosKitProvider'

function PageContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className={classNames('mx-auto flex justify-center w-full max-w-content')}>{children}</div>
  )
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <CosmosKitProvider>
      <Suspense>
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
  )
}
