import React, { useState, useContext } from 'react'
import BookshelfList from '../../app/components/modules/bookshelf/BookshelfList';
import OrderSummary from '../../app/components/modules/bookshelf/OrderSummary';
import styles from '../../app/styles/bookshelf/Bookshelf.module.css'
import { connect } from 'react-redux'
import { BookshelfItem, Order } from '../../app/interfaces-objects/interfaces';
import { store } from '../../app/redux/store/store';
import { createChangeCheckAction, createDecreaseQuantityAction, createIncreaseQuantityAction } from '../../app/redux/actions/bookshelfItemActions';
import PayPalCheckout from '../../app/components/modules/paypal-checkout/PayPalCheckout';
import PurchaseConfirmation from '../../app/components/modules/bookshelf/PurchaseConfirmation';
import { getGST, getItemsSubtotal, getShippingFee, getTotal } from '../../app/util/bookshelfHelper';
import BookshelfProvider, { bookshelfContext } from '../../app/components/modules/bookshelf/context/BookshelfProvider';
import { ReduxState } from '../../app/redux/reducers/rootReducer';
import { GrFormClose } from 'react-icons/gr'


interface Props {
   readonly bookshelf: BookshelfItem[]
}

export const Bookshelf: React.FC<Props> = ({ bookshelf }) => {
   const [order, setOrder] = useState<Order>(null)
   const { overstockMessage, setOverstockMessage, orderType, setOrderType } = useContext(bookshelfContext)

   function setItemCheck(id: string) {
      store.dispatch(createChangeCheckAction(id));
   }

   function increaseQuantity(id: string) {
      store.dispatch(createIncreaseQuantityAction(id));
   }

   function decreaseQuantity(id: string) {
      store.dispatch(createDecreaseQuantityAction(id));
   }


   return (
      <div className={styles.container}>
         <div>
            <h1 className={styles.h1}>Bookshelf</h1>
         </div>

         {
            overstockMessage &&
            <div className={styles.overstockMessage}>
               <div onClick={() => setOverstockMessage(false)}><GrFormClose size={27} /></div>
               <div className={styles.message}>
                  <div>
                     <img src='bookshelf/sorry.png' alt='Sorry' />
                  </div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <div>
                     <div>
                        We apologize we are out of a title you are trying to purchase.
                        Please let us know what title we are missing.<br />
                        Send us an email to <a href="mailto:providencebooksales@outlook.com">providencebooksales@outlook.com</a>
                     </div>
                  </div>
               </div>
            </div>
         }

         <div className={styles.listOutterContainer}>
            {
               !order &&
               <>
                  <BookshelfList
                     items={bookshelf}
                     setItemCheck={setItemCheck}
                     increaseQuantity={increaseQuantity}
                     decreaseQuantity={decreaseQuantity}
                  />
                  <div className={styles.checkoutSection}>
                     <OrderSummary
                        subtotal={getItemsSubtotal(bookshelf)}
                        shippingFee={getShippingFee(bookshelf, orderType)}
                        gst={getGST(bookshelf)}
                     />

                     <PayPalCheckout
                        total={getTotal(bookshelf, orderType).toFixed(2)}
                        shipping={getShippingFee(bookshelf, orderType).toFixed(2)}
                        tax={getGST(bookshelf).toFixed(2)}
                        subtotal={getItemsSubtotal(bookshelf).toFixed(2)}
                        bookshelf={bookshelf}
                        setOrder={setOrder}
                        orderType={orderType}
                        setOrderType={setOrderType}
                     />
                  </div>
               </>
            }

            {
               order &&
               <PurchaseConfirmation {...{ order }} />
            }
         </div>

         <div className={styles.thankMessage}>
            <div>THANK YOU FOR SHOPPING WITH PROVIDENCE BOOKS AND PRESS</div>
         </div>
      </div>
   )
}

const BookshelfWrapper: React.FC<Props> = props => {
   return <Bookshelf {...props} />
}

const mapStateToProps = ({ bookshelf }: ReduxState) => ({ bookshelf })


export default connect(mapStateToProps)(BookshelfWrapper)
