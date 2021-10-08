import React, { useState } from 'react'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'
import { ProductItem } from '../../../interfaces-objects/interfaces'
import { getFromProducts } from '../../../util/productModelHelper'
import listStyles from '../../../styles/admin-user/AccountList.module.css'
import styles from '../../../styles/admin-user/OrderDetailsTable.module.css'
import clsx from 'clsx'

interface OrderDetailsTableDataProps {
   readonly items: ProductItem[]
}

const OrderDetailsTable: React.FC<OrderDetailsTableDataProps> = ({ items }) => {
   const [isOrderDetailsHidden, setIsOrderDetailsHidden] = useState(true)
   return (
      <>
         <div
            className={clsx(styles.orderDetails, isOrderDetailsHidden ? styles.closedOrderDetails : styles.openedOrderDetails)}
            style={{ maxWidth: '350px' }}
         >
            {
               items.map(item => {
                  const product = getFromProducts(item.id)
                  if (isOrderDetailsHidden) return null
                  return (
                     <div key={item.id}>
                        <div className={listStyles.row}>
                           <div className={listStyles.data} style={{ maxWidth: 40 }}>
                              <img className={styles.productImage} src={product.images[0]} alt={product.name} />
                           </div>

                           <div className={listStyles.data} style={{ maxWidth: 30 }}>
                              <div>Qty</div>
                              <div>{item.quantity}</div>
                           </div>

                           <div className={listStyles.data}>
                              <div>Price</div>
                              <div>${item.price.toFixed(2)}</div>
                           </div>

                           <div className={listStyles.data}>
                              <div>Subtotal</div>
                              <div>${item.subtotal.toFixed(2)}</div>
                           </div>
                        </div>
                     </div>
                  )
               })
            }
         </div>

         <div className={listStyles.row}>
            <div onClick={() => setIsOrderDetailsHidden(!isOrderDetailsHidden)} className={styles.showOrderDetails}>
               <div>{isOrderDetailsHidden ? 'Show' : 'Hide'} purchase details</div>
               <div>{isOrderDetailsHidden ? <BiChevronDown fontSize={20} /> : <BiChevronUp fontSize={20} />}</div>
            </div>
         </div>
      </>
   )
}


export default OrderDetailsTable
