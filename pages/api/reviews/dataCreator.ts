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
         heading: faker.random.arrayElement([faker.random.words(faker.random.number(6)), faker.random.words(3), '']),
         text: faker.random.arrayElement([
            faker.lorem.paragraphs(faker.random.number({ min: 1, max: 3 })),
            faker.lorem.lines(faker.random.number({ min: 1, max: 3 })),
            faker.lorem.lines(faker.random.number({ min: 1, max: 3 })),
            faker.lorem.sentences(faker.random.number({ min: 1, max: 3 })),
            faker.lorem.sentences(faker.random.number({ min: 1, max: 4 })),
            faker.lorem.sentence(),
            faker.lorem.sentence(),
            faker.lorem.sentence()
         ])
      }

      reviews.push(review);
   }
}

export default reviews;
