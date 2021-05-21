import { NextApiRequest, NextApiResponse } from 'next';
import featuredProducts from './featuredProducts.json';

export default async function(req: NextApiRequest, res: NextApiResponse) {
   res.status(200).json(featuredProducts);
}