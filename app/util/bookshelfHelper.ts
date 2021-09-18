import { BookshelfItem } from "../interfaces-objects/interfaces";


export const getItemsSubtotal = (bookshelf: BookshelfItem[] = []) => {
   const subtotal = bookshelf.reduce((a, b) => a + (b.price * b.quantity), 0);
   return subtotal;
}

export const getShippingFee = (bookshelf: BookshelfItem[] = []) => {
   const totalWeight = sumWeight(bookshelf)
   return bookshelf.length ? calculateShippingFee(totalWeight, getPhysicalProductsSubtotal(bookshelf)) : 0;
}

export const getGST = (bookshelf: BookshelfItem[] = []) => {
   const subtotal = getItemsSubtotal(bookshelf) + getShippingFee(bookshelf);
   const gst = subtotal * 0.05;
   return gst;
}

export const getTotal = (bookshelf: BookshelfItem[] = []) => {
   return getItemsSubtotal(bookshelf) + getShippingFee(bookshelf) + getGST(bookshelf)
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
      else if (subtotal > 140 && subtotal <= 200) return parseFloat((subtotal * 0.1).toFixed(2))
      else if (subtotal > 200 && subtotal <= 300) return parseFloat((subtotal * 0.08).toFixed(2))
      else if (subtotal > 300 && subtotal <= 450) return parseFloat((subtotal * 0.06).toFixed(2))
      else return 0
   }
}

const getPhysicalProductsSubtotal = (bookshelf: BookshelfItem[]) => {
   return bookshelf.reduce((acc, current) => {
      if (current.type === 'Book') return acc + (current.price * current.quantity)
      return acc
   }, 0)
}