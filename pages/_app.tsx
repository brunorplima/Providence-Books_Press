import { Provider, useDispatch } from 'react-redux';
import { store, persistor } from '../app/redux/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import '../app/styles/globals.css';
import '../app/styles/admin-user/ListItem.css';
import Layout from '../app/components/layouts/Layout';
import { useEffect, useState } from 'react';
import createLoadingAction from '../app/redux/actions/loadingAction';
import { firestore } from '../app/firebase/firebase';
import Product from '../app/interfaces-objects/Product';
import { productsFetchAction } from '../app/redux/actions/productsActions';
import { Article } from '../app/interfaces-objects/interfaces';
import { articlesFetchAction } from '../app/redux/actions/articlesActions';
import AuthProvider from '../app/components/contexts/AuthProvider';
import AdminProvider from '../app/components/contexts/AdminProvider';
import AccountProvider from '../app/components/contexts/AccountProvider';
import { lastActiveTimeAction } from '../app/redux/actions/lastActiveTimeActions';
import { createChangeListPageAction } from '../app/redux/actions/listPageActions';
import Head from 'next/head';
import BookshelfProvider from '../app/components/modules/bookshelf/context/BookshelfProvider';

function MyApp({ Component, pageProps }) {

   const [lastActiveTime, setLastActiveTime] = useState(0)
   const dispatch = store.dispatch;

   useEffect(() => {
      window.addEventListener('submit', onSubmit);
      const productsUnsubscribe = fetchProducts()
      const articlesUnsubscribe = fetchArticles()
      const lat = store.getState().lastActiveTime
      setLastActiveTime(lat ? lat : 1)
      return () => {
         window.removeEventListener('submit', onsubmit);
         productsUnsubscribe()
         articlesUnsubscribe()
      }
   }, []);

   useEffect(() => {
      if (lastActiveTime && Date.now() - lastActiveTime >= 600000) dispatch(createChangeListPageAction(1))
   }, [lastActiveTime])

   useEffect(() => {
      if (store.getState().isLoading) {
         store.dispatch(createLoadingAction(false));
      }
      if (lastActiveTime) dispatch(lastActiveTimeAction())
   });

   function fetchProducts() {
      const unsubscribe = firestore.collection('products').onSnapshot(snapshot => {
         const products: Product[] = []
         snapshot.forEach(doc => products.push(doc.data() as Product))
         dispatch(productsFetchAction(products))
      })
      return unsubscribe
   }

   function fetchArticles() {
      const unsubscribe = firestore.collection('articles').onSnapshot(snapshot => {
         const articles: Article[] = []
         snapshot.forEach(doc => {
            const article = doc.data() as Article
            article.datePosted = article.datePosted as Date
            articles.push(doc.data() as Article)
         })
         dispatch(articlesFetchAction(articles));
      })
      return unsubscribe
   }

   return (
      <Provider store={store}>
         <PersistGate persistor={persistor}>
            <AuthProvider>
               <AdminProvider>
                  <AccountProvider>
                     <BookshelfProvider>
                        <Layout>
                           <Head>
                              <title>Providence Books &amp; Providence - Home</title>
                              <link rel="icon" href="/favicon.ico" />
                              <meta name="google-site-verification" content="IxilHgh9SqGbEK4oEHxkBTW63SP2-aEZZz_WptAoly4" />

                              {/* Open Graph */}
                              <meta property="og:title" content='Providence Book Store' />
                              <meta property="og:type" content="website" />
                              <meta property="og:description" content="Providence is a family-owned business which sells Christian books, from kid's stories to theological works." />
                              <meta
                                 property="og:image"
                                 content='https://firebasestorage.googleapis.com/v0/b/providence-2f91a.appspot.com/o/open-graph-assets%2FHnet.com-image.png?alt=media&token=8c93f376-77e4-421a-bf3d-d71a7e10f808'
                              />
                              <meta property="og:url" content="https://www.providencebookspress.com/" />
                              <meta property="og:site_name" content='Providence Book Store' />
                              <meta
                                 name="twitter:card"
                                 content="summary_large_image"
                              />
                           </Head>
                           <Component {...pageProps} />
                        </Layout>
                     </BookshelfProvider>
                  </AccountProvider>
               </AdminProvider>
            </AuthProvider>
         </PersistGate>
      </Provider>
   )
}

export default MyApp;



const onSubmit = (e: Event) => {
   e.preventDefault();
}
