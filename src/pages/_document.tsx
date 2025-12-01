import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html className='p-0 m-0 scrollbar-hide' lang='en' data-theme='dark'>
      <Head></Head>
      <body className='p-0 m-0 overflow-x-hidden font-sans text-white cursor-default bg-body scrollbar-hide'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
