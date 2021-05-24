import { NextApiRequest, NextApiResponse } from "next";
import { Gender, User } from "../../../app/interfaces-objects/interfaces";
import usersJSON from './users.json';

export default function (req:NextApiRequest, res: NextApiResponse) {
   const { _id } = req.query;
   const users: User[] = usersJSON.map(u => {
      return {
         ...u,
         dateOfBirth: new Date(u.dateOfBirth),
         since: new Date(u.since),
         gender: u.gender as Gender
      }
   })

   res.status(200).json(users.filter(u => u._id === _id));
}