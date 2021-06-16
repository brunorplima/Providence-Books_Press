import { NextApiRequest, NextApiResponse } from "next";
import { Review } from "../../../app/interfaces-objects/interfaces";
import reviewsJSON from './reviews.json';

export default function (req: NextApiRequest, res: NextApiResponse) {
   const { _id } = req.query;

   const reviews: Review[] = reviewsJSON.filter(rev => rev._productId === _id);
   res.status(200).json(reviews);
}