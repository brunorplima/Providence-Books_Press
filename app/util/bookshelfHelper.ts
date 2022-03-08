import { AUDIO_BOOK_TYPE, E_BOOK_TYPE, OrderType, ORDER_TYPE_DELIVERY } from "../interfaces-objects/constants";
import { BookshelfItem } from "../interfaces-objects/interfaces";


export const getItemsSubtotal = (bookshelf: BookshelfItem[] = []) => {
   const subtotal = bookshelf.reduce((a, b) => a + (b.price * b.quantity), 0);
   return subtotal;
}

export const getShippingFee = (bookshelf: BookshelfItem[] = [], orderType: OrderType) => {
   if (orderType !== ORDER_TYPE_DELIVERY || checkForMediaOnly(bookshelf)) return 0
   const totalWeight = sumWeight(bookshelf)
   return bookshelf.length ? calculateShippingFee(totalWeight, getPhysicalProductsSubtotal(bookshelf)) : 0;
}

export const getGST = (bookshelf: BookshelfItem[] = [], orderType: OrderType) => {
   const subtotal = getItemsSubtotal(bookshelf) + getShippingFee(bookshelf, orderType);
   const gst = subtotal * 0.05;
   return gst;
}

export const getTotal = (bookshelf: BookshelfItem[] = [], orderType: OrderType) => {
   return getItemsSubtotal(bookshelf) + getShippingFee(bookshelf, orderType) + getGST(bookshelf, orderType)
}

export const checkForMediaOnly = (bookshelf: BookshelfItem[] = []) => {
   const isMedia = []
   bookshelf.forEach(item => {
      if (item.type === E_BOOK_TYPE || item.type === AUDIO_BOOK_TYPE) isMedia.push(true)
      else isMedia.push(false)
   })
   return !isMedia.includes(false)
}




const sumWeight = (list: BookshelfItem[]) => {
   return list.reduce((acc, current) => {
      if (current.type === 'Book') return acc + (current.weight * current.quantity)
      return acc
   }, 0)
}

const calculateShippingFee = (weight: number, subtotal: number) => {
   if (weight === 0) return 0
   if (weight <= 0.5) {
      if (weight <= 0.4) return 5.09
      else return 5.47
   } else {
      if (subtotal <= 140) return 14
      if (subtotal > 140 && subtotal <= 200) return parseFloat((subtotal * 0.1).toFixed(2))
      if (subtotal > 200 && subtotal <= 300) return parseFloat((subtotal * 0.08).toFixed(2))
      if (subtotal > 300 && subtotal <= 450) return parseFloat((subtotal * 0.06).toFixed(2))
      return 0
   }
}

const getPhysicalProductsSubtotal = (bookshelf: BookshelfItem[]) => {
   return bookshelf.reduce((acc, current) => {
      if (current.type === 'Book') return acc + (current.price * current.quantity)
      return acc
   }, 0)
}