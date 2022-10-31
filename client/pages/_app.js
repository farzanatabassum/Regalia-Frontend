import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import '../styles/globals.css'
import '../styles/index.css'

function MyApp({ Component, pageProps }) {
  return <>
  <Navbar/>
  <Component {...pageProps} />
  <Footer/>
  </>
}

export default MyApp