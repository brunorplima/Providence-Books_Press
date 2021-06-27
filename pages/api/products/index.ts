import { NextApiRequest, NextApiResponse } from 'next'
import { firestore } from '../../../app/firebase/firebase';
import Product from '../../../app/interfaces-objects/Product';
import productsJSON from './products.json'
// import products from './dataCreator'
import Cors from 'cors';

// Initializing the cors middleware
const cors = Cors({
   methods: ['GET', 'HEAD'],
 })
 
 // Helper method to wait for a middleware to execute before continuing
 // And to throw an error when an error happens in a middleware
 function runMiddleware(req, res, fn) {
   return new Promise((resolve, reject) => {
     fn(req, res, (result) => {
       if (result instanceof Error) {
         return reject(result)
       }
 
       return resolve(result)
     })
   })
 }

export default async (req: NextApiRequest, res: NextApiResponse<Product[]>) => {
   // const products = productsJSON as Product[]
   // res.status(200).json(products)
   await runMiddleware(req, res, cors);
   const products: Product[] = [];
   const prodRef = await firestore.collection('products').get();
   prodRef.forEach(doc => products.push(doc.data() as Product))
   res.status(200).json(products);
}