import { Provider } from 'react-redux';
import { store, persistor } from '../app/redux/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import '../app/styles/globals.css';
import '../app/styles/admin-user/ListItem.css';
import Layout from '../app/components/layouts/Layout';
import { useEffect } from 'react';
import createLoadingAction from '../app/redux/actions/loadingAction';

function MyApp({ Component, pageProps }) {

   useEffect(() => {
      window.addEventListener('submit', onSubmit);
      return () => {
         window.removeEventListener('submit', onsubmit);
      }
   }, []);
   
   useEffect(() => {
      if (store.getState().isLoading) {
         store.dispatch(createLoadingAction(false));
      }
   });

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

export default MyApp;



const onSubmit = (e: Event) => {
   e.preventDefault();
}
