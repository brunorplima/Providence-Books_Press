import React from 'react'
import styles from '../../../styles/elements/BookshelfItemQuantity.module.css'
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai'

interface Props {
   itemId: string,
   quantity: number,
   increaseQuantity: (id: string) => void,
   decreaseQuantity: (id: string) => void,
   evenItem?: boolean
}

const BookshelfItemQuantity: React.FC<Props> = ({ itemId, quantity, increaseQuantity, decreaseQuantity, evenItem }) => {
   return (
      <div className={styles.container}>
         <div 
            className={`${styles.controller} ${evenItem && `${styles.lightColor}`}`}
            onClick={() => increaseQuantity(itemId)}
         >
            <AiFillPlusCircle />
         </div>
         
         <div className={`${styles.quantity} ${evenItem && `${styles.lightColor} ${styles.lightBorder}`}`}>{quantity}</div>
         
         <div 
            className={`${styles.controller} ${evenItem && `${styles.lightColor}`}`}
            onClick={() => decreaseQuantity(itemId)}   
         >
            <AiFillMinusCircle />
         </div>
      </div>
   )
}

export default BookshelfItemQuantity
