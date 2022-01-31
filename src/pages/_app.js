import '../styles/globals.css'
import '../styles/style.sass'
import { Provider } from "next-auth/client"
import Header from '../components/header'
import Footer from '../components/footer'

function MyApp({ Component, pageProps }) {
    return (
        <Provider session={pageProps.session}>
            <Header/>
            <Component {...pageProps}/>
            <Footer/>
        </Provider>
    )
}

export default MyApp