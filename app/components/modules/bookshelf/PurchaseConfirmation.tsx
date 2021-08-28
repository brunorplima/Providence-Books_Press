import clsx from 'clsx'
import React from 'react'
import { Order } from '../../../interfaces-objects/interfaces'
import styles from '../../../styles/bookshelf/Bookshelf.module.css'

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

            <table className={styles.confirmPurchaseDetails}>
               <thead>
                  <tr className={styles.headerRow}>
                     <div className={styles.headerData}><b>Qty</b></div>
                     <div className={clsx(styles.headerData, styles.headerDataMiddle)}><b>Title</b></div>
                     <div className={styles.headerData}><b>Subtotal</b></div>
                  </tr>
               </thead>

               <tbody>
                  {
                     getSortedProducts('asc').map((item, idx) => (
                        <tr key={`${idx}-${item.name}`} className={styles.bodyRow}>
                           <td className={styles.bodyData}>{item.quantity}</td>
                           <td className={clsx(styles.bodyData, styles.bodyDataMiddle)}>{item.name}</td>
                           <td className={styles.bodyData}>$ {item.subtotal.toFixed(2)}</td>
                        </tr>
                     ))
                  }
                  <tr className={styles.bodyRow}>
                     <td className={styles.bodyData}></td>
                     <td className={clsx(styles.bodyData, styles.bodyDataMiddle)}></td>
                     <td className={styles.bodyData}><b>$ {order.orderSubtotal.toFixed(2)}</b></td>
                  </tr>
               </tbody>

               <tfoot>
                  <tr className={clsx(styles.headerRow, styles.footerRow)}>
                     <td></td>
                     <td>Shipping fee:</td>
                     <td>$ {order.shipping.toFixed(2)}</td>
                  </tr>
                  <tr className={clsx(styles.headerRow, styles.footerRow)}>
                     <td></td>
                     <td>GST:</td>
                     <td>$ {order.gst}</td>
                  </tr>
                  <tr className={clsx(styles.headerRow, styles.footerRow)}>
                     <td></td>
                     <td>Total:</td>
                     <td>$ {order.orderTotal.toFixed(2)}</td>
                  </tr>
               </tfoot>
            </table>
         </div>
      </>
   )
}

export default PurchaseConfirmation
