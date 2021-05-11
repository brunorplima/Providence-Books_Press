import { NextApiRequest, NextApiResponse } from 'next'
import { Article } from '../../../app/interfaces-objects/interfaces';
import articlesJSON from './articles.json'

type NotFound = { error: string }

export default (req: NextApiRequest, res: NextApiResponse<Article | NotFound>) => {
   const { _id } = req.query;

   let articles = articlesJSON as unknown as Article[];

   const article: Article = articles.find((art: Article) => art._id === _id);

   res.status(200).json(article);
}