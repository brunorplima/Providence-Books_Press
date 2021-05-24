import { Comment } from "../../../app/interfaces-objects/interfaces";
import users from '../users/users.json';
import articles from '../articles/articles.json';
import faker from "faker";

export default function () {
   const comments: Comment[] = [];
   const userIds = users.map(u => u._id);
   const articleIds = articles.map(art => art._id);
   for (let i = 1; i <= 333; i++) {
      const _userId = faker.random.arrayElement(userIds);
      const user = users.find(u => u._id === _userId);
      const userName = user.firstName + ' ' + user.lastName;
      const comment: Comment = {
         _id: faker.random.number({ min: 100000, max: 999999 }).toString(),
         _userId,
         _articleId: faker.random.arrayElement(articleIds),
         userName,
         body: faker.random.arrayElement([
            faker.lorem.sentences(),
            faker.lorem.paragraphs(),
            faker.lorem.paragraph(),
            faker.lorem.sentence(),
            faker.lorem.sentences(),
            faker.lorem.paragraphs()
         ]),
         dateTime: faker.date.recent()
      }
      comments.push(comment);
   }
   return comments;
}