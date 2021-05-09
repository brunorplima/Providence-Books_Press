import { NextApiRequest, NextApiResponse } from "next";
// import articles from "./dataCreator";
import articles from './articles.json'


export default (req: NextApiRequest, res: NextApiResponse) => {
   res.status(200).json(articles);
}