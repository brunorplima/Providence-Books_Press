import { filter, find, prop, propEq } from 'ramda'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { firestore } from '../../../firebase/firebase'
import { Review, User, Comment, Article, Order } from '../../../interfaces-objects/interfaces'
import Product from '../../../interfaces-objects/Product'
import { ReduxState } from '../../../redux/reducers/rootReducer'
import styles from '../../../styles/admin-user/UserDetails.module.css'
import { titleCase } from '../../../util/stringHelper'
import UserInfo from './UserInfo'
import { RiDeleteBin6Line } from 'react-icons/ri'
import Dialog from '../dialog/Dialog'
import { closeDialog, openDialog } from '../../../redux/actions/openedDialogNameAction'
import { adminContext } from '../../contexts/AdminProvider'
import { AiFillStar } from 'react-icons/ai'

interface Props {
   readonly selectedUser: User
}

const REVIEWS = 'reviews'
const COMMENTS = 'comments'
const PURCHASES = 'purchases'
type Tab = typeof REVIEWS | typeof COMMENTS | typeof PURCHASES

const UserDetails: React.FC<Props> = ({ selectedUser }) => {
   const { orders, listenForOrders } = useContext(adminContext)
   const [tab, setTab] = useState<Tab>(REVIEWS)
   const [reviews, setReviews] = useState<Review[]>(null)
   const [currentReview, setCurrentReview] = useState<Review>(null)
   const [comments, setComments] = useState<Comment[]>(null)
   const [currentPurchase, setCurrentPurchase] = useState<Order>(null)
   const [currentComment, setCurrentComment] = useState<Comment>(null)
   const products: Product[] = useSelector<ReduxState>(prop('products')) as Product[]
   const articles: Article[] = useSelector<ReduxState>(prop('articles')) as Article[]
   const associatedOrders = useMemo(() => {
      if (!orders || !orders.length) return []
      return filter(propEq('_userId', selectedUser._id), orders)
   }, [orders])
   let unsubsReviews;
   let unsubsComments;

   useEffect(() => {
      listenForOrders()
   }, [])

   useEffect(() => {
      if (products && !unsubsReviews && !unsubsComments) {
         fetchData()
         return () => {
            unsubsReviews()
            unsubsComments()
         }
      }
   }, [products])

   useEffect(() => {
      if (currentReview) openDialog('CONFIRM_DELETE_USER_REVIEW')
   }, [currentReview])

   useEffect(() => {
      if (currentComment) openDialog('CONFIRM_DELETE_USER_COMMENT')
   }, [currentComment])

   useEffect(() => {
      if (currentPurchase) openDialog('CONFIRM_DELETE_USER_PURCHASE')
   }, [currentPurchase])

   function fetchData() {
      unsubsReviews = firestore.collectionGroup('reviews').where('_userId', '==', selectedUser._id).onSnapshot(value => {
         const revs: Review[] = []
         value.forEach(doc => {
            const rev: Review = {
               ...doc.data() as Review,
               dateTime: doc.data().dateTime.toDate() as Date
            }
            revs.push(rev)
         })
         setReviews(revs)
      })

      unsubsComments = firestore.collectionGroup('comments').where('_userId', '==', selectedUser._id).onSnapshot(value => {
         const comms: Comment[] = []
         value.forEach(doc => {
            const comm: Comment = {
               ...doc.data() as Comment,
               dateTime: doc.data().dateTime.toDate() as Date
            }
            comms.push(comm)
         })
         setComments(comms)
      })
   }

   const focusedTabStyle = {
      backgroundColor: 'var(--darkYellow)',
      color: 'white'
   }

   const getStyle = tabName => {
      if (tabName === tab) return focusedTabStyle
      return {}
   }

   return (
      <div className={styles.container}>
         <div className={styles.userInfo}>
            <UserInfo user={selectedUser} />
         </div>

         <div className={styles.tabsContainer}>
            <div
               style={getStyle(REVIEWS)}
               onClick={() => setTab(REVIEWS)}
            >
               {titleCase(REVIEWS)} {reviews && tab !== REVIEWS ? `(${reviews.length})` : ''}
            </div>
            <div
               style={getStyle(COMMENTS)}
               onClick={() => setTab(COMMENTS)}
            >
               {titleCase(COMMENTS)} {comments && tab !== COMMENTS ? `(${comments.length})` : ''}
            </div>
            <div
               style={getStyle(PURCHASES)}
               onClick={() => setTab(PURCHASES)}
            >
               {titleCase(PURCHASES)} {orders && tab !== PURCHASES ? `(${associatedOrders.length})` : ''}
            </div>
         </div>

         {
            tab === REVIEWS && reviews &&
            <div className={styles.content}>
               {reviews.length === 0 && <div>There is no reviews</div>}
               {reviews.length > 0 &&
                  <div>
                     {`There ${reviews.length > 1 ? 'are' : 'is'} ${reviews.length} review${reviews.length > 1 ? 's' : ''}`}
                  </div>
               }
               <br />
               {
                  reviews.map(review => {
                     const product = find<Product>(propEq('_id', review._productId), products)
                     return (
                        <div key={review._id} className={styles.review}>
                           <div>
                              <div className={styles.score}><span><AiFillStar /></span>&nbsp;&nbsp;<span>{review.score}</span></div>
                              <span className={styles.mainInfo1}>{review.heading}</span>
                              <span className={styles.mainInfo2}>{review.text}</span>
                              <span className={styles.mainInfo3}>{review.dateTime.toLocaleString()}</span>
                           </div>
                           <div>
                              <img alt='Image' src={product.images[0]} />
                              <div>{product.name}</div>
                           </div>
                           <div onClick={() => setCurrentReview(review)}><RiDeleteBin6Line /></div>
                        </div>
                     )
                  })
               }
            </div>
         }

         {
            tab === COMMENTS && comments &&
            <div className={styles.content}>
               {comments.length === 0 && <div>There is no comments</div>}
               {comments.length > 0 &&
                  <div>
                     {`There ${comments.length > 1 ? 'are' : 'is'} ${comments.length} comment${comments.length > 1 ? 's' : ''}`}
                  </div>
               }
               <br />
               {
                  comments.map(comment => {
                     const article = find<Article>(propEq('_id', comment._articleId), articles)
                     return (
                        <div key={comment._id} className={styles.review}>
                           <div>
                              <span className={styles.mainInfo1}>{comment.body}</span>
                              <span className={styles.mainInfo3}>{comment.dateTime.toLocaleString()}</span>
                           </div>
                           <div>
                              <img alt='Image' src={article.image} />
                              <div>{article.title}</div>
                           </div>
                           <div onClick={() => setCurrentComment(comment)}><RiDeleteBin6Line /></div>
                        </div>
                     )
                  })
               }
            </div>
         }

         {
            tab === PURCHASES && orders &&
            <div className={styles.content}>
               {orders.length === 0 && <div>There is no orders</div>}
               {orders.length > 0 &&
                  <div>
                     {`There ${associatedOrders.length > 1 ? 'are' : 'is'} ${associatedOrders.length} order${associatedOrders.length > 1 ? 's' : ''}`}
                  </div>
               }
               <br />
               {
                  associatedOrders.map(order => {
                     const address = order.shippingAddress
                     let counter = 0
                     return (
                        <div key={order._id} className={styles.purchase}>
                           <div>
                              <div className={styles.amounts}><div>Subtotal</div> <div>$ {order.orderSubtotal.toFixed(2)}</div></div>
                              <div className={styles.amounts}><div>Shipping ({order.orderType})</div> <div>$ {order.shipping.toFixed(2)}</div></div>
                              <div className={styles.amounts}><div>GST</div> <div>$ {order.gst.toFixed(2)}</div></div>
                              <div className={styles.amounts}><strong>Total</strong> <strong>$ {order.orderTotal.toFixed(2)}</strong></div>
                              <div className={styles.amounts}><div>{order.dateTime.toLocaleString()}</div></div>
                           </div>
                           <div>
                              <div><strong>Shipping Address</strong></div>
                              <br/>
                              <div>{address.main}</div>
                              {address.secondary && <div>{address.secondary}</div>}
                              <div>{address.city}, {address.stateProvince}, {address.country}</div>
                              <div>{address.zipCode}</div>
                           </div>
                           <div>
                              {order.productsList.map(item => {
                                 counter += item.subtotal
                                 return <div className={styles.amounts}><div>{item.quantity} x {item.name}</div> <div>$ {item.subtotal.toFixed(2)}</div></div>
                              })}
                              <div className={styles.amounts}><strong>Subtotal:</strong> <strong>$ {counter.toFixed(2)}</strong></div>
                           </div>
                           <div onClick={() => setCurrentPurchase(order)}><RiDeleteBin6Line /></div>
                        </div>
                     )
                  })
               }
            </div>
         }

         <Dialog
            name='CONFIRM_DELETE_USER_REVIEW'
            message='Are you sure you want to delete this review?'
            dialogType='warning'
            buttonsOptions={[
               {
                  label: 'CANCEL',
                  clickHandler: () => {
                     closeDialog()
                  },
                  secondaryStyle: false
               },
               {
                  label: 'DELETE',
                  clickHandler: async () => {
                     const prodId = find(propEq('_id', currentReview._productId), products)._id
                     closeDialog()
                     await firestore.collection(`products/${prodId}/reviews`).doc(currentReview._id).delete()
                     setCurrentReview(null)
                  },
                  secondaryStyle: true
               }
            ]}
         />

         <Dialog
            name='CONFIRM_DELETE_USER_COMMENT'
            message='Are you sure you want to delete this comment?'
            dialogType='warning'
            buttonsOptions={[
               {
                  label: 'CANCEL',
                  clickHandler: () => {
                     closeDialog()
                  },
                  secondaryStyle: false
               },
               {
                  label: 'DELETE',
                  clickHandler: async () => {
                     const artId = find(propEq('_id', currentComment._articleId), articles)._id
                     closeDialog()
                     await firestore.collection(`articles/${artId}/comments`).doc(currentComment._id).delete()
                     setCurrentComment(null)
                  },
                  secondaryStyle: true
               }
            ]}
         />

         <Dialog
            name='CONFIRM_DELETE_USER_PURCHASE'
            message='Are you sure you want to delete this order?'
            dialogType='warning'
            buttonsOptions={[
               {
                  label: 'CANCEL',
                  clickHandler: () => {
                     closeDialog()
                  },
                  secondaryStyle: false
               },
               {
                  label: 'DELETE',
                  clickHandler: async () => {
                     const orderId = find(propEq('_id', currentPurchase._id), orders)._id
                     closeDialog()
                     await firestore.doc(`orders/${orderId}`).delete()
                     setCurrentPurchase(null)
                  },
                  secondaryStyle: true
               }
            ]}
         />
      </div>
   )
}

export default UserDetails