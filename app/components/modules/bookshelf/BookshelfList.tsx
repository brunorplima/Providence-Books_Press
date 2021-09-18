import React from 'react';
import { BookshelfItem } from '../../../interfaces-objects/interfaces';
import BookshelfControllers from './BookshelfControllers';
import BookshelfListItem from './BookshelfListItem';
import styles from '../../../styles/bookshelf/BookshelfList.module.css';
import { useDispatch } from 'react-redux';
import LinkLoading from '../../elements/link-loading/LinkLoading';

interface Props {
   readonly items: BookshelfItem[];
   readonly setItemCheck: (id: string) => void;
   readonly increaseQuantity: (id: string) => void;
   readonly decreaseQuantity: (id: string) => void;
}

const BookshelfList: React.FC<Props> = ({ items, setItemCheck, increaseQuantity, decreaseQuantity }) => {

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
                                 increaseQuantity={increaseQuantity}
                                 decreaseQuantity={decreaseQuantity}
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
                     <LinkLoading href='/bookstore' className={styles.link}>
                        VISIT OUR BOOKSTORE
                     </LinkLoading>
                  </div>
               </div>
         }
      </div>
   )
}

export default BookshelfList;
