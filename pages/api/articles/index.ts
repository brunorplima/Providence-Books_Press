import { NextApiRequest, NextApiResponse } from "next";
import firebase, { firestore } from "../../../app/firebase/firebase";
import { Article } from "../../../app/interfaces-objects/interfaces";
import ArticlesPage from "../../articles/index";
// import articles from "./dataCreator";
import articles from './articles.json'


export default async (req: NextApiRequest, res: NextApiResponse) => {
   const { limit } = req.query;

   const articlesWithDate: Article[] = articles.map(article => {
      const date = new Date(article.datePosted);
      return {
         ...article,
         datePosted: date
      }
   })
   let sortedArticles = articlesWithDate.sort((a, b) => {
      if (a.title > b.title) return 1
      if (a.title < b.title) return -1
      return 0;
   })
   if (limit && (limit as string).match(/[0-9]/)) {
      const limitInt = Number(limit);
      sortedArticles = sortedArticles.slice(0, limitInt);
   }

   res.status(200).json(sortedArticles);
}