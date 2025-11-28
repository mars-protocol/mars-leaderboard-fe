import Head from 'next/head'

import PAGE_METADATA from 'constants/pageMetadata'

function PageMetadata() {
  const metadata = PAGE_METADATA['main']
  const keywordsString = Array.isArray(metadata.keywords)
    ? metadata.keywords.join(', ')
    : metadata.keywords

  return (
    <Head>
      <title>{metadata.title}</title>
      <meta name='description' content={metadata.description} />
      <meta name='keywords' content={keywordsString} />
      <meta property='og:title' content={metadata.title} />
      <meta property='og:description' content={metadata.description} />
      <meta property='og:url' content={metadata.url} />
      <meta property='og:image' content={metadata.image} />
      <meta property='og:site_name' content={metadata.siteName} />
      <meta property='og:type' content='website' />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={metadata.title} />
      <meta name='twitter:description' content={metadata.description} />
      <meta name='twitter:image' content={metadata.image} />
    </Head>
  )
}

export default PageMetadata
