/** Types */
type Address = {
   main: string,
   secondary?: string,
   city: string,
   stateProvince: string,
   country: string,
   zipCode: string
}

export type Gender = 'Male' | 'Female'

type PaymentStatus = 'Paid' | 'Not paid'

type ProductItem = {
   name: string,
   quantity: number,
   price: number,
   subtotal: number
   type?: string,
}
/** --------------------------------- */


/**
 * INTERFACES USED FOR DATA COMING FROM DATABASE
 */
export interface User {
   _id: string,
   firstName: string,
   lastName: string,
   email: string,
   address?: Address,
   primaryContactNumber?: string,
   secondaryContactNumber?: string,
   gender?: Gender,
   dateOfBirth: Date,
   since: Date,
   isCustomer: boolean
}

export interface Order {
   _userId: string,
   dateTime: Date,
   customerName: string,
   productsList: ProductItem[],
   shipping: number,
   orderSubtotal: number,
   gst: number,
   orderTotal: number,
   paymentStatus: PaymentStatus
}

export interface Review {
   _id: string,
   _userId: string,
   _productId: string
   score: number,
   userName: string,
   dateTime: Date | string,
   heading?: string,
   text: string,
}

export interface Comment {
   _id: string,
   _userId: string,
   _articleId: string,
   userName: string,
   dateTime: Date,
   body: string
}




export type ArticleAuthor = {
   name: string,
   credential: string,
   about?: string
}
export interface Article {
   _id: string,
   image: string,
   title: string,
   subtitle?: string,
   author: ArticleAuthor,
   category: string
   body: string,
   datePosted: Date,
}

export interface Category {
   _id: string,
   name: string
}

export interface Publisher {
   _id: string,
   name: string,
   phone: string,
   email: string,
   address: Address
}

export interface Author {
   _id: string,
   name: string,
   dateOfBirth: Date,
   credentials: string,
   introduction: string,
}




/**
 * INTERFACES USED FOR APP-LEVEL DATA
 */
 export interface BookshelfItem {
   id: string,
   isChecked: boolean,
   quantity: number,
   image: string,
   name: string,
   type: string,
   price: number,
   weight?: number,
   authors?: string,
   subtitle?: string,
   coverType?: string
   fileExtensions?: string[],
}