import React, { useState, createContext, useEffect, useRef, useContext } from 'react'
import { Comment, Order, Review } from '../../interfaces-objects/interfaces'
import { useAuth } from './AuthProvider'
import firebase, { firestore } from '../../firebase/firebase'

interface AccountContext {
   readonly myReviews: Review[]
   readonly listenForReviews: () => void
   readonly myComments: Comment[]
   readonly listenForComments: () => void
   readonly myOrders: Order[]
   readonly listenForOrders: () => void
}

type FirestoreReview = Review & { dateTime: firebase.firestore.Timestamp }
type FirestoreComment = Comment & { dateTime: firebase.firestore.Timestamp }

const accountContext = createContext<AccountContext>({
   myReviews: null,
   listenForReviews: null,
   myComments: null,
   listenForComments: null,
   myOrders: null,
   listenForOrders: null
})

export const useAccountProvider = () => useContext(accountContext)

const AccountProvider: React.FC = ({ children }) => {
   const [myReviews, setMyReviews] = useState<Review[]>([])
   const [myComments, setMyComments] = useState<Comment[]>([])
   const [myOrders, setMyOrders] = useState<Order[]>([])
   const { providenceUser } = useAuth()

   const reviewsRef = useRef<() => void>()
   const commentsRef = useRef<() => void>()
   const ordersRef = useRef<() => void>()

   useEffect(() => {
      return () => {
         if (reviewsRef.current) reviewsRef.current()
         if (commentsRef.current) commentsRef.current()
         if (ordersRef.current) ordersRef.current()
      }
   }, [])

   async function listenForReviews() {
      if (providenceUser && !reviewsRef.current) {
         reviewsRef.current = firestore.collectionGroup('reviews').where('_userId', '==', providenceUser._id)
            .orderBy('dateTime', 'desc').limit(15).onSnapshot(snapshot => {
               const revs: Review[] = []
               snapshot.forEach(doc => {
                  const rev = doc.data() as FirestoreReview
                  const review: Review = { ...rev as Review, dateTime: rev.dateTime.toDate() }
                  revs.push(review)
               })
               setMyReviews(revs)
            })
      }
   }

   function listenForComments() {
      if (providenceUser && !commentsRef.current) {
         commentsRef.current = firestore.collectionGroup('comments').where('_userId', '==', providenceUser._id)
            .orderBy('dateTime', 'desc').limit(15).onSnapshot(snapshot => {
               const comms: Comment[] = []
               snapshot.forEach(doc => {
                  const comm = doc.data() as FirestoreComment
                  const comment: Comment = { ...comm as Comment, dateTime: comm.dateTime.toDate() }
                  comms.push(comment)
               })
               setMyComments(comms)
            })
      }
   }

   function listenForOrders() {
      if (providenceUser && !ordersRef.current) {
         ordersRef.current = firestore.collectionGroup('orders').where('_userId', '==', providenceUser._id)
            .orderBy('dateTime', 'desc').limit(15).onSnapshot(snapshot => {
               const orders: Order[] = []
               snapshot.forEach(doc => orders.push(doc.data() as Order))
               setMyOrders(orders)
            })
      }
   }

   const initialValue: AccountContext = {
      myReviews,
      listenForReviews,
      myComments,
      listenForComments,
      myOrders,
      listenForOrders
   }

   if (!providenceUser || providenceUser.role !== 'user') return <>{children}</>
   return (
      <accountContext.Provider value={initialValue}>
         {children}
      </accountContext.Provider>
   )
}

export default AccountProvider
