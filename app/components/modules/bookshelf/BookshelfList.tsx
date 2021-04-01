import React from 'react'
import { BookshelfItem } from '../../../interfaces-objects/interfaces'
import BookshelfControllers from './BookshelfControllers'
import BookshelfListItem from './BookshelfListItem'
import styles from '../../../styles/bookshelf/BookshelfList.module.css'
import Link from 'next/link'

interface Props {
   items: BookshelfItem[],
   setItemCheck: (isChecked: boolean) => void,
   setItemQuantity: (quantity: number) => void,
}

const BookshelfList: React.FC<Props> = ({ items, setItemCheck, setItemQuantity }) => {
   return (
      <div className={styles.container}>
         {
            items.length ?
               <div>
                  <div className={styles.list}>
                     {
                        items.map((item: BookshelfItem, idx) => {
                           return (
                              <BookshelfListItem 
                                 key={item.id}
                                 item={item}
                                 setItemCheck={setItemCheck}
                                 setItemQuantity={setItemQuantity}
                                 evenItem={(idx + 1) % 2 === 0 ? true : undefined}
                              />
                           )
                        })
                     }
                  </div>

                  <div>
                     <BookshelfControllers bookshelfList={items} />
                  </div>
               </div>
               :
               <div className={styles.emptyBookshelf}>
                  <div><img src='/bookshelf/empty-bookshelf-256px.png' alt='Empty bookshelf'/></div>
                  <div className={styles.text}>You bookshelf is empty</div>
                  <div>
                     <Link href='/bookstore'>
                        <a className={styles.link}>VISIT OUR BOOKSTORE</a>
                     </Link>
                  </div>
               </div>
         }
      </div>
   )
}

export default BookshelfList
