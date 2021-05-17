import React from 'react'
import ClosedStoreMessage from '../elements/closed-store/ClosedStoreMessage'
import NavbarContainer from '../modules/navbar/NavbarContainer'

const Layout: React.FC = ({ children }) => {
   return (
      <div>
         <NavbarContainer />
         {children}
         <ClosedStoreMessage />
      </div>
   )
}

export default Layout
