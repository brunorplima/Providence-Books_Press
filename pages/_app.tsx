import { Provider } from 'react-redux'
import { store, persistor } from '../app/redux/store/store'
import { PersistGate } from 'redux-persist/integration/react'


import '../app/styles/globals.css'
import Layout from '../app/components/layouts/Layout'

function MyApp({ Component, pageProps }) {
   return (
      <Provider store={store}>
         <PersistGate persistor={persistor}>
            <Layout>
               <Component {...pageProps} />
            </Layout>
         </PersistGate>
      </Provider>
   )
}

export default MyApp
