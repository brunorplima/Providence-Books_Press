import { NextApiRequest, NextApiResponse } from 'next'
import Product from '../../../app/interfaces-objects/Product';
import productsJSON from './products.json'

type NotFound = { error: string }

export default (req: NextApiRequest, res: NextApiResponse<Product | NotFound>) => {
   const { id } = req.query;
   
   const products = productsJSON as Product[]

   const product = products.find(prod => prod._id === id);

   res.status(200).json(product);
} 