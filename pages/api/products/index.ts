import { NextApiRequest, NextApiResponse } from 'next'
import Product from '../../../app/interfaces-objects/Product';
import { firestore } from '../../../app/firebase/firebase';
import productsJSON from './products.json'
// import products from './dataCreator'

export default async (req: NextApiRequest, res: NextApiResponse<Product[]>) => {
   // const products = productsJSON as Product[]
   // res.status(200).json(products)
   const products: Product[] = [];
   const prodRef = await firestore.collection('products').get();
   prodRef.forEach(doc => products.push(doc.data() as Product))
   res.status(200).json(products);
}
