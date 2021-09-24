import { useRouter } from 'next/router'
import React from 'react'
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
