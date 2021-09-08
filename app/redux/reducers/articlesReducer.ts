import { Article } from "../../interfaces-objects/interfaces";
import { ARTICLES_SYNC } from "../contants";

export interface ArticlesAction {
   readonly type: typeof ARTICLES_SYNC,
   readonly payload?: Article[]
}

const articlesReducer = (articles: Article[] = [], action: ArticlesAction) => {
   if (action.type === ARTICLES_SYNC) return action.payload
   return articles
}

export default articlesReducer