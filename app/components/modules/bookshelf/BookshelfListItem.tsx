import React from 'react'
import { BookshelfItem } from '../../../interfaces-objects/interfaces'
import BookshelfItemQuantity from '../../elements/bookshelf-item-qty/BookshelfItemQuantity'
import ProductType from '../../elements/product-type/ProductType'
import styles from '../../../styles/bookshelf/BookshelfListItem.module.css'
import Link from 'next/link'

interface Props {
   item: BookshelfItem,
   setItemCheck: (isChecked: boolean) => void,
   setItemQuantity: (quantity: number) => void,
   evenItem?: boolean
}

const BookshelfListItem: React.FC<Props> = ({ item, setItemCheck, setItemQuantity, evenItem }) => {
   return (
      <div className={`${styles.container} ${evenItem && styles.colouredBackground}`}>
         <div className={styles.productInfo}>
            <div className={styles.checkbox}>
               <input
                  type='checkbox'
                  checked={item.isChecked}
                  onChange={() => setItemCheck(!item.isChecked)}
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
                     <h3 className={styles.title}>{item.name}</h3>
                     <div className={styles.subtitle}>{item.subtitle}</div>
                  </a>
               </Link>
               {item.authors && <div><span className={styles.bold}>BY:</span> {item.authors}</div>}
               <div></div>
               {item.coverType && <div>{item.coverType}</div>}
               {item.fileExtensions && <div>{item.fileExtensions.join(', ')}</div>}
            </div>
         </div>

         <div className={styles.productPriceQuantity}>
            <div className={`${styles.price} ${evenItem && styles.lightColor}`}>
               $ {item.price}
            </div>

            <div className={styles.quantity}>
               <BookshelfItemQuantity quantity={item.quantity} setQuantity={setItemQuantity} evenItem={evenItem} />
            </div>

            <div className={`${styles.subtotal} ${evenItem && styles.lightColor}`}>
               $ {(item.quantity * item.price).toFixed(2)}
            </div>
         </div>
      </div>
   )
}

export default BookshelfListItem
