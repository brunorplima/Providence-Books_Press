import React from 'react'
import ClosedStoreMessage from '../elements/closed-store/ClosedStoreMessage'
import Footer from '../elements/footer/Footer'
import NavbarContainer from '../modules/navbar/NavbarContainer'

const Layout: React.FC = ({ children }) => {
   return (
      <div>
         <NavbarContainer />
         {children}
         <ClosedStoreMessage />
         <Footer />
      </div>
   )
}

export default Layout
