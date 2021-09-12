import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { firestore } from '../../firebase/firebase'
import { Order } from '../../interfaces-objects/interfaces'
import { useAuth } from './AuthProvider'

interface AdminContext {
   readonly orders: Order[]
   readonly listenForOrders: () => void
}

export const adminContext = createContext<AdminContext>({
   orders: [],
   listenForOrders: () => {}
})

export const useAdminContext = () => useContext(adminContext)

const AdminProvider: React.FC = ({ children }) => {
   const [orders, setOrders] = useState<Order[]>(null)
   const { providenceUser } = useAuth()
   const ordersUnsubscribe = useRef<() => void>()

   useEffect(() => {
      return ordersUnsubscribe.current
   }, [])

   function listenForOrders() {
      ordersUnsubscribe.current = firestore.collection('orders').onSnapshot(snapshot => {
         const ords: Order[] = []
         snapshot.forEach(doc => ords.push(doc.data() as Order))
         setOrders(ords)
      })
   }

   const initialValue: AdminContext = {
      orders,
      listenForOrders
   }

   if (!providenceUser || providenceUser.role === 'user') return <>{children}</>
   return (
      <adminContext.Provider value={initialValue}>
         {children}
      </adminContext.Provider>
   )
}

export default AdminProvider
