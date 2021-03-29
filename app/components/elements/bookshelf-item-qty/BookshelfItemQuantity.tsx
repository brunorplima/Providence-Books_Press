import React from 'react'
import styles from '../../../styles/elements/BookshelfItemQuantity.module.css'
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai'

interface Props {
   quantity: number,
   setQuantity: (quantity: number) => void,
   evenItem?: boolean
}

const BookshelfItemQuantity: React.FC<Props> = ({ quantity, setQuantity, evenItem }) => {
   return (
      <div className={styles.container}>
         <div className={`${styles.controller} ${evenItem && `${styles.lightColor}`}`}><AiFillPlusCircle /></div>
         <div className={`${styles.quantity} ${evenItem && `${styles.lightColor} ${styles.lightBorder}`}`}>{quantity}</div>
         <div className={`${styles.controller} ${evenItem && `${styles.lightColor}`}`}><AiFillMinusCircle /></div>
      </div>
   )
}

export default BookshelfItemQuantity
