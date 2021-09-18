import React, { useContext } from 'react'
import { BookshelfItem } from '../../../interfaces-objects/interfaces'
import BookshelfItemQuantity from '../../elements/bookshelf-item-qty/BookshelfItemQuantity'
import ProductType from '../../elements/product-type/ProductType'
import styles from '../../../styles/bookshelf/BookshelfListItem.module.css'
import LinkLoading from '../../elements/link-loading/LinkLoading'
import Dialog from '../dialog/Dialog'
import { closeDialog, openDialog } from '../../../redux/actions/openedDialogNameAction'
import { getFromProducts, isPhysicalProduct } from '../../../util/productModelHelper'
import Book from '../../../interfaces-objects/Book'
import { bookshelfContext } from './context/BookshelfProvider'

interface Props {
   readonly item: BookshelfItem,
   readonly setItemCheck: (id: string) => void,
   readonly increaseQuantity: (id: string) => void,
   readonly decreaseQuantity: (id: string) => void,
   readonly evenItem?: boolean
}

const BookshelfListItem: React.FC<Props> = ({ item, setItemCheck, increaseQuantity, decreaseQuantity, evenItem }) => {
   const { setOverstockMessage } = useContext(bookshelfContext)

   function validateIncrease() {
      const product = getFromProducts(item.id)
      if (isPhysicalProduct(product) && (product as Book).stock <= item.quantity) {
         openDialog('OVER_STOCK')
         setOverstockMessage(true)
         return
      }
      increaseQuantity(item.id)
   }

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
               <LinkLoading href={`/product/${item.id}`}>
                  <img className={styles.img} src={item.image} alt={`Bookshelf item | ${item.name} ${item.subtitle}`} />
               </LinkLoading>
            </div>

            <div className={`${styles.mainInfo} ${evenItem && styles.lightColor}`}>
               <ProductType type={item.type} fontSize={'8pt'} padding={'0 .5rem'} />
               <LinkLoading href={`/product/${item.id}`}>
                  <h3 className={`${styles.title} ${evenItem && styles.whiteHover}`}>{item.name.toUpperCase()}</h3>
                  {
                     item.subtitle && 
                     <div className={`${styles.subtitle} ${evenItem && styles.whiteHover}`}>
                        {item.subtitle.toUpperCase()}
                     </div>
                  }
               </LinkLoading>
               {item.authors && <div><span className={styles.bold}>BY:</span> {item.authors.toUpperCase()}</div>}
               <div></div>
               {item.coverType && <div>{item.coverType.toUpperCase()}</div>}
               {item.fileExtensions && <div>{item.fileExtensions.join(', ').toUpperCase()}</div>}
            </div>
         </div>

         <div className={styles.productPriceQuantity}>
            <div className={`${styles.price} ${evenItem && styles.lightColor}`}>
               $ {item.price.toFixed(2)}
            </div>

            <div className={styles.quantity}>
               <BookshelfItemQuantity
                  itemId={item.id}
                  quantity={item.quantity}
                  increaseQuantity={validateIncrease}
                  decreaseQuantity={decreaseQuantity}
                  evenItem={evenItem}
               />
            </div>

            <div className={`${styles.subtotal} ${evenItem && styles.lightColor}`}>
               $ {(item.quantity * item.price).toFixed(2)}
            </div>
         </div>

         <Dialog
            name='OVER_STOCK'
            message='There is not enough of this product in stock for the quantity requested.'
            buttonsOptions={[{
               label: 'CLOSE',
               secondaryStyle: true,
               clickHandler: closeDialog
            }]}
         />
      </div>
   )
}

export default BookshelfListItem
