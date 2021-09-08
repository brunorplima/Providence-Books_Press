import { Article } from "../../interfaces-objects/interfaces";
import { ARTICLES_SYNC } from "../contants";
import { ArticlesAction } from "../reducers/articlesReducer";

export const articlesFetchAction = (articles: Article[]): ArticlesAction => ({
   type: ARTICLES_SYNC,
   payload: articles
})