import clsx from 'clsx'
import React from 'react'
import { Order } from '../../../interfaces-objects/interfaces'
import styles from '../../../styles/bookshelf/PurchaseConfirmation.module.css'

interface Props {
   readonly order: Order
}

const PurchaseConfirmation: React.FC<Props> = ({ order }) => {

   function getSortedProducts(op: 'desc' | 'asc') {
      const { productsList } = order
      return productsList.sort((a, b) => {
         if (op === 'desc') return a.name > b.name ? -1 : 1
         else return a.name > b.name ? 1 : -1
      })
   }

   return (
      <>
         <div className={styles.confirmPurchaseContainer}>
            <div className={styles.confirmPurchaseMessage}>
               <h1>Thank you, {order.customerName.firstName}</h1>
               <p>Your order was received! We are going to prepare it and ship it to you as soon as possible.</p>
            </div>

            <div className={styles.confirmPurchaseDetails}>
               <div>
                  <div className={styles.headerRow}>
                     <div className={styles.headerData}><b>Qty</b></div>
                     <div className={clsx(styles.headerData, styles.headerDataMiddle)}><b>Title</b></div>
                     <div className={styles.headerData}><b>Subtotal</b></div>
                  </div>
               </div>

               <div>
                  {
                     getSortedProducts('asc').map((item, idx) => (
                        <div key={`${idx}-${item.name}`} className={styles.bodyRow}>
                           <div className={styles.bodyData}>{item.quantity}</div>
                           <div className={clsx(styles.bodyData, styles.bodyDataMiddle)}>{item.name}</div>
                           <div className={styles.bodyData}>$ {item.subtotal.toFixed(2)}</div>
                        </div>
                     ))
                  }
                  <div className={styles.bodyRow}>
                     <div className={styles.bodyData}></div>
                     <div className={clsx(styles.bodyData, styles.bodyDataMiddle)}></div>
                     <div className={styles.bodyData}><b>$ {order.orderSubtotal.toFixed(2)}</b></div>
                  </div>
               </div>

               <div>
                  <div className={clsx(styles.headerRow, styles.footerRow)}>
                     <div></div>
                     <div>Shipping fee:</div>
                     <div>$ {order.shipping.toFixed(2)}</div>
                  </div>
                  <div className={clsx(styles.headerRow, styles.footerRow)}>
                     <div></div>
                     <div>GST:</div>
                     <div>$ {order.gst.toFixed(2)}</div>
                  </div>
                  <div className={clsx(styles.headerRow, styles.footerRow)}>
                     <div></div>
                     <div>Total:</div>
                     <div>$ {order.orderTotal.toFixed(2)}</div>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}

export default PurchaseConfirmation
