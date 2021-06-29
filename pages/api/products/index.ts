import { NextApiRequest, NextApiResponse } from 'next';
import Product from '../../../app/interfaces-objects/Product';
import productsJSON from './products.json';

export default async (req: NextApiRequest, res: NextApiResponse<Product[]>) => {
   const products: Product[] = productsJSON.sort((a, b) => {
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
      return 0;
   })
   res.status(200).json(products);
}