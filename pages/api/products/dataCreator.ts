import faker from 'faker'
import Book from '../../../app/interfaces-objects/Book';
import EBook from '../../../app/interfaces-objects/EBook';
import AudioBook from '../../../app/interfaces-objects/AudioBook';
import { prototype } from 'node:events';
import Product from '../../../app/interfaces-objects/Product';

const products: Product[] = [];

let product: Book | EBook | AudioBook;

const exampleAuthors = ['Wegener, G.S.', 'Van Der Jagt, A.', 'De Vries, Anne', 'Calvin, John', 'Schouten, Andrew', 'Beeke, Joel', 'Van Der Waal, C.', 'Alcock, Deborah']

const publishers = ['PROVIDENCE PRESS', 'HRB', 'CROSSWAY', 'INHERITANCE PUBLICATIONS', 'RR']

const categories = ['DOCTRINE', 'CHURCH & CULTURE', 'SERMONS', 'COMMENTARIES', 'BIBLES', 'THEOLOGY', 'KIDS BOOKS', 'CIVIL GOVERNMENT', 'WORLD VIEW']

for (let i = 0; i < 215; i++) {
   const productType = faker.random.arrayElement(['Book', 'Book', 'Book', 'Book', 'E-book', 'E-book', 'Audio book']);

   if (productType === 'Book') {
      product = {
         _id: String(faker.random.number({ min: 1000, max: 9999 })),
         name: faker.commerce.productName(),//faker.lorem.words(Math.ceil(Math.random() * 5)),
         images: [faker.image.imageUrl(165, 264, 'Book', true, true)],
         description: faker.commerce.productDescription(),
         price: faker.random.float({ min: 5.90, max: 126.99 }),
         weight: faker.random.float({ min: 0.050, max: 2 }).toFixed(3),
         tags: faker.lorem.words(3).split(' '),
         flag: faker.random.arrayElement(['new', '', '', '', '', '']),
         stock: faker.random.number(500),
         providenceReview: faker.random.arrayElement([faker.lorem.paragraph(Math.ceil(Math.random() * 2)), '', '', '']),
         subtitle: faker.random.arrayElement([faker.lorem.words(Math.ceil(Math.random() * 5)), '', '', '', '']),
         isbn: faker.internet.ip(),
         authors: faker.random.arrayElement(exampleAuthors),
         subject: faker.lorem.word(),
         numberPages: faker.random.arrayElement([faker.random.number(648), faker.random.number(312), faker.random.number(210), faker.random.number(120)]),
         age: faker.random.number({ min: 3, max: 19 }) + ' - 99',
         coverType: faker.random.arrayElement(['Hardcover', 'Paperback', 'Paperback', 'Paperback']),
         _publisherId: faker.random.uuid(),
         _categoryId: faker.random.uuid(),
         _authorIds: [faker.random.uuid()],
         publisher: faker.random.arrayElement(publishers),
         publicationYear: faker.random.number({ min: 1955, max: 2021 }),
         category: faker.random.arrayElement(categories)
      } as Book;
   }

   else if (productType === 'E-book') {
      product = new EBook(
         String(faker.random.number({ min: 1000, max: 9999 })),
         faker.commerce.productName(),//faker.lorem.words(Math.ceil(Math.random() * 5)),
         faker.commerce.productDescription(),
         faker.random.float({ min: 5.90, max: 126.99 }),
         [faker.image.imageUrl(165, 264, 'Book', true, true)],
         faker.random.uuid(),
         [faker.random.uuid()],
         faker.random.uuid(),
         faker.random.arrayElement(categories),
         faker.random.arrayElement(exampleAuthors),
         faker.random.arrayElement(publishers),
         faker.internet.ip(),
         faker.random.number({ min: 1955, max: 2021 }),
         faker.random.arrayElements<string>(['PDF', 'RTF', 'EPUB', 'MOBI']),
         faker.lorem.words(3).split(' '),
         faker.random.arrayElement(['new', '', '', '', '', '']),
         faker.random.arrayElement([faker.lorem.paragraph(Math.ceil(Math.random() * 2)), '', '', '']),
         faker.random.arrayElement([faker.lorem.words(Math.ceil(Math.random() * 5)), '', '', '', '']),
         faker.random.arrayElement([faker.random.number(648), faker.random.number(312), faker.random.number(210), faker.random.number(120)]),
         faker.lorem.word(),
         faker.random.number({ min: 3, max: 19 }) + ' - 99'
      );
   }

   else {
      product = new AudioBook(
         String(faker.random.number({ min: 1000, max: 9999 })),
         faker.commerce.productName(),
         faker.commerce.productDescription(),
         faker.random.float({ min: 5.90, max: 126.99 }),
         [faker.image.imageUrl(165, 264, 'Book', true, true)],
         faker.random.uuid(),
         [faker.random.uuid()],
         faker.random.uuid(),
         faker.random.arrayElement(categories),
         faker.random.arrayElement(exampleAuthors),
         faker.random.arrayElement(publishers),
         faker.internet.ip(),
         faker.random.number({ min: 1955, max: 2021 }),
         faker.name.lastName() + ', ' + faker.name.firstName(),
         faker.lorem.words(3).split(' '),
         faker.random.arrayElement(['new', '', '', '', '', '']),
         faker.random.arrayElement([faker.lorem.paragraph(Math.ceil(Math.random() * 2)), '', '', '']),
         faker.random.arrayElement([faker.lorem.words(Math.ceil(Math.random() * 5)), '', '', '', '']),
         faker.random.arrayElements<string>(['PDF', 'RTF', 'EPUB', 'MOBI']),
         new Date(0, 0, 0, faker.random.number(7), faker.random.number(59), faker.random.number(59))
      )
   }

   products.push((product as Book | EBook | AudioBook))
}

export default products