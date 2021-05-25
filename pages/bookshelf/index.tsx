import React, { Component } from 'react'
import BookshelfList from '../../app/components/modules/bookshelf/BookshelfList';
import OrderSummary from '../../app/components/modules/bookshelf/OrderSummary';
import styles from '../../app/styles/bookshelf/Bookshelf.module.css'
import { connect } from 'react-redux'
import { BookshelfItem } from '../../app/interfaces-objects/interfaces';
import { store } from '../../app/redux/store/store';
import { createChangeCheckAction, createDecreaseQuantityAction, createIncreaseQuantityAction } from '../../app/redux/actions/bookshelfItemActions';
import createLoadingAction from '../../app/redux/actions/loadingAction';


interface Props {
   bookshelf: BookshelfItem[]
}

export class Bookshelf extends Component<Props> {

   constructor(props) {
      super(props);
      this.setItemCheck = this.setItemCheck.bind(this);
      this.increaseQuantity = this.increaseQuantity.bind(this);
      this.decreaseQuantity = this.decreaseQuantity.bind(this);
   }

   componentDidMount() {
      store.dispatch(createLoadingAction(false));
   }

   componentDidUpdate() {
      if (store.getState().isLoading) {
         store.dispatch(createLoadingAction(false));
      }
   }


   setItemCheck(id: string) {
      store.dispatch(createChangeCheckAction(id));
   }

   increaseQuantity(id: string) {
      store.dispatch(createIncreaseQuantityAction(id));
   }

   decreaseQuantity(id: string) {
      store.dispatch(createDecreaseQuantityAction(id));
   }

   getItemsSubtotal() {
      const bookshelfList: BookshelfItem[] = store.getState().bookshelf;
      const subtotal = bookshelfList.reduce((a, b) => a + (b.price * b.quantity), 0);
      return subtotal;
   }

   getShippingFee() {
      return this.props.bookshelf.length ? 12 : 0;
   }

   getGST() {
      const subtotal = this.getItemsSubtotal() + this.getShippingFee();
      const gst = subtotal * 0.05;
      return gst;
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
                  increaseQuantity={this.increaseQuantity}
                  decreaseQuantity={this.decreaseQuantity} 
               />

               <OrderSummary
                  subtotal={this.getItemsSubtotal()}
                  shippingFee={this.getShippingFee()}
                  gst={this.getGST()}
               />
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
