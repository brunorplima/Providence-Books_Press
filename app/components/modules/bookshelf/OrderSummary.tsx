import React from 'react'
import styles from '../../../styles/bookshelf/OrderSummary.module.css'

interface Props {
   subtotal: number,
   shippingFee: number,
   gst: number,
}

const OrderSummary: React.FC<Props> = ({ subtotal, shippingFee, gst }) => {
   return (
      <div className={styles.container}>
         <h2 className={styles.heading}>Order Summary</h2>

         <div className={styles.summary}>
            <div className={styles.summaryBetween}>
               <div>SUBTOTAL</div>
               <div>$ {subtotal.toFixed(2)}</div>
            </div>

            <div className={styles.summaryBetween}>
               <div>SHIPPING FEE </div>
               <div>$ {shippingFee.toFixed(2)}</div>
            </div>

            <div className={styles.summaryEnd}>
               <div>$ {(subtotal + shippingFee).toFixed(2)}</div>
            </div>

            <div className={styles.summaryBetween}>
               <div>GST</div>
               <div>$ {gst.toFixed(2)}</div>
            </div>

            <div className={`${styles.summaryBetween} ${styles.summaryTotal}`}>
               <div>TOTAL</div>
               <div>$ {(subtotal + shippingFee + gst).toFixed(2)}</div>
            </div>
         </div>
      </div>
   )
}

export default OrderSummary
