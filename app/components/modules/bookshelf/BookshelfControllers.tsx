import React from 'react'
import Button, { ButtonProps } from '../../elements/button/Button'
import styles from '../../../styles/bookshelf/BookshelfControllers.module.css'
import { store } from '../../../redux/store/store'
import { BookshelfItem } from '../../../interfaces-objects/interfaces'
import { createRemoveAllFromBookshelfAction, createRemoveSomeFromBookshelfAction } from '../../../redux/actions/bookshelfActions'
import Dialog from '../dialog/Dialog'
import { EMPTY_SHELF } from '../dialog/dialogNames'
import { closeDialog, openDialog } from '../../../redux/actions/openedDialogNameAction'

interface Props {
   bookshelfList: BookshelfItem[]
}

class BookshelfControllers extends React.Component<Props> {

   constructor(props) {
      super(props);

      this.removeItems = this.removeItems.bind(this);
      this.emptyShelf = this.emptyShelf.bind(this);
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

   getDialogButtonsOption() {
      const options: ButtonProps[] = [
         {
            label: 'PROCEED',
            clickHandler: () => {
               this.emptyShelf();
               closeDialog();
            },
            secondaryStyle: true
         },
         {
            label: 'CANCEL',
            clickHandler: closeDialog
         }
      ];
      return options;
   }

   render() {
      return (
         <div className={styles.container}>
            <div>
               <Button label='EMPTY SHELF' clickHandler={() => openDialog(EMPTY_SHELF)} style={{ width: 130 }} />
            </div>

            <div>
               <Button label='DELETE' clickHandler={this.removeItems} style={{ width: 130 }} />
            </div>

            <Dialog
               name={EMPTY_SHELF}
               buttonsOptions={this.getDialogButtonsOption()}
               message='This action will remove all items from your bookshelf. Are you sure you want to proceed?'
               dialogType='warning'
            />
         </div>
      )
   }
}

export default BookshelfControllers
