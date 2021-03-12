/** Types */
type Address = {
   main: string,
   secondary: string,
   city: string,
   stateProvince: string,
   country: string,
   zipCode: string
}

type Gender = 'Male' | 'Female'

type ProductItem = {
   name: string,
   quantity: number,
   price: number,
   subtotal: number
   type?: string,
}

type ArticleAuthor = {
   name: string,
   credential: string,
   about?: string
}
/** --------------------------------- */


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


export interface Product {
   _id: string,
   name: string,
   description: string,
   price: number
   type: string,
   weight: string,
   tags: string[],
   stock: number
   flag?: string,
   image?: string,
   providenceReview?: string,
}

export interface Book extends Product {
   _publisherId: string,
   _authorIds: string[] | string,
   _categoryId: string,
   publisher: string,
   category: string,
   author: string,
   subtitle?: string,
   isbn: string,
   publicationYear: number
   subject?: string,
   numberPages?: number,
   age?: string,
   coverType?: string,
}

// export interface AudioBook extends Product {
//    _publisherId: string,
//    _authorIds: string[] | string,
//    subtitle?: string,
//    isbn: string,
//    publicationYear: number
//    subject?: string,
//    duration?: number,
//    age?: string
// }

export interface Order {
   _userId: string,
   dateTime: Date,
   customerName: string,
   productsList: ProductItem[],
   shipping: number,
   orderSubtotal: number,
   gst: number,
   orderTotal: number
}

export interface Review {
   _id: string,
   _userId: string,
   _productId: string
   score: number,
   userName: string,
   dateTime: Date,
   heading: string,
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

export interface Article {
   _id: string,
   _categoryId: string,
   image: string,
   title: string,
   subtitle: string,
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
