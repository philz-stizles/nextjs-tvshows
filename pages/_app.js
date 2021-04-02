import { Fragment } from 'react'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import 'bulma/css/bulma.min.css' // import from node_modules
import '../styles/globals.css'

const MainApp = ({ Component, pageProps }) => {
  return (
    <Fragment>
      <Head>
        <script src="https://kit.fontawesome.com/f64d28ebea.js" crossOrigin="anonymous"></script>
      </Head>
      <Navbar />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </Fragment>
  )
}

export default MainApp
