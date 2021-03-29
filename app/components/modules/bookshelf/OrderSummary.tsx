import React from 'react'
import styles from '../../../styles/bookshelf/OrderSummary.module.css'

interface Props {

}

const OrderSummary: React.FC<Props> = ({ }) => {
   return (
      <div className={styles.container}>
         <h2 className={styles.heading}>Order Summary</h2>

         <div className={styles.summary}>
            <div className={styles.summaryBetween}>
               <div>SUBTOTAL</div>
               <div>$ 514.11</div>
            </div>

            <div className={styles.summaryBetween}>
               <div>SHIPPING FEE </div>
               <div>$ 18.00</div>
            </div>

            <div className={styles.summaryEnd}>
               <div>$ 532.11</div>
            </div>

            <div className={styles.summaryBetween}>
               <div>GST</div>
               <div>$ 26.61</div>
            </div>

            <div className={`${styles.summaryBetween} ${styles.summaryTotal}`}>
               <div>TOTAL</div>
               <div>$ 558.72</div>
            </div>
         </div>
      </div>
   )
}

export default OrderSummary
