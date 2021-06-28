import { NextApiRequest, NextApiResponse } from 'next'
import firebase, { firestore } from '../../../app/firebase/firebase';
import Product from '../../../app/interfaces-objects/Product';
// import productsJSON from './products.json'
// import products from './dataCreator'

export default async (req: NextApiRequest, res: NextApiResponse<Product[]>) => {
   const { sorted } = req.query;
   // const products = productsJSON as Product[]
   // res.status(200).json(products)
   const products: Product[] = [];
   let productsRef: 
      firebase.firestore.CollectionReference<firebase.firestore.DocumentData>
      | firebase.firestore.Query<firebase.firestore.DocumentData>
      | firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
      | null = null;
   productsRef = firestore.collection('products');
   if (sorted === 'y') productsRef = productsRef.orderBy('name');
   productsRef = await productsRef.get();
   productsRef.forEach(doc => products.push(doc.data() as Product));
   res.status(200).json(products);
}