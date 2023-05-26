import Layout from '../components/Layout';
import Head from 'next/head';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
      <Layout>
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta charSet="UTF-8" />
            <meta name="description" content="Get all the events" />
            <meta name="author" content="Narek Danielyan" />
            <title>This is the main page</title>
          </Head>
          <Component {...pageProps} />
      </Layout>
  )
}

export default MyApp
