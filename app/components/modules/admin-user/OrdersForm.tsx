import React, { useState, useEffect, CSSProperties } from 'react'
import { FormikErrors, FormikTouched, Formik, useFormikContext, FormikProps, FormikHelpers } from 'formik'
import styles from '../../../styles/admin-user/OrdersForm.module.css'
import Button from '../../elements/button/Button'
import * as Yup from 'yup'
import ProductSelectDropdownMenu from './ProductSelectDropdownMenu'
import Product from '../../../interfaces-objects/Product'
import { ReduxState } from '../../../redux/reducers/rootReducer'
import { connect } from 'react-redux'
import clsx from 'clsx'
import { BookshelfItem, Order, PaymentStatus } from '../../../interfaces-objects/interfaces'
import Book from '../../../interfaces-objects/Book'
import { checkForMediaOnly, getGST, getItemsSubtotal, getShippingFee, getTotal } from '../../../util/bookshelfHelper'
import { AiFillCloseCircle } from 'react-icons/ai'
import { FiMinus, FiPlus } from 'react-icons/fi'
import { useAuth } from '../../contexts/AuthProvider'
import Dialog from '../dialog/Dialog'
import { closeDialog, openDialog } from '../../../redux/actions/openedDialogNameAction'
import { createOrder } from '../../../firebase/add'
import { OrderType, ORDER_TYPES, ORDER_TYPE_DELIVERY, ORDER_TYPE_MEDIA_ONLY, ORDER_TYPE_PICKUP } from '../../../interfaces-objects/constants'
import { titleCase } from '../../../util/stringHelper'

interface FormikOrder {
   firstName: string
   lastName: string
   mainAddress: string
   secondary: string
   city: string
   stateProvince: string
   country: string
   zipCode: string
   dateTime: string
   dueDate: string
   subtotal: number
   shippingFee: number
   gst: number
   total: number,
   search: string,
   payStatus: PaymentStatus | ''
   orderType: OrderType
}

const getInitialValues = (order?: Order): FormikOrder => ({
   firstName: order ? order.customerName.firstName : '',
   lastName: order ? order.customerName.lastName : '',
   mainAddress: order ? order.shippingAddress.main : '',
   secondary: order ? order.shippingAddress.secondary : '',
   city: order ? order.shippingAddress.city : '',
   stateProvince: order ? order.shippingAddress.stateProvince : '',
   country: order ? order.shippingAddress.country : '',
   zipCode: order ? order.shippingAddress.zipCode : '',
   dateTime: order ? (order.dateTime as Date).toISOString().split('.')[0] : '',
   dueDate: order ? (order.dueDate as Date).toISOString().split('.')[0] : '',
   subtotal: order ? order.orderSubtotal : 0,
   shippingFee: order ? order.shipping : 0,
   gst: order ? order.gst : 0,
   total: order ? order.orderTotal : 0,
   search: '',
   payStatus: order ? order.paymentStatus : '',
   orderType: order ? order.orderType : ORDER_TYPE_DELIVERY
})

const validationSchema = Yup.object({
   firstName: Yup.string().required('Required'),
   lastName: Yup.string().required('Required'),
   mainAddress: Yup.string().required('Required'),
   secondary: Yup.string().nullable(),
   city: Yup.string().required('Required'),
   stateProvince: Yup.string().required('Required'),
   country: Yup.string().required('Required'),
   zipCode: Yup.string().required('Required'),
   dateTime: Yup.string().required('Required'),
   dueDate: Yup.date().nullable(),
   payStatus: Yup.string().oneOf<PaymentStatus>(['Paid', 'Not paid'], 'Required').required('Required'),
   orderType: Yup.string().oneOf<OrderType>(ORDER_TYPES as OrderType[], 'Required').required('Required')
})

interface Props {
   readonly bookshelf: BookshelfItem[]
   readonly setBookshelf: React.Dispatch<React.SetStateAction<BookshelfItem[]>>
   readonly products?: Product[]
   readonly currentOrder?: Order
}
interface FormikWrapper {
   readonly products?: Product[]
   readonly currentOrder?: Order
   readonly setCurrentOrder?: React.Dispatch<React.SetStateAction<Order>>
}

