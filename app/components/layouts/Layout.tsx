import React from 'react'
import ClosedStoreMessage from '../elements/closed-store/ClosedStoreMessage'

const Layout: React.FC = ({ children }) => {
   return (
      <div>
         {children}
         <ClosedStoreMessage />
      </div>
   )
}

export default Layout
