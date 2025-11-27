import MainPage from 'pages/MainPage'
import Layout from 'pages/_layout'

// Force server-side rendering to prevent static generation
export async function getServerSideProps() {
  return {
    props: {},
  }
}

export default function Home() {
  return (
    <Layout>
      <MainPage />
    </Layout>
  )
}
