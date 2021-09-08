import { NextApiRequest, NextApiResponse } from "next";
import { Gender, User } from "../../../app/interfaces-objects/interfaces";
// import createDate from './dataCreator'
import usersJSON from './users.json'

export default function (req: NextApiRequest, res: NextApiResponse) {
   const users: any[] = usersJSON.map((user) => {
      return {
         ...user,
         dateOfBirth: new Date(user.dateOfBirth),
         since: new Date(user.since),
         gender: user.gender as Gender
      }
   });
   res.status(200).json(users);
}