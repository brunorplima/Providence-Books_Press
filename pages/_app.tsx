import { Provider } from 'react-redux';
import { store, persistor } from '../app/redux/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import '../app/styles/globals.css';
import Layout from '../app/components/layouts/Layout';
import { useEffect } from 'react';
import createLoadingAction from '../app/redux/actions/loadingAction';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
   
   useEffect(() => {
      if (store.getState().isLoading) {
         store.dispatch(createLoadingAction(false));
      }
   });

   return (
      <Provider store={store}>
         <PersistGate persistor={persistor}>
            <Layout>
               <Head>
                  <meta name="google-site-verification" content="IxilHgh9SqGbEK4oEHxkBTW63SP2-aEZZz_WptAoly4" />
               </Head>
               <Component {...pageProps} />
            </Layout>
         </PersistGate>
      </Provider>
   )
}

export default MyApp;
