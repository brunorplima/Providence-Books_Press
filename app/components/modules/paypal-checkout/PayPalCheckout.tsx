import React from 'react'
import { PayPalButton } from 'react-paypal-button-v2'
import { useDispatch } from 'react-redux'
import { createOrder } from '../../../firebase/add'
import { updateProduct, updateUser } from '../../../firebase/update'
import Book from '../../../interfaces-objects/Book'
import { OrderType, ORDER_TYPE_DELIVERY, ORDER_TYPE_MEDIA_ONLY, ORDER_TYPE_PICKUP } from '../../../interfaces-objects/constants'
import { BookshelfItem, Order } from '../../../interfaces-objects/interfaces'
import { createRemoveAllFromBookshelfAction } from '../../../redux/actions/bookshelfActions'
import styles from '../../../styles/paypal-checkout/PayPalCheckout.module.css'
import { getFromProducts } from '../../../util/productModelHelper'
import { useAuth } from '../../contexts/AuthProvider'

interface Props {
   readonly total: string
   readonly subtotal: string
   readonly shipping: string
   readonly tax: string
   readonly bookshelf: BookshelfItem[]
   readonly setOrder: (order: Order) => void
   readonly orderType: OrderType,
   readonly setOrderType: React.Dispatch<React.SetStateAction<OrderType>>
}

const PayPalCheckout: React.FC<Props> = ({
   total,
   subtotal,
   shipping,
   tax,
   bookshelf,
   setOrder,
   orderType,
   setOrderType
}) => {
   const dispatch = useDispatch()
   const { providenceUser } = useAuth()

   async function updateStocks() {
      for (const item of bookshelf) {
         if (item.type !== 'E-book' && item.type !== 'Audio book') {
            const product = getFromProducts(item.id) as Book
            await updateProduct(item.id, { stock: product.stock - item.quantity })
         }
      }
   }

   async function makeUserCustomer() {
      if (providenceUser && !providenceUser.isCustomer) {
         await updateUser(providenceUser._id, { isCustomer: true })
      }
   }

   function getPurchaseUnits() {
      const units = [{
         description: `Purchase of ${bookshelf.length} title${bookshelf.length > 1 ? 's' : ''} - Books, E-books and/or Audio-books`,
         amount: {
            currency_code: 'CAD',
            value: total,
            breakdow: {
               item_total: { currency_code: 'CAD', value: subtotal },
               shipping: { currency_code: 'CAD', value: shipping },
               tax_total: { currency_code: 'CAD', value: tax }
            }
         },
         payee: { email_address: 'providencebooksales@outlook.com' },
         soft_descriptor: 'Books purchase',
         // Implement Item later on
         // items: getItems()
      }]
      return units
   }

   function  buildOrder(orderData: any) {
      const now = new Date(Date.now())
      const address = orderData.purchase_units[0].shipping.address
      const order: Order = {
         _id: orderData.id,
         _userId: providenceUser ? providenceUser._id : '',
         dateTime: now.toUTCString(),
         dueDate: now.toUTCString(),
         customerName: {
            firstName: orderData.payer.name.given_name,
            lastName: orderData.payer.name.surname
         },
         shipping: Number(shipping),
         orderSubtotal: Number(subtotal),
         orderTotal: Number(total),
         gst: Number(tax),
         paymentStatus: 'Paid',
         shippingAddress: {
            main: address.address_line_1,
            city: address.admin_area_2,
            stateProvince: address.admin_area_1,
            country: address.country_code,
            zipCode: address.postal_code,
            secondary: address.address_line_2 ? address.address_line_ : null
         },
         productsList: bookshelf.map(item => ({
            id: item.id,
            name: `${item.name}${item.subtitle ? ` - ${item.subtitle}` : ''}`,
            price: item.price,
            quantity: item.quantity,
            subtotal: Number((item.quantity * item.price).toFixed(2)),
            type: item.type
         })),
         orderType
      }
      return order
   }

   function changeHandler(type: OrderType) {
      setOrderType(type)
   }

   return (
      <>
         {
            orderType !== ORDER_TYPE_MEDIA_ONLY && 
            <div className={styles.orderType}>
               <label htmlFor='delivery'>Delivery</label>
               <input type='radio' name='orderType' id='delivery' onChange={() => changeHandler(ORDER_TYPE_DELIVERY)} checked={orderType === ORDER_TYPE_DELIVERY} />
               &nbsp;&nbsp;&nbsp;&nbsp;
               <label htmlFor='pickup'>Pickup</label>
               <input type='radio' name='orderType' id='pickup' onChange={() => changeHandler(ORDER_TYPE_PICKUP)} checked={orderType === ORDER_TYPE_PICKUP} />
            </div>
         }
         <div className={styles.container}>
            <PayPalButton
               amount={total}
               shippingPreference={Number(shipping) <= 0 ? 'NO_SHIPPING' : 'GET_FROM_FILE'} // default is "GET_FROM_FILE"
               createOrder={(data, actions) => {
                  return actions.order.create({
                     intent: 'CAPTURE',
                     purchase_units: getPurchaseUnits()
                  })
               }}
               onApprove={(data, actions) => {
                  return actions.order.capture().then(orderData => {
                     const order = buildOrder(orderData)
                     createOrder(order)
                     setOrder(order)
                     updateStocks()
                     makeUserCustomer()
                     dispatch(createRemoveAllFromBookshelfAction())
                  })
               }}
               options={{
                  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
                  currency: 'CAD'
               }}
            />
         </div>
      </>
   )
}

export default PayPalCheckout
