import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { firestore } from '../../firebase/firebase'
import { Order } from '../../interfaces-objects/interfaces'
import { useAuth } from './AuthProvider'

interface AdminContext {
   readonly orders: Order[]
   readonly listenForOrders: () => void
   readonly featuredProductIds: string[]
   readonly listenForFPIds: () => void
}

export const adminContext = createContext<AdminContext>({
   orders: [],
   listenForOrders: () => { },
   featuredProductIds: [],
   listenForFPIds: () => { }
})

export const useAdminContext = () => useContext(adminContext)

const AdminProvider: React.FC = ({ children }) => {
   const [orders, setOrders] = useState<Order[]>(null)
   const [featuredProductIds, setFeaturedProductIds] = useState<string[]>([])
   const { providenceUser } = useAuth()
   const ordersUnsubscribe = useRef<() => void>()
   const fpUnsubscribe = useRef<() => void>()

   useEffect(() => {
      return () => {
         if (ordersUnsubscribe.current) ordersUnsubscribe.current()
         if (fpUnsubscribe.current) fpUnsubscribe.current()
      }
   }, [])

   function listenForOrders() {
      if (!ordersUnsubscribe.current) {
         ordersUnsubscribe.current = firestore.collection('orders').onSnapshot(snapshot => {
            const ords: Order[] = []
            snapshot.forEach(doc => ords.push(doc.data() as Order))
            setOrders(ords)
         })
      }
   }

   function listenForFPIds() {
      if (!fpUnsubscribe.current) {
         fpUnsubscribe.current = firestore.collection('featured-products').doc('ids').onSnapshot(snapshot => {
            setFeaturedProductIds(snapshot.data().ids as string[])
         })
      }
   }

   const initialValue: AdminContext = {
      orders,
      listenForOrders,
      featuredProductIds,
      listenForFPIds
   }

   if (!providenceUser || providenceUser.role === 'user') return <>{children}</>
   return (
      <adminContext.Provider value={initialValue}>
         {children}
      </adminContext.Provider>
   )
}

export default AdminProvider
