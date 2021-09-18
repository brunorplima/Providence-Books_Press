import React, { createContext, useState } from 'react'

interface BookshelfContext {
   readonly overstockMessage: boolean,
   readonly setOverstockMessage: React.Dispatch<React.SetStateAction<boolean>>
}

export const bookshelfContext = createContext<BookshelfContext>({
   overstockMessage: false,
   setOverstockMessage: () => { }
})

const BookshelfProvider: React.FC = ({ children }) => {

   const [overstockMessage, setOverstockMessage] = useState(false)

   const value: BookshelfContext = {
      overstockMessage,
      setOverstockMessage
   }

   return (
      <bookshelfContext.Provider {...{ value }}>
         {children}
      </bookshelfContext.Provider>
   )
}

export default BookshelfProvider
