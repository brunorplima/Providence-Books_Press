import React, { createRef, useState } from 'react'
import { Order } from '../../../interfaces-objects/interfaces';
import splitListInPages from '../../../util/splitListInPages';
import Box from './Box';
import ListItem from './ListItem';
import ListPagination from './ListPagination';
import ListSearch from './ListSearch';
import overviewStyles from '../../../styles/admin-user/BoxContent.module.css'
import styles from '../../../styles/admin-user/OrdersOverview.module.css'
import withListState, { ListWithState } from './withListState';
import firebase from '../../../firebase/firebase'
import clsx from 'clsx';
import { deleteOrder } from '../../../firebase/delete';
import { titleCase } from '../../../util/stringHelper';

interface TimestampOrder {
   readonly dateTime: firebase.firestore.Timestamp
   readonly dueDate: firebase.firestore.Timestamp
}

interface SortType {
   key: string,
   order: SortOrder
}

type SortOrder = 'asc' | 'desc'

const OrdersOverview: React.FC<ListWithState> = ({
   setItemToUpdate,
   list,
   listPageMax,
   decreasePage,
   increasePage,
   pagination,
   search,
   setSearch,
   toFirstPage,
   toLastPage
}) => {
   const [sortType, setSortType] = useState<SortType>({ key: 'dateTime', order: 'desc' })

   const container = createRef<HTMLDivElement>();
   const orders = list.map((item: Order) => {
      return { ...item, dateTime: new Date(item.dateTime), dueDate: new Date(item.dueDate) }
   })

   function sortedList(list: Order[], orderType: SortOrder, key: string) {
      return list.slice().sort((a, b) => {
         if (orderType === 'asc')
            return a[key] - b[key]
         else return b[key] - a[key]
      })
   }

   function filterListByName(list: Order[]) {
      return list.filter(val => {
         if (search) return new RegExp(search, 'i').test(getDisplayName(val.customerName))
         return true
      })
   }

   function getDisplayName(customerName: { firstName: string, lastName: string }) {
      const { firstName, lastName } = customerName
      return `${firstName} ${lastName}`
   }

   function buildList() {
      let processedOrders = filterListByName(orders)
      processedOrders = filterListByName(processedOrders)
      processedOrders = sortedList(processedOrders, sortType.order, sortType.key)
      return processedOrders
   }

   return (
      <>
         <div ref={container}>
            <Box paddingVertical title='ORDERS'>
               <div className={overviewStyles.listHeader}>
                  <ListSearch search={search} setSearch={setSearch} />
               </div>

               <div className={styles.sortByKey}>
                  <div><h4>Sort by data</h4></div>
                  <div>
                     <div>
                        <label htmlFor='sort-by-total-name'>Name</label>
                        <input
                           id='sort-by-total-name'
                           name='sort-by-data'
                           type='radio'
                           onChange={() => setSortType({ ...sortType, key: 'customerName' })}
                           checked={sortType.key === 'customerName'}
                        />
                     </div>
                     &nbsp;
                     &nbsp;
                     &nbsp;
                     <div>
                        <label htmlFor='sort-by-total-price'>Total</label>
                        <input
                           id='sort-by-total-price'
                           name='sort-by-data'
                           type='radio'
                           onChange={() => setSortType({ ...sortType, key: 'orderTotal' })}
                           checked={sortType.key === 'orderTotal'}
                        />
                     </div>
                     &nbsp;
                     &nbsp;
                     &nbsp;
                     <div>
                        <label htmlFor='sort-by-total-issued-date'>Issued Date</label>
                        <input
                           id='sort-by-total-issued-date'
                           name='sort-by-data'
                           type='radio'
                           onChange={() => setSortType({ ...sortType, key: 'dateTime' })}
                           checked={sortType.key === 'dateTime'}
                        />
                     </div>
                     &nbsp;
                     &nbsp;
                     &nbsp;
                     <div>
                        <label htmlFor='sort-by-total-due-date'>Due Date</label>
                        <input
                           id='sort-by-total-due-date'
                           name='sort-by-data'
                           type='radio'
                           onChange={() => setSortType({ ...sortType, key: 'dueDate' })}
                           checked={sortType.key === 'dueDate'}
                        />
                     </div>
                     &nbsp;
                     &nbsp;
                     &nbsp;
                     <div>
                        <label htmlFor='sort-by-total-status'>Status</label>
                        <input
                           id='sort-by-total-status'
                           name='sort-by-data'
                           type='radio'
                           onChange={() => setSortType({ ...sortType, key: 'paymentStatus' })}
                           checked={sortType.key === 'paymentStatus'}
                        />
                     </div>
                  </div>
               </div>

               <div className={styles.sortByOrder}>
                  <div><h4>Sort order</h4></div>
                  <div>
                     <div>
                        <label htmlFor='sort-by-order-asc'>Ascendent</label>
                        <input
                           id='sort-by-order-asc'
                           name='sort-order'
                           type='radio'
                           onChange={() => setSortType({ ...sortType, order: 'asc' })}
                           checked={sortType.order === 'asc'}
                        />
                     </div>
                     &nbsp;
                     &nbsp;
                     &nbsp;
                     <div>
                        <label htmlFor='sort-by-order-desc'>Descendent</label>
                        <input
                           id='sort-by-order-desc'
                           name='sort-order'
                           type='radio'
                           onChange={() => setSortType({ ...sortType, order: 'desc' })}
                           checked={sortType.order === 'desc'}
                        />
                     </div>
                  </div>
               </div>

               <div className={overviewStyles.upperPagination}>
                  <ListPagination
                     {...{ pagination, listPageMax, increasePage, decreasePage, toFirstPage, toLastPage }}
                     boxContainer={container}
                     listToRender={buildList()}
                  />
               </div>

               <div className={overviewStyles.list}>
                  {
                     splitListInPages<Order>(buildList(), pagination, listPageMax)
                        .map((ord, idx) => {
                           const order = (ord as Order);
                           return (
                              <ListItem
                                 key={order._id}
                                 itemId={order._id}
                                 item={order}
                                 onDelete={() => deleteOrder(order._id)}
                                 itemType='order'
                                 isFirstItem={!idx}
                                 setItemToUpdate={setItemToUpdate}
                              >

                                 <div className={clsx('LI-flex2', styles.column)}>
                                    <div><strong>{getDisplayName(order.customerName)}</strong></div>
                                    <div>Titles: {order.productsList.length}</div>
                                    <div>
                                       # of Products: {order.productsList.reduce((a, b) => a += b.quantity, 0)}
                                    </div>
                                 </div>

                                 <div className={clsx('LI-flex2', styles.column)}>
                                    <div>Subtotal: ${order.orderSubtotal.toFixed(2)}</div>
                                    <div>Shipping: ${order.shipping.toFixed(2)}</div>
                                    <div>GST: ${order.gst.toFixed(2)}</div>
                                    <div><strong>Total: ${order.orderTotal.toFixed(2)}</strong></div>
                                 </div>

                                 <div className={clsx('LI-flex2', styles.column)}>
                                    <div>Shipping Address</div>
                                    <div>{order.shippingAddress.main}</div>
                                    {
                                       order.shippingAddress.secondary &&
                                       <div>{order.shippingAddress.secondary}</div>
                                    }
                                    <div>
                                       {order.shippingAddress.city},
                                       {order.shippingAddress.stateProvince}
                                    </div>
                                    <div>
                                       {order.shippingAddress.country},
                                       {order.shippingAddress.zipCode}
                                    </div>
                                 </div>

                                 <div className={clsx('LI-flex3', styles.column)}>
                                    <div>Order Type: {titleCase(order.orderType)}</div>
                                    <div>Status: {order.paymentStatus}</div>
                                    <div>Issue Date: {(order.dateTime as Date).toUTCString()}</div>
                                    <div>
                                       Paid on: {order.dueDate ? (order.dueDate as Date).toUTCString() : '--'}
                                    </div>
                                 </div>
                              </ListItem>
                           )
                        })
                  }
               </div>

               <div className={overviewStyles.listFooter}>
                  <div>There are {buildList().length} orders</div>
                  <ListPagination
                     boxContainer={container}
                     listToRender={buildList()}
                     pagination={pagination}
                     listPageMax={listPageMax}
                     increasePage={increasePage}
                     decreasePage={decreasePage}
                     toFirstPage={toFirstPage}
                     toLastPage={toLastPage}
                     doesScroll
                  />
               </div>
            </Box>
         </div>
      </>
   )
}

export default withListState<ListWithState, Order>(OrdersOverview)
