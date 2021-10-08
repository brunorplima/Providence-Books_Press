import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Article, User } from '../../../interfaces-objects/interfaces'
import Product from '../../../interfaces-objects/Product'
import { ReduxState } from '../../../redux/reducers/rootReducer'
import { useAccountProvider } from '../../contexts/AccountProvider'
import AccountList from './AccountList'
import Box from './Box'
import UserGreeting from './UserGreeting'
import styles from '../../../styles/admin-user/UserDashboard.module.css'
import listStyles from '../../../styles/admin-user/AccountList.module.css'
import Link from 'next/link'
import { RiDeleteBin6Line, RiEdit2Line } from 'react-icons/ri'
import clsx from 'clsx'
import { deleteAny } from '../../../firebase/delete'
import Dialog from '../dialog/Dialog'
import { closeDialog, openDialog } from '../../../redux/actions/openedDialogNameAction'
import useScreenWidth from '../../../util/useScreenWidth'
import ReviewItem from './ReviewItem'
import OrderDetailsTable from './OrderDetailsTable'
import CommentItem from './CommentItem'

interface Props {
   readonly user: User
   readonly products?: Product[]
   readonly articles?: Article[]
}

const UserDashboard: React.FC<Props> = ({ user, products, articles }) => {
   const {
      myReviews,
      listenForReviews,
      myComments,
      listenForComments,
      myOrders,
      listenForOrders
   } = useAccountProvider()
   const screenWidth = useScreenWidth()

   useEffect(() => {
      if (myReviews && !myReviews.length) listenForReviews()
      if (myComments && !myComments.length) listenForComments()
      if (myOrders && !myOrders.length) listenForOrders()
   }, [])

   return (
      <div>
         <UserGreeting userName={user?.firstName} />

         <Box title='YOUR ARTICLE COMMENTS' paddingAll>
            {
               !myComments?.length ? <p>You currently have no comments</p> : null
            }

            <AccountList>
               {
                  myComments?.map(comment => <CommentItem key={comment._id + comment._articleId} {...{ comment }} />)
               }
            </AccountList>
         </Box>

         <Box title='YOUR PRODUCT REVIEWS' paddingAll>
            {
               !myReviews?.length ? <p>You currently have no reviews</p> : null
            }
            <AccountList>
               {
                  myReviews?.map(review => <ReviewItem key={review._id + review._productId} {...{ review }} />)
               }
            </AccountList>
         </Box>

         <Box title='YOUR PURCHASES' paddingAll>
            {
               !myOrders?.length ? <p>You currently have no known orders</p> : null
            }

            <AccountList>
               {
                  myOrders?.map(order => {
                     const totalItems = order.productsList.reduce((count, prod) => count + prod.quantity, 0)
                     return (
                        <div
                           key={order._id}
                           className={listStyles.rowContainer}
                           style={{
                              color: 'var(--mainGray)'
                           }}
                        >
                           <div className={listStyles.row}>

                              <div className={listStyles.data}>
                                 <div>{totalItems} Items</div>
                              </div>

                              <div className={listStyles.data} style={screenWidth < 600 ? { textAlign: 'right' } : {}}>
                                 <div>{new Date(order.dateTime).toLocaleDateString()}</div>
                              </div>

                              {
                                 screenWidth >= 600 &&
                                 <>
                                    <div className={listStyles.data}>
                                       <div>Subtotal:</div>
                                       <div>${order.orderSubtotal.toFixed(2)}</div>
                                    </div>

                                    <div className={listStyles.data}>
                                       <div>Shipping:</div>
                                       <div>${order.shipping.toFixed(2)}</div>
                                    </div>

                                    <div className={listStyles.data}>
                                       <div>GST:</div>
                                       <div>${order.gst.toFixed(2)}</div>
                                    </div>

                                    <div className={listStyles.data}>
                                       <strong>Total:</strong>
                                       <strong>${order.orderTotal.toFixed(2)}</strong>
                                    </div>
                                 </>
                              }
                           </div>

                           {
                              screenWidth < 600 &&
                              <div className={listStyles.row}>
                                 <div className={listStyles.data}>
                                    <div>Subtotal:</div>
                                    <div>${order.orderSubtotal.toFixed(2)}</div>
                                 </div>

                                 <div className={listStyles.data}>
                                    <div>Shipping:</div>
                                    <div>${order.shipping.toFixed(2)}</div>
                                 </div>

                                 <div className={listStyles.data}>
                                    <div>GST:</div>
                                    <div>${order.gst.toFixed(2)}</div>
                                 </div>

                                 <div className={listStyles.data}>
                                    <strong>Total:</strong>
                                    <strong>${order.orderTotal.toFixed(2)}</strong>
                                 </div>
                              </div>
                           }

                           <div className={listStyles.row}>
                              <div className={listStyles.data}>
                                 <div className={styles.smallerFont}>Pay Status:</div>
                                 <div>{order.paymentStatus}</div>
                              </div>

                              {
                                 order.paymentStatus === 'Not paid' &&
                                 <div className={listStyles.data}>
                                    <div className={styles.smallerFont}>Pay Due Date:</div>
                                    <div>{new Date(order.dueDate).toLocaleDateString()}</div>
                                 </div>
                              }

                              <div className={listStyles.data} style={{ minWidth: '150px' }}>
                                 <div className={styles.smallerFont}>Shipping Address:</div>
                                 <div>
                                    {order.shippingAddress.main},
                                    &nbsp;
                                    {order.shippingAddress.secondary && order.shippingAddress.secondary + ', '}
                                    {order.shippingAddress.city}
                                 </div>
                              </div>

                              <div className={listStyles.data}>
                                 <div className={styles.smallerFont}>State/Province &amp; country:</div>
                                 <div>
                                    {order.shippingAddress.stateProvince},
                                    &nbsp;
                                    {order.shippingAddress.country}
                                 </div>
                              </div>

                              <div className={listStyles.data}>
                                 <div className={styles.smallerFont}>Zip Code:</div>
                                 <div>{order.shippingAddress.zipCode}</div>
                              </div>
                           </div>

                           <OrderDetailsTable items={order.productsList} />
                        </div>
                     )
                  })
               }
            </AccountList>
         </Box>
      </div >
   )
}

const mapStateToProps = ({ products, articles }: ReduxState) => ({ products, articles })

export default connect(mapStateToProps)(UserDashboard)


