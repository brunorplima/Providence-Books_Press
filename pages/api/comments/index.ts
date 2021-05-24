import { NextApiRequest, NextApiResponse } from "next";
import comments from './comments.json'
// import createData from './dataCreator'

export default function (req: NextApiRequest, res: NextApiResponse) {
   res.status(200).json(comments);
}