const OrdersForm: React.FC<Props & { props: FormikProps<FormikOrder> }> = ({
   products,
   props,
   bookshelf,
   setBookshelf,
   currentOrder
}) => {
   const { setFieldValue } = useFormikContext<FormikOrder>()

   useEffect(() => {
      updateBookshelfAmounts()
   }, [bookshelf, props.values.orderType])

   function updateBookshelfAmounts() {
      setFieldValue('subtotal', getItemsSubtotal(bookshelf))
      setFieldValue('shippingFee', getShippingFee(bookshelf, props.values.orderType))
      setFieldValue('gst', getGST(bookshelf, props.values.orderType))
      setFieldValue('total', getTotal(bookshelf, props.values.orderType))
      if (bookshelf.length) {
         if (checkForMediaOnly(bookshelf)) {
            if (props.values.orderType !== ORDER_TYPE_MEDIA_ONLY) setFieldValue('orderType', ORDER_TYPE_MEDIA_ONLY)
         }
         else {
            if (props.values.orderType === ORDER_TYPE_MEDIA_ONLY) setFieldValue('orderType', ORDER_TYPE_DELIVERY)
         }
      }
   }

   function selectProduct(product: Product) {
      const item: BookshelfItem = {
         id: product._id,
         image: product.images[0],
         name: product.name,
         price: product.price,
         quantity: 1,
         type: product.type
      }
      if (product.type === 'Book') item.weight = (product as Book).weight
      setBookshelf([...bookshelf, item])
      setFieldValue('search', '')
   }

   function removeItem(bookshelfItem: BookshelfItem) {
      setBookshelf(bookshelf.filter(item => item.id !== bookshelfItem.id))
   }

   function filteredProducts() {
      const ids = bookshelf.map(prod => prod.id)
      return products.filter(prod => !ids.includes(prod._id))
   }

   function increaseQuantity(id: string) {
      const shelf = bookshelf.map(item => {
         if (item.id === id) {
            item.quantity += 1
            return item
         }
         return item
      })
      setBookshelf(shelf)
   }

   function decreaseQuantity(id: string) {
      const shelf = bookshelf.map(item => {
         if (item.id === id) {
            item.quantity -= 1
            return item
         }
         return item
      })
      setBookshelf(shelf.filter(item => Boolean(item.quantity)))
   }

   function errorStyle(
      formikError: string | string[] | FormikErrors<any> | FormikErrors<any>[],
      touched: boolean | FormikTouched<any> | FormikTouched<any>[] | string
   ) {
      const style: CSSProperties = {}
      if (formikError && touched)
         style.borderColor = '#c00'
      else if (!formikError)
         style.borderColor = 'var(--lightGray)'
      return style
   }

   return (
      <form className={styles.form} onSubmit={props.handleSubmit}>
         <div className={styles.inputs}>
            <div className={styles.leftSide}>
               <div className={styles.formController}>
                  <div className={styles.inputField}>
                     <label htmlFor='firstName'>Customer First Name *</label>
                     <input
                        id='firstName'
                        name='firstName'
                        type='text'
                        value={props.values.firstName}
                        onChange={props.handleChange}
                        style={errorStyle(props.errors.firstName, props.touched.firstName)}
                     />
                     {
                        props.errors.firstName && props.touched.firstName &&
                        <div className={styles.errorMessage}>
                           <strong>{props.errors.firstName}</strong>
                        </div>
                     }
                  </div>
               </div>

               <br />

               <div className={styles.formController}>
                  <div className={styles.inputField}>
                     <label htmlFor='lastName'>Customer Last Name *</label>
                     <input
                        id='lastName'
                        name='lastName'
                        type='text'
                        value={props.values.lastName}
                        onChange={props.handleChange}
                        style={errorStyle(props.errors.lastName, props.touched.lastName)}
                     />
                     {
                        props.errors.lastName && props.touched.lastName &&
                        <div className={styles.errorMessage}>
                           <strong>{props.errors.lastName}</strong>
                        </div>
                     }
                  </div>
               </div>

               <br />

               <div className={styles.formController}>
                  <div className={styles.inputField}>
                     <label htmlFor='mainAddress'>Main Address *</label>
                     <input
                        id='mainAddress'
                        name='mainAddress'
                        type='text'
                        value={props.values.mainAddress}
                        onChange={props.handleChange}
                        style={errorStyle(props.errors.mainAddress, props.touched.mainAddress)}
                     />
                     {
                        props.errors.mainAddress && props.touched.mainAddress &&
                        <div className={styles.errorMessage}>
                           <strong>{props.errors.mainAddress}</strong>
                        </div>
                     }
                  </div>
               </div>

               <br />

               <div className={styles.formController}>
                  <div className={styles.inputField}>
                     <label htmlFor='secondary'>Address Suffix</label>
                     <input
                        id='secondary'
                        name='secondary'
                        type='text'
                        value={props.values.secondary}
                        onChange={props.handleChange}
                     />
                  </div>
               </div>

               <br />

               <div className={styles.formController}>
                  <div className={styles.inputField}>
                     <label htmlFor='city'>City *</label>
                     <input
                        id='city'
                        name='city'
                        type='text'
                        value={props.values.city}
                        onChange={props.handleChange}
                        style={errorStyle(props.errors.city, props.touched.city)}
                     />
                     {
                        props.errors.city && props.touched.city &&
                        <div className={styles.errorMessage}>
                           <strong>{props.errors.city}</strong>
                        </div>
                     }
                  </div>
               </div>

               <br />

               <div className={styles.formController}>
                  <div className={styles.inputField}>
                     <label htmlFor='stateProvince'>Province / State *</label>
                     <input
                        id='stateProvince'
                        name='stateProvince'
                        type='text'
                        value={props.values.stateProvince}
                        onChange={props.handleChange}
                        style={errorStyle(props.errors.stateProvince, props.touched.stateProvince)}
                     />
                     {
                        props.errors.stateProvince && props.touched.stateProvince &&
                        <div className={styles.errorMessage}>
                           <strong>{props.errors.stateProvince}</strong>
                        </div>
                     }
                  </div>
               </div>

               <br />

               <div className={styles.formController}>
                  <div className={styles.inputField}>
                     <label htmlFor='country'>Country *</label>
                     <input
                        id='country'
                        name='country'
                        type='text'
                        value={props.values.country}
                        onChange={props.handleChange}
                        style={errorStyle(props.errors.country, props.touched.country)}
                     />
                     {
                        props.errors.country && props.touched.country &&
                        <div className={styles.errorMessage}>
                           <strong>{props.errors.country}</strong>
                        </div>
                     }
                  </div>
               </div>

               <br />

               <div className={styles.formController}>
                  <div className={styles.inputField}>
                     <label htmlFor='zipCode'>Zip Code *</label>
                     <input
                        id='zipCode'
                        name='zipCode'
                        type='text'
                        value={props.values.zipCode}
                        onChange={props.handleChange}
                        style={errorStyle(props.errors.zipCode, props.touched.zipCode)}
                     />
                     {
                        props.errors.zipCode && props.touched.zipCode &&
                        <div className={styles.errorMessage}>
                           <strong>{props.errors.zipCode}</strong>
                        </div>
                     }
                  </div>
               </div>
            </div>

            <div className={styles.rightSide}>
               <div className={styles.formController}>
                  <div className={styles.inputField}>
                     <label htmlFor='dateTime'>Date of Purchase *</label>
                     <input
                        id='dateTime'
                        name='dateTime'
                        type='date'
                        value={props.values.dateTime}
                        onChange={props.handleChange}
                        style={errorStyle(props.errors.dateTime, props.touched.dateTime)}
                     />
                     {
                        props.errors.dateTime && props.touched.dateTime &&
                        <div className={styles.errorMessage}>
                           <strong>{props.errors.dateTime}</strong>
                        </div>
                     }
                  </div>
               </div>

               <br />

               <div className={styles.formController}>
                  <div className={styles.inputField}>
                     <label htmlFor='dueDate'>Payment Due Date</label>
                     <input
                        id='dueDate'
                        name='dueDate'
                        type='datetime-local'
                        value={props.values.dueDate}
                        onChange={props.handleChange}
                     />
                  </div>
               </div>

               <br />

               <div className={styles.formController}>
                  <div className={styles.inputField}>
                     <label htmlFor='payStatus'>Payment Status</label>
                     <select
                        id='payStatus'
                        name='payStatus'
                        value={props.values.payStatus}
                        onChange={props.handleChange}
                        style={errorStyle(props.errors.payStatus, props.touched.payStatus)}
                     >
                        <option></option>
                        <option>Paid</option>
                        <option>Not paid</option>
                     </select>
                     {
                        props.errors.payStatus && props.touched.payStatus &&
                        <div className={styles.errorMessage}>
                           <strong>{props.errors.payStatus}</strong>
                        </div>
                     }
                  </div>
               </div>

               <br />

               <div className={styles.formController}>
                  <div className={styles.inputField}>
                     <label htmlFor='orderType'>Order Type</label>
                     <select
                        id='orderType'
                        name='orderType'
                        value={props.values.orderType}
                        onChange={props.handleChange}
                        style={errorStyle(props.errors.payStatus, props.touched.payStatus)}
                     >
                        {ORDER_TYPES.map(type => <option id={type} value={type}>{titleCase(type)}</option>)}
                     </select>
                     {
                        props.errors.orderType && props.touched.orderType &&
                        <div className={styles.errorMessage}>
                           <strong>{props.errors.orderType}</strong>
                        </div>
                     }
                  </div>
               </div>

               <br />

               <div className={styles.formController}>
                  <div className={styles.inputField}>
                     <label htmlFor='search'>Add Products To Order</label>
                     <input
                        id='search'
                        type='text'
                        value={props.values.search}
                        onChange={props.handleChange}
                        style={errorStyle(props.errors.search, props.touched.search)}
                     />
                     {
                        props.errors.search && props.touched.search &&
                        <div className={styles.errorMessage}>
                           <strong>{props.errors.search}</strong>
                        </div>
                     }
                  </div>

                  <ProductSelectDropdownMenu
                     {...{ search: props.values.search, selectProduct }}
                     products={filteredProducts()}
                  />
               </div>

               <br />

               {
                  bookshelf.map(item => (
                     <div key={item.id} className={styles.resultsContainerFixed}>
                        <div className={clsx(styles.resultItem, styles.resultItemFixed)}>
                           <div className={styles.resultItemCheck} onClick={() => removeItem(item)}>
                              <AiFillCloseCircle size={22} />
                           </div>

                           <div className={styles.img}><img src={item.image} alt='Book cover' /></div>

                           <div className={styles.name}>
                              <h5>{item.name}</h5>
                           </div>
                           <div className={styles.type}><div>{item.type}</div></div>
                        </div>
                        <hr className={styles.hr} />
                        <div className={styles.qtyPrices}>
                           <div className={styles.qtyButtons}>
                              <div onClick={() => increaseQuantity(item.id)}>
                                 <FiPlus />
                              </div>
                              <div onClick={() => decreaseQuantity(item.id)}>
                                 <FiMinus />
                              </div>
                           </div>

                           <div className={styles.qty}>
                              {item.quantity}
                           </div>

                           <div className={styles.price}>
                              $ {item.price.toFixed(2)}
                           </div>

                           <div className={styles.subtotal}>
                              <strong>$ {(item.price * item.quantity).toFixed(2)}</strong>
                           </div>
                        </div>
                     </div>
                  ))
               }

               <br />

               <div className={clsx(styles.formController, styles.formControllerDoubleInput)}>
                  <div className={styles.inputField}>
                     <label htmlFor='subtotal'>Subtotal</label>
                     <input
                        id='subtotal'
                        type='text'
                        value={props.values.subtotal.toFixed(2)}
                        onChange={props.handleChange}
                        disabled
                     />
                  </div>

                  &nbsp;&nbsp;&nbsp;

                  <div className={styles.inputField}>
                     <label htmlFor='shippingFee'>Shipping</label>
                     <input
                        id='shippingFee'
                        type='text'
                        value={props.values.shippingFee.toFixed(2)}
                        onChange={props.handleChange}
                        disabled
                     />
                  </div>
               </div>

               <br />

               <div className={clsx(styles.formController, styles.formControllerDoubleInput)}>
                  <div className={styles.inputField}>
                     <label htmlFor='gst'>GST</label>
                     <input
                        id='gst'
                        type='text'
                        value={props.values.gst.toFixed(2)}
                        onChange={props.handleChange}
                        disabled
                     />
                  </div>

                  &nbsp;&nbsp;&nbsp;

                  <div className={styles.inputField}>
                     <label htmlFor='total'>Total</label>
                     <input
                        id='total'
                        type='text'
                        value={props.values.total.toFixed(2)}
                        onChange={props.handleChange}
                        disabled
                     />
                  </div>
               </div>
            </div>
         </div>

         <br />

         <div className={styles.submit}>
            <Button
               label={currentOrder ? 'UPDATE' : 'CREATE'}
               type='submit'
               secondaryStyle
            />
         </div>
      </form>
   )
}

