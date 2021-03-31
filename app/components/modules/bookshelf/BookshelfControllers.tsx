import React from 'react'
import Button from '../../elements/button/Button'
import styles from '../../../styles/bookshelf/BookshelfControllers.module.css'
import { store } from '../../../redux/store/store'
import { BookshelfItem } from '../../../interfaces-objects/interfaces'
import { createRemoveAllFromBookshelfAction, createRemoveSomeFromBookshelfAction } from '../../../redux/actions/bookshelfActions'

interface Props {
   bookshelfList: BookshelfItem[]
}

class BookshelfControllers extends React.Component<Props> {

   constructor(props) {
      super(props);

      this.removeItems = this.removeItems.bind(this);
   }

   removeItems() {
      const { bookshelfList } = this.props;
      const checkedItems = bookshelfList.filter(item => item.isChecked);
      
      if (checkedItems.length)
         store.dispatch(createRemoveSomeFromBookshelfAction(checkedItems));
   }

   emptyShelf() {
      store.dispatch(createRemoveAllFromBookshelfAction())
   }

   render() {
      return (
         <div className={styles.container}>
            <div>
               <Button label='EMPTY SHELF' clickHandler={this.emptyShelf} style={{ width: 130 }} />
            </div>

            <div>
               <Button label='DELETE' clickHandler={this.removeItems} style={{ width: 130 }} />
            </div>
         </div>
      )
   }
}

export default BookshelfControllers
