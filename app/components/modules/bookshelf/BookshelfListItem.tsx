import React from 'react'
import { BookshelfItem } from '../../../interfaces-objects/interfaces'
import BookshelfItemQuantity from '../../elements/bookshelf-item-qty/BookshelfItemQuantity'
import ProductType from '../../elements/product-type/ProductType'
import styles from '../../../styles/bookshelf/BookshelfListItem.module.css'
import Link from 'next/link'

interface Props {
   item: BookshelfItem,
   setItemCheck: (id: string) => void,
   increaseQuantity: (id: string) => void,
   decreaseQuantity: (id: string) => void,
   evenItem?: boolean
}

const BookshelfListItem: React.FC<Props> = ({ item, setItemCheck, increaseQuantity, decreaseQuantity, evenItem }) => {
   return (
      <div className={`${styles.container} ${evenItem && styles.colouredBackground}`}>
         <div className={styles.productInfo}>
            <div className={styles.checkbox}>
               <input
                  type='checkbox'
                  checked={item.isChecked}
                  onChange={() => setItemCheck(item.id)}
               />
            </div>

            <div className={styles.image}>
               <Link href={`/product/${item.id}`}>
                  <a>
                     <img className={styles.img} src={item.image} alt={`Bookshelf item | ${item.name} ${item.subtitle}`} />
                  </a>
               </Link>
            </div>

            <div className={`${styles.mainInfo} ${evenItem && styles.lightColor}`}>
               <ProductType type={item.type} fontSize={'8pt'} padding={'0 .5rem'} />
               <Link href={`/product/${item.id}`}>
                  <a>
                     <h3 className={styles.title}>{item.name.toUpperCase()}</h3>
                     {item.subtitle && <div className={styles.subtitle}>{item.subtitle.toUpperCase()}</div>}
                  </a>
               </Link>
               {item.authors && <div><span className={styles.bold}>BY:</span> {item.authors.toUpperCase()}</div>}
               <div></div>
               {item.coverType && <div>{item.coverType.toUpperCase()}</div>}
               {item.fileExtensions && <div>{item.fileExtensions.join(', ').toUpperCase()}</div>}
            </div>
         </div>

         <div className={styles.productPriceQuantity}>
            <div className={`${styles.price} ${evenItem && styles.lightColor}`}>
               $ {item.price}
            </div>

            <div className={styles.quantity}>
               <BookshelfItemQuantity
                  itemId={item.id}
                  quantity={item.quantity}
                  increaseQuantity={increaseQuantity}
                  decreaseQuantity={decreaseQuantity}
                  evenItem={evenItem}
               />
            </div>

            <div className={`${styles.subtotal} ${evenItem && styles.lightColor}`}>
               $ {(item.quantity * item.price).toFixed(2)}
            </div>
         </div>
      </div>
   )
}

export default BookshelfListItem
