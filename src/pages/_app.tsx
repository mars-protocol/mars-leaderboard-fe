import { AppProps } from 'next/app'

import DefaultPageHead from 'components/common/DefaultPageHead'

import 'styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  const PageComponent = Component as any

  return (
    <>
      <DefaultPageHead />
      <PageComponent {...pageProps} />
    </>
  )
}
