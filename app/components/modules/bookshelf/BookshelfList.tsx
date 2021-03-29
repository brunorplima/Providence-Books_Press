import React from 'react'
import { BookshelfItem } from '../../../interfaces-objects/interfaces'
import BookshelfControllers from './BookshelfControllers'
import BookshelfListItem from './BookshelfListItem'
import styles from '../../../styles/bookshelf/BookshelfList.module.css'

interface Props {
   items: BookshelfItem[],
   removeItems: () => void,
   emptyShelf: () => void,
   setItemCheck: (isChecked: boolean) => void,
   setItemQuantity: (quantity: number) => void,
}

const BookshelfList: React.FC<Props> = ({ items, setItemCheck, setItemQuantity, removeItems, emptyShelf }) => {
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
                     <BookshelfControllers emptyShelf={emptyShelf} removeItems={removeItems} />
                  </div>
               </div>
               :
               <div>
                  The bookshelf is empty!
               </div>
         }
      </div>
   )
}

export default BookshelfList
