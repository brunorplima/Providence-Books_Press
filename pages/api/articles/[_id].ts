import { NextApiRequest, NextApiResponse } from 'next'
import articles from './articles.json'

export default (req: NextApiRequest, res: NextApiResponse) => {
   const { _id } = req.query;
   const article = articles.find((art) => art._id === _id);
   res.status(200).json(article);
}