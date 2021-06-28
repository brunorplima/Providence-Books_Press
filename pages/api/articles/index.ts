import { NextApiRequest, NextApiResponse } from "next";
import firebase, { firestore } from "../../../app/firebase/firebase";
import { Article } from "../../../app/interfaces-objects/interfaces";
import ArticlesPage from "../../articles/index";
// import articles from "./dataCreator";
import articles from './articles.json'


export default async (req: NextApiRequest, res: NextApiResponse) => {
   // const { limit, sorted } = req.query;
   // let articles: Article[] = [];
   // let articlesRef: 
   //    firebase.firestore.CollectionReference<firebase.firestore.DocumentData>
   //    | firebase.firestore.Query<firebase.firestore.DocumentData>
   //    | firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
   //    | null = null;
   
   // articlesRef = firestore.collection('articles');
   // if (sorted === 'y') {
   //    articlesRef = articlesRef.orderBy('title');
   // }
   // if (limit) {
   //    articlesRef = articlesRef.limit(Number(limit));
   // }
   // articlesRef = await articlesRef.get();
   // articlesRef.forEach(doc => {
   //    const article: Article = {
   //       ...doc.data() as Article,
   //       datePosted: new Date(doc.data().datePosted)
   //    }
   //    articles.push(article);
   // })

   // const articles: Article[] = [];
   // const artsRef = await firestore.collection('articles').orderBy('title').get();
   // artsRef.forEach(doc => articles.push(doc.data() as Article))
   const articlesWithDate: Article[] = articles.map(article => {
      const date = new Date(article.datePosted);
      return {
         ...article,
         datePosted: date
      }
   })
   const sortedArticles = articlesWithDate.sort((a, b) => {
      if (a.title > b.title) return 1
      if (a.title < b.title) return -1
      return 0;
   })

   res.status(200).json(sortedArticles);
}