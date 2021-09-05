import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
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

   return (
      <div>
         <NavbarContainer />
         <Loading/>
         {children}
         <ClosedStoreMessage />
         {
            !['/admin', '/user', '/account'].includes(router.pathname) &&
            <Footer />
         }
      </div>
   )
}

export default Layout
