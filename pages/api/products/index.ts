import { NextApiRequest, NextApiResponse } from 'next'
import firebase, { firestore } from '../../../app/firebase/firebase';
import Product from '../../../app/interfaces-objects/Product';
import productsJSON from './products.json'
import fs from 'fs';
import faker from 'faker'
// import products from './dataCreator'

export default async (req: NextApiRequest, res: NextApiResponse<Product[]>) => {
   // const products: Product[] = [];
   // let productsRef: 
   //    firebase.firestore.CollectionReference<firebase.firestore.DocumentData>
   //    | firebase.firestore.Query<firebase.firestore.DocumentData>
   //    | firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
   //    | null = null;
   // productsRef = await firestore.collection('products').orderBy('name').get();
   // productsRef.forEach(doc => products.push(doc.data() as Product));
   
   const products: Product[] = productsJSON.sort((a, b) => {
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
      return 0;
   })
   res.status(200).json(products);
}