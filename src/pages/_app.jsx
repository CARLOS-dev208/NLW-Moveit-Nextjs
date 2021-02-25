import '../styles/global.css';
import {ChellengesProvider} from '../contexts/ChellengesContext'
function MyApp({ Component, pageProps }) {
  return ( 
    <ChellengesProvider>
         <Component {...pageProps} />
    </ChellengesProvider>
  
  )
}

export default MyApp
