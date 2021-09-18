import React, { createRef, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { createOrder } from '../../../firebase/add'
import { updateProduct, updateUser } from '../../../firebase/update'
import Book from '../../../interfaces-objects/Book'
import { BookshelfItem, Order } from '../../../interfaces-objects/interfaces'
import { createRemoveAllFromBookshelfAction } from '../../../redux/actions/bookshelfActions'
import styles from '../../../styles/paypal-checkout/PayPalCheckout.module.css'
import { getFromProducts } from '../../../util/productModelHelper'
import { useAuth } from '../../contexts/AuthProvider'
import Loading from '../loading/Loading'

interface Props {
   readonly total: string
   readonly subtotal: string
   readonly shipping: string
   readonly tax: string
   readonly bookshelf: BookshelfItem[]
   readonly setOrder: (order: Order) => void
}

const PayPalCheckout: React.FC<Props> = ({
   total,
   subtotal,
   shipping,
   tax,
   bookshelf,
   setOrder
}) => {
   const [timer, setTimer] = useState<NodeJS.Timeout>(null)
   const dispatch = useDispatch()
   const { providenceUser } = useAuth()
   const ref = createRef<HTMLDivElement>()

   useEffect(() => {
      appendScript()
   }, [])

   useEffect(() => {
      let t: NodeJS.Timeout = null
      if (timer) {
         clearTimeout(timer)
      }
      if (bookshelf.length) {
         t = renderButtons()
         setTimer(t)
      }
      return () => {
         clearTimeout(t)
      }
   }, [total])

   function appendScript() {
      const script = document.createElement('script')
      script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_SANDBOX_PAYPAL_CLIENT_ID}&currency=CAD`
      document.body.append(script)
   }

   function renderButtons() {
      try {
         removeButtons()
         return setTimeout(() => {
            const { paypal }: typeof window & { paypal?: any } = window
            paypal.Buttons({
               createOrder: (data, actions) => {
                  return actions.order.create({
                     intent: 'CAPTURE',
                     purchase_units: getPurchaseUnits()
                  })
               },
               onApprove: async (data, actions) => {
                  const orderData = await actions.order.capture()
                  const order = buildOrder(orderData)
                  createOrder(order)
                  setOrder(order)
                  updateStocks()
                  makeUserCustomer()
                  dispatch(createRemoveAllFromBookshelfAction())
               }
            }).render('#paypal-button-container')
            setTimer(null)
         }, 3200);
      }
      catch (error) {
         window.alert('Is the PayPal checkout button not showing? If so refresh the page.')
         return null
      }
   }

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

   function removeButtons() {
      if (ref.current) ref.current.innerHTML = ''
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

   function getItems() {
      const items = bookshelf.map(item => ({
         name: `${item.name}${item.subtitle ? ` - ${item.subtitle}` : ''}`,
         unit_amount: { currency_code: 'CAD', value: item.price.toFixed(2) },
         quantity: item.quantity.toString(),
         sku: item.id,
         category: item.weight ? 'PHYSICAL_GOODS' : 'DIGITAL_GOODS'
      }))
      return items
   }

   function buildOrder(orderData: any) {
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
         }))
      }
      return order
   }

   return (
      <div className={styles.container}>
         {
            bookshelf.length ?
               timer ?
                  <div id="paypal-button-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 70 }}>
                     <Loading localIsLoading size={4} />
                  </div> :
                  <div ref={ref} id="paypal-button-container" className={styles.paypalButtons} style={{ zIndex: 0 }}></div>
               : null
         }
      </div>
   )
}

export default PayPalCheckout
