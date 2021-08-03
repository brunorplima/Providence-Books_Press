import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchDocs } from '../../firebase/fetch'
import { Article } from '../../interfaces-objects/interfaces'
import Product from '../../interfaces-objects/Product'
import { articlesFetchAction } from '../../redux/actions/articlesActions'
import { updateArticlesLastSyncAction, updateProductsLastSyncAction } from '../../redux/actions/lastSyncActions'
import { productsFetchAction } from '../../redux/actions/productsActions'
import { hasSyncExpired } from '../../util/lastSyncHelper'
import ClosedStoreMessage from '../elements/closed-store/ClosedStoreMessage'
import Footer from '../elements/footer/Footer'
import Loading from '../modules/loading/Loading'
import NavbarContainer from '../modules/navbar/NavbarContainer'

const Layout: React.FC = ({ children }) => {
   const router = useRouter();
   const dispatch = useDispatch();

   useEffect(() => {
      fetchData();
   })

   async function fetchData() {
      if (hasSyncExpired('productsLastSync', 1)) {
         const products = await fetchDocs<Product>('products');
         dispatch(productsFetchAction(products));
         dispatch(updateProductsLastSyncAction(Date.now()));
      }
      if (hasSyncExpired('articlesLastSync', 1)) {
         const articles = await fetchDocs<Article>('articles');
         dispatch(articlesFetchAction(articles));
         dispatch(updateArticlesLastSyncAction(Date.now()));
      }
   }

   return (
      <div>
         <NavbarContainer />
         <Loading/>
         {children}
         <ClosedStoreMessage />
         {
            !['/admin', '/user'].includes(router.pathname) &&
            <Footer />
         }
      </div>
   )
}

export default Layout
