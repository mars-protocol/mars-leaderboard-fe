import { AppProps } from 'next/app'
import { useEffect, useState } from 'react'

import DefaultPageHead from 'components/common/DefaultPageHead'
import PageMetadata from 'components/common/PageMetadata'

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
        <PageMetadata />
        <div style={{ minHeight: '100vh' }} />
      </>
    )
  }

  return (
    <>
      <DefaultPageHead />
      <PageMetadata />
      <PageComponent {...pageProps} />
    </>
  )
}
