import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { firestore } from '../../firebase/firebase'
import { Order } from '../../interfaces-objects/interfaces'
import { useAuth } from './AuthProvider'

interface AdminContext {
   readonly orders: Order[]
   readonly listenForOrders: () => void
   readonly featuredProductIds: string[]
   readonly listenForFPIds: () => void
   readonly categories: string[]
   readonly listenForCategories: () => void
   readonly authors: string[]
   readonly listenForAuthors: () => void
   readonly publishers: string[]
   readonly listenForPublishers: () => void
}

export const adminContext = createContext<AdminContext>({
   orders: [],
   listenForOrders: () => { },
   featuredProductIds: [],
   listenForFPIds: () => { },
   categories: [],
   listenForCategories: () => { },
   authors: [],
   listenForAuthors: () => { },
   publishers: [],
   listenForPublishers: () => { }
})

export const useAdminContext = () => useContext(adminContext)

const AdminProvider: React.FC = ({ children }) => {
   const [orders, setOrders] = useState<Order[]>(null)
   const [featuredProductIds, setFeaturedProductIds] = useState<string[]>([])
   const [categories, setCategories] = useState<string[]>([])
   const [authors, setAuthors] = useState<string[]>([])
   const [publishers, setPublishers] = useState<string[]>([])
   const { providenceUser } = useAuth()
   const ordersUnsubscribe = useRef<() => void>()
   const fpUnsubscribe = useRef<() => void>()
   const categoriesUnsubscribe = useRef<() => void>()
   const authorsUnsubscribe = useRef<() => void>()
   const publishersUnsubscribe = useRef<() => void>()

   useEffect(() => {
      return () => {
         if (ordersUnsubscribe.current) ordersUnsubscribe.current()
         if (fpUnsubscribe.current) fpUnsubscribe.current()
         if (categoriesUnsubscribe.current) categoriesUnsubscribe.current()
         if (authorsUnsubscribe.current) authorsUnsubscribe.current()
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
            const prodList = snapshot.data()
            if (prodList) setFeaturedProductIds(prodList.ids as string[])
         })
      }
   }

   function listenForCategories() {
      if (!categoriesUnsubscribe.current) {
         categoriesUnsubscribe.current = firestore.collection('content').doc('categories').onSnapshot(snapshot => {
            const data = snapshot.data()
            const categs = data ? data.list as string[] : null
            if (categs) setCategories(categs)
         })
      }
   }

   function listenForAuthors() {
      if (!authorsUnsubscribe.current) {
         authorsUnsubscribe.current = firestore.collection('content').doc('authors').onSnapshot(snapshot => {
            const data = snapshot.data()
            const auths = data ? data.list as string[] : null
            if (auths) setAuthors(auths)
         })
      }
   }

   function listenForPublishers() {
      if (!publishersUnsubscribe.current) {
         publishersUnsubscribe.current = firestore.collection('content').doc('publishers').onSnapshot(snapshot => {
            const data = snapshot.data()
            const publs = data ? data.list as string[] : null
            if (publs) setPublishers(publs)
         })
      }
   }

   const initialValue: AdminContext = {
      orders,
      listenForOrders,
      featuredProductIds,
      listenForFPIds,
      categories,
      listenForCategories,
      authors,
      listenForAuthors,
      publishers,
      listenForPublishers
   }

   if (!providenceUser || providenceUser.role === 'user') return <>{children}</>
   return (
      <adminContext.Provider value={initialValue}>
         {children}
      </adminContext.Provider>
   )
}

export default AdminProvider
