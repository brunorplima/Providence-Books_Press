import { NextApiRequest, NextApiResponse } from "next";
import { Review } from "../../../app/interfaces-objects/interfaces";
import reviewsData from './reviews.json'
// import reviewsData from './dataCreator'



export default (req: NextApiRequest, res: NextApiResponse) => {
   const reviews = reviewsData as Review[];
   res.status(200).json(reviews);
}