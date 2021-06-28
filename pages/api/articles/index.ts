import { NextApiRequest, NextApiResponse } from "next";
import firebase, { firestore } from "../../../app/firebase/firebase";
import { Article } from "../../../app/interfaces-objects/interfaces";
import ArticlesPage from "../../articles/index";
// import articles from "./dataCreator";
import articles from './articles.json'


export default async (req: NextApiRequest, res: NextApiResponse) => {
   const { limit, sorted } = req.query;
   // let finalArticles: Article[] = [];
   let articles: Article[] = [];
   let articlesRef: 
      firebase.firestore.CollectionReference<firebase.firestore.DocumentData>
      | firebase.firestore.Query<firebase.firestore.DocumentData>
      | firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
      | null = null;
   
   articlesRef = firestore.collection('articles');
   if (sorted === 'y') {
      // const comp = new ArticlesPage({articles: [], categories: []}); 
      // finalArticles = comp.getSortedArticles(finalArticles)
      articlesRef = articlesRef.orderBy('title');
   }
   if (limit) {
      // res.status(200).json(finalArticles.filter((a, i) => i < parseInt(limit as string)));
      articlesRef = articlesRef.limit(Number(limit));
   }
   // else {
   //    res.status(200).json(finalArticles);
   // }
   articlesRef = await articlesRef.get();
   articlesRef.forEach(doc => {
      const article: Article = {
         ...doc.data() as Article,
         datePosted: new Date(doc.data().datePosted)
      }
      articles.push(article);
   })

   res.status(200).json(articles);
}