const FormikParent: React.FC<FormikWrapper> = ({ products, currentOrder, setCurrentOrder }) => {
   const [bookshelf, setBookshelf] = useState<BookshelfItem[]>([])
   const { providenceUser } = useAuth()

   useEffect(() => {
      if (currentOrder) {
         const shelf: BookshelfItem[] = []
         for (const item of currentOrder.productsList) {
            const { name, price, type, images } = products.find(p => p?._id === item.id)
            const shelfItem: BookshelfItem = {
               name, price, type,
               id: item.id,
               image: images[0],
               quantity: item.quantity,
            }
            shelf.push(shelfItem)
         }
         setBookshelf(shelf)
      }
   }, [currentOrder])

   async function submitOrder(values: FormikOrder, actions: FormikHelpers<FormikOrder>) {
      const {
         firstName,
         lastName,
         mainAddress: main,
         secondary,
         city,
         stateProvince,
         country,
         zipCode,
         payStatus,
         subtotal: orderSubtotal,
         shippingFee: shipping,
         gst,
         total: orderTotal,
         orderType
      } = values
      const dateTime = new Date(values.dateTime).toUTCString()
      const dueDate = values.dueDate ? new Date(values.dueDate) : null
      const order: Order = {
         _id: currentOrder ? currentOrder._id : Date.now().toString(),
         _userId: currentOrder ? currentOrder._userId : providenceUser ? providenceUser._id : '',
         paymentStatus: payStatus as PaymentStatus,
         productsList: bookshelf.map(item => {
            const { id, name, quantity, price, type } = item
            return { id, name, quantity, price, type, subtotal: Number((quantity * price).toFixed(2)) }
         }),
         customerName: { firstName, lastName },
         shippingAddress: { main, secondary, city, stateProvince, country, zipCode },
         orderSubtotal, shipping, gst, orderTotal,
         dateTime,
         orderType
      }
      if (dueDate) order.dueDate = dueDate.toUTCString()
      const ordRef = await createOrder(order)
      if (ordRef) openDialog(currentOrder ? 'CONFIRM_ORDER_SAVE_UPDATE' : 'CONFIRM_ORDER_SAVE_CREATE')
      else openDialog('ORDER_SAVE_ERROR')
      actions.resetForm()
   }

   return (
      <>
         <Formik
            initialValues={getInitialValues(currentOrder)}
            validate={async () => {
               const errors: any = {}
               if (!bookshelf.length) errors.search = 'Required'
               return errors
            }}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
               submitOrder(values, actions)
               setBookshelf([])
            }}
         >
            {
               props => <OrdersForm {...{ products, props, bookshelf, setBookshelf, currentOrder }} />
            }
         </Formik>

         <Dialog
            name='CONFIRM_ORDER_SAVE_CREATE'
            message='The order was successfully added to the database'
            buttonsOptions={[{
               label: 'CLOSE',
               secondaryStyle: true,
               clickHandler: closeDialog
            }]}
         />

         <Dialog
            name='CONFIRM_ORDER_SAVE_UPDATE'
            message='The order was successfully updated to the database'
            buttonsOptions={[{
               label: 'CLOSE',
               secondaryStyle: true,
               clickHandler: () => {
                  closeDialog()
                  setCurrentOrder(null)
               }
            }]}
         />

         <Dialog
            name='ORDER_SAVE_ERROR'
            message='Unfortunately it was not possible to create/update this new order'
            buttonsOptions={[{
               label: 'CLOSE',
               secondaryStyle: true,
               clickHandler: closeDialog
            }]}
         />
      </>
   )
}

const mapStateToProps = ({ products }: ReduxState) => ({ products })

export default connect(mapStateToProps)(FormikParent)
