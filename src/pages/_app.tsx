import { AppProps } from 'next/app'
import { useEffect, useState } from 'react'

import DefaultPageHead from 'components/common/DefaultPageHead'

import 'styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  const [isClient, setIsClient] = useState(false)
  const PageComponent = Component as any

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <>
        <DefaultPageHead />
        <div style={{ minHeight: '100vh' }} />
      </>
    )
  }

  return (
    <>
      <DefaultPageHead />
      <PageComponent {...pageProps} />
    </>
  )
}
