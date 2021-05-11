import { Review } from '../../../app/interfaces-objects/interfaces'
import faker from 'faker'
import products from '../products/products.json'

let reviews: Review[] = []

for (const product of products) {
   const count = faker.random.number(8)
   for (let i = 1; i <= count; i++) {
      const review: Review = {
         _id: faker.random.uuid(),
         _productId: product._id,
         _userId: faker.random.uuid(),
         userName: faker.name.firstName() + ' ' + faker.name.lastName(),
         dateTime: faker.date.past(),
         score: faker.random.arrayElement([5, 5, 5, 5, 4, 4, 4, 4, 3, 3, 2, 1]),
         heading: faker.random.words(faker.random.number(4)),
         text: faker.random.arrayElement([faker.lorem.paragraphs(faker.random.number(3)), faker.lorem.lines(faker.random.number(3)), faker.lorem.lines(faker.random.number(3)), faker.lorem.lines(faker.random.number(3))])
      }
      
      reviews.push(review);
   }
}

export default reviews;
