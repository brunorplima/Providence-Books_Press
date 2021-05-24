import { NextApiRequest, NextApiResponse } from "next";
import { Comment } from "../../../app/interfaces-objects/interfaces";
import comments from './comments.json';

export default function (req: NextApiRequest, res: NextApiResponse) {
   const { _articleId } = req.query;
   const articleComments: Comment[] = comments.map((comm) => {
      return { ...comm, dateTime: new Date(comm.dateTime) }
   });
   const currentArticleComments: Comment[] = articleComments.filter(artComm => artComm._articleId === _articleId);
   res.status(200).json(currentArticleComments);
}