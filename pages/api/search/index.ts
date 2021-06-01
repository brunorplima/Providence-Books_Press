import { NextApiRequest, NextApiResponse } from "next";
import products from '../products/products.json';
import articles from '../articles/articles.json';
import Product from "../../../app/interfaces-objects/Product";
import { Article } from "../../../app/interfaces-objects/interfaces";
import { Results } from "../../search-results";
import { ARTICLES, BOOKS } from "../../../app/components/modules/search-results/constants";

export default function (req: NextApiRequest, res: NextApiResponse) {
   const { search } = req.query;
   const searchRegex = new RegExp((search as string), 'i');

   const matchedProducts: Product[] = products.filter(prod => {
      const nameMatches = searchRegex.test(prod.name);
      const subtitleMatches = searchRegex.test(prod.subtitle);
      const categoryMatches = searchRegex.test(prod.category);
      
      return nameMatches || subtitleMatches || categoryMatches;
   });

   const matchedArticles: Article[] = getArticlesWithDateType(articles).filter(art => {
      const titleMatches = searchRegex.test(art.title);
      const subtitleMatches = searchRegex.test(art.subtitle);
      const categoryMatches = searchRegex.test(art.category);
      return titleMatches || subtitleMatches || categoryMatches;
   });
   const results: Results = {
      products: {
         name: BOOKS,
         itemList: matchedProducts
      },
      articles: {
         name: ARTICLES,
         itemList: matchedArticles
      }
   }
   res.status(200).json(results);
}

function getArticlesWithDateType(articles: any[]) {
   return articles.map(art => {
      const article: Article = {
         ...art,
         datePosted: new Date(art.datePosted)
      }
      return article;
   });
}