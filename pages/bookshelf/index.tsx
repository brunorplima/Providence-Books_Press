import React, { Component } from 'react'
import BookshelfList from '../../app/components/modules/bookshelf/BookshelfList';
import OrderSummary from '../../app/components/modules/bookshelf/OrderSummary';
import styles from '../../app/styles/bookshelf/Bookshelf.module.css'
import { connect } from 'react-redux'
import { BookshelfItem, Order } from '../../app/interfaces-objects/interfaces';
import { store } from '../../app/redux/store/store';
import { createChangeCheckAction, createDecreaseQuantityAction, createIncreaseQuantityAction } from '../../app/redux/actions/bookshelfItemActions';
import PayPalCheckout from '../../app/components/modules/paypal-checkout/PayPalCheckout';
import PurchaseConfirmation from '../../app/components/modules/bookshelf/PurchaseConfirmation';


interface Props {
   readonly bookshelf: BookshelfItem[]
}

interface State {
   readonly order: Order
}
export class Bookshelf extends Component<Props, State> {

   constructor(props) {
      super(props);
      this.state = {
         order: null
      }

      this.setItemCheck = this.setItemCheck.bind(this);
      this.increaseQuantity = this.increaseQuantity.bind(this);
      this.decreaseQuantity = this.decreaseQuantity.bind(this);
      this.setOrder = this.setOrder.bind(this)
   }


   setOrder(order: Order) {
      this.setState({ order })
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
      const { bookshelf } = this.props;
      const subtotal = bookshelf.reduce((a, b) => a + (b.price * b.quantity), 0);
      return subtotal;
   }

   getShippingFee() {
      const { bookshelf } = this.props
      const totalWeight = this.sumWeight(bookshelf)
      return bookshelf.length ? this.calculateShippingFee(totalWeight, this.getPhysicalProductsSubtotal()) : 0;
   }

   getGST() {
      const subtotal = this.getItemsSubtotal() + this.getShippingFee();
      const gst = subtotal * 0.05;
      return gst;
   }

   getTotal() {
      return this.getItemsSubtotal() + this.getShippingFee() + this.getGST()
   }

   private sumWeight(list: BookshelfItem[]) {
      return list.reduce((acc, current) => {
         if (current.type === 'Book') return acc + (current.weight * current.quantity)
         return acc
      }, 0)
   }

   private calculateShippingFee(weight: number, subtotal: number) {
      if (weight === 0) return 0
      if (weight <= 0.5) {
         if (weight <= 0.4) return 5.09
         else return 5.47
      } else {
         if (subtotal <= 140) return 14
         else if (subtotal > 140 && subtotal <= 200) return parseFloat((subtotal * 0.1).toFixed(2))
         else if (subtotal > 200 && subtotal <= 300) return parseFloat((subtotal * 0.08).toFixed(2))
         else if (subtotal > 300 && subtotal <= 450) return parseFloat((subtotal * 0.06).toFixed(2))
         else return 0
      }
   }

   private getPhysicalProductsSubtotal() {
      const { bookshelf } = this.props
      return bookshelf.reduce((acc, current) => {
         if (current.type === 'Book') return acc + (current.price * current.quantity)
         return acc
      }, 0)
   }


   render() {
      const { bookshelf } = this.props
      const { order } = this.state
      return (
         <div className={styles.container}>
            <div>
               <h1 className={styles.h1}>Bookshelf</h1>
            </div>

            <div className={styles.listOutterContainer}>
               {
                  !order &&
                  <>
                     <BookshelfList
                        items={bookshelf}
                        setItemCheck={this.setItemCheck}
                        increaseQuantity={this.increaseQuantity}
                        decreaseQuantity={this.decreaseQuantity}
                     />
                     <div className={styles.checkoutSection}>
                        <OrderSummary
                           subtotal={this.getItemsSubtotal()}
                           shippingFee={this.getShippingFee()}
                           gst={this.getGST()}
                        />

                        <PayPalCheckout
                           total={this.getTotal().toFixed(2)}
                           shipping={this.getShippingFee().toFixed(2)}
                           tax={this.getGST().toFixed(2)}
                           subtotal={this.getItemsSubtotal().toFixed(2)}
                           bookshelf={bookshelf}
                           setOrder={this.setOrder}
                        />
                     </div>
                  </>
               }

               {
                  order &&
                  <PurchaseConfirmation {...this.state} />
               }
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
