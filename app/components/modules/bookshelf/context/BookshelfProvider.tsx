import { prop } from 'ramda'
import React, { createContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { OrderType, ORDER_TYPE_DELIVERY, ORDER_TYPE_MEDIA_ONLY } from '../../../../interfaces-objects/constants'
import { BookshelfItem } from '../../../../interfaces-objects/interfaces'
import { ReduxState } from '../../../../redux/reducers/rootReducer'
import { checkForMediaOnly } from '../../../../util/bookshelfHelper'

interface BookshelfContext {
   readonly overstockMessage: boolean,
   readonly setOverstockMessage: React.Dispatch<React.SetStateAction<boolean>>
   readonly orderType: OrderType,
   readonly setOrderType: React.Dispatch<React.SetStateAction<OrderType>>
}

export const bookshelfContext = createContext<BookshelfContext>({
   overstockMessage: false,
   setOverstockMessage: () => { },
   orderType: ORDER_TYPE_DELIVERY,
   setOrderType: () => { }
})

const BookshelfProvider: React.FC = ({ children }) => {

   const [overstockMessage, setOverstockMessage] = useState(false)
   const [orderType, setOrderType] = useState<OrderType>(ORDER_TYPE_DELIVERY)
   const [lastNonMediaOnlyOrderType, setLastNonMediaOnlyOrderType] = useState<OrderType>(ORDER_TYPE_DELIVERY)
   const bookshelf = useSelector<ReduxState, BookshelfItem[]>(prop('bookshelf'))

   useEffect(() => {
      if (checkForMediaOnly(bookshelf)) {
         if (orderType !== ORDER_TYPE_MEDIA_ONLY) {
            setLastNonMediaOnlyOrderType(orderType)
            setOrderType(ORDER_TYPE_MEDIA_ONLY)
         }
      }
      else {
         if (orderType === ORDER_TYPE_MEDIA_ONLY) setOrderType(lastNonMediaOnlyOrderType)
      }
   }, [bookshelf])

   const value: BookshelfContext = {
      overstockMessage,
      setOverstockMessage,
      orderType,
      setOrderType
   }

   return (
      <bookshelfContext.Provider {...{ value }}>
         {children}
      </bookshelfContext.Provider>
   )
}

export default BookshelfProvider
