import React, { Component } from 'react'
import BookshelfList from '../../app/components/modules/bookshelf/BookshelfList';
import OrderSummary from '../../app/components/modules/bookshelf/OrderSummary';
import { BookshelfItem } from '../../app/interfaces-objects/interfaces';
import styles from '../../app/styles/bookshelf/Bookshelf.module.css'

interface Props {

}

const img = 'https://www.bhacademic.com/wp-content/themes/useful-group/assets/svgs/placeholder-book.svg'
const items: BookshelfItem[] = [
   {id:'15685' ,isChecked: true, authors: 'ALCOCK, DEBORAH', image: img, name: 'AWESOME PLASTIC CHEESE', subtitle: 'DOLORUM MAGNI ILLUM', price: 89.76, quantity: 3, type: 'BOOK', weight: 0.560, coverType: 'PAPERBACK'},
   {id:'80358' ,isChecked: false, authors: 'VAN DER JAGT, A.', image: img, name: 'HANDCRAFTED SOFT TOWELS', subtitle: 'FACILIS CORRUPTI DESERUNT ISTE', price: 126.75, quantity: 1, type: 'E-BOOK', fileExtensions: ['MOBI']},
   {id:'28178' ,isChecked: true, authors: 'SCHOUTEN, ANDREW', image: img, name: 'UNBRANDED STEEL CHAIR', price: 118.08, quantity: 1, type: 'BOOK', weight: 0.330, coverType: 'HARDCOVER'},
]

export class Bookshelf extends Component {

   constructor(props) {
      super(props);

      this.removeItems = this.removeItems.bind(this);
      this.emptyShelf = this.emptyShelf.bind(this);
      this.setItemCheck = this.setItemCheck.bind(this);
      this.setItemQuantity = this.setItemQuantity.bind(this);
   }

   
   removeItems() {

   }

   emptyShelf() {

   }


   setItemCheck(isChecked: boolean) {

   }

   setItemQuantity(quantity: number) {

   }


   render() {
      return (
         <div className={styles.container}>
            <div>
               <h1 className={styles.h1}>Bookshelf</h1>
            </div>

            <div className={styles.listOutterContainer}>
               <BookshelfList
                  items={items} 
                  removeItems={this.removeItems}
                  emptyShelf={this.emptyShelf}
                  setItemCheck={this.setItemCheck}
                  setItemQuantity={this.setItemQuantity} 
               />

               <OrderSummary />
            </div>

            <div className={styles.thankMessage}>
               <div>THANK YOU FOR SHOPPING WITH PROVIDENCE BOOKS AND PRESS</div>
            </div>
         </div>
      )
   }
}

export default Bookshelf
