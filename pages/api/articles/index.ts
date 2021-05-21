import { NextApiRequest, NextApiResponse } from "next";
import { Article } from "../../../app/interfaces-objects/interfaces";
import ArticlesPage from "../../articles/index";
// import articles from "./dataCreator";
import articles from './articles.json'


export default (req: NextApiRequest, res: NextApiResponse) => {
   const { limit, sorted } = req.query;
   let finalArticles: Article[] = articles.map(art => {
      const article: Article = {
         ...art,
         datePosted: new Date(art.datePosted)
      }
      return article;
   });
   
   if (sorted === 'y') {
      const comp = new ArticlesPage({articles: [], categories: []}); 
      finalArticles = comp.getSortedArticles(finalArticles)
   }
   if (limit) {
      res.status(200).json(finalArticles.filter((a, i) => i < parseInt(limit as string)));
   }
   else {
      res.status(200).json(finalArticles);
   }
}