import { Fragment } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import 'bulma/css/bulma.min.css'
import '../styles/globals.css'

const MainApp = ({ Component, pageProps }) => {
  return (
    <Fragment>
      <Navbar />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </Fragment>
  )
}

export default MainApp
