import { Helmet, HelmetProvider } from 'react-helmet-async'

import PAGE_METADATA from 'constants/pageMetadata'

const helmetContext = {}

function PageMetadata() {
  const metadata = PAGE_METADATA['main']

  return (
    <HelmetProvider context={helmetContext}>
      <Helmet>
        <title>{metadata.title}</title>
        <meta content={metadata.title} property='og:title' />
        <meta name='description' content={metadata.description} property='og:description' />
        <meta name='keywords' content={metadata.keywords} property='og:keywords' />
      </Helmet>
    </HelmetProvider>
  )
}

export default PageMetadata
