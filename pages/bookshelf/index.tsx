import React, { Component } from 'react'
import BookshelfList from '../../app/components/modules/bookshelf/BookshelfList';
import OrderSummary from '../../app/components/modules/bookshelf/OrderSummary';
import styles from '../../app/styles/bookshelf/Bookshelf.module.css'
import { connect } from 'react-redux'
import { BookshelfItem } from '../../app/interfaces-objects/interfaces';

interface Props {
   bookshelf: BookshelfItem[]
}

export class Bookshelf extends Component<Props> {

   constructor(props) {
      super(props);
      this.setItemCheck = this.setItemCheck.bind(this);
      this.setItemQuantity = this.setItemQuantity.bind(this);
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
                  items={this.props.bookshelf}
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

const mapStateToProps = (state: { bookshelf: any; }) => {
   return {
      bookshelf: state.bookshelf
   }
}


export default connect(mapStateToProps)(Bookshelf)
