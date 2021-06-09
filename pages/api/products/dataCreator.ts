import faker from 'faker'
import Book from '../../../app/interfaces-objects/Book';
import EBook from '../../../app/interfaces-objects/EBook';
import AudioBook from '../../../app/interfaces-objects/AudioBook';
import { prototype } from 'node:events';
import Product from '../../../app/interfaces-objects/Product';

const products: Product[] = [];

let product: Book | EBook | AudioBook;

const exampleAuthors = [
   {
      name: 'Wegener, G.S.',
      id:'283-0948-1132'
   },
   {
      name: 'Van Der Jagt, A.',
      id:'039-1889-4713'
   },
   {
      name: 'De Vries, Anne',
      id:'618-1186-0295'
   },
   {
      name: 'Calvin, John',
      id:'937-39556-034'
   },
   {
      name: 'Schouten, Andrew',
      id:'039-92594-22'
   },
   {
      name: 'Beeke, Joel',
      id:'1-85893-99'
   },
   {
      name: 'Van Der Waal, C.',
      id:'132-069-2222'
   },
   {
      name: 'Alcock, Deborah',
      id:'77-99-154832'
   }
]

const publishers = ['PROVIDENCE PRESS', 'HRB', 'CROSSWAY', 'INHERITANCE PUBLICATIONS', 'RR']

const categories = ['DOCTRINE', 'CHURCH & CULTURE', 'SERMONS', 'COMMENTARIES', 'BIBLES', 'THEOLOGY', 'KIDS BOOKS', 'CIVIL GOVERNMENT', 'WORLD VIEW']

const images = [
   "https://www.bhacademic.com/wp-content/themes/useful-group/assets/svgs/placeholder-book.svg",
   "https://d827xgdhgqbnd.cloudfront.net/wp-content/uploads/2016/04/09121712/book-cover-placeholder.png",
   "https://lh3.googleusercontent.com/proxy/xzWDNXf5bqN9myVfB3vWXglNCfFDnxS3kk--3zlO6HMVicQ2g2d4rlMPPOcF7Xwif8yxMfwn1h2U2ShJFH3VU5F13GkAhB-N-J-TCVYnDQ83HIgo4ybv0lsfapQ",
   "https://www.koganpage.com/images/book-placeholder.png",
   "https://thegogiver.com/wp-content/uploads/2016/03/Go-Giver-Leader-3d-placeholder.png"
]

for (let i = 0; i < 215; i++) {
   const productType = faker.random.arrayElement(['Book', 'Book', 'Book', 'Book', 'E-book', 'E-book', 'Audio book']);
   const author = faker.random.arrayElement(exampleAuthors);

   if (productType === 'Book') {
      product = new Book(
         String(faker.random.number({ min: 10000, max: 99999 })),
         faker.commerce.productName(),
         faker.lorem.paragraphs(5, '\n'),
         faker.random.float({ min: 5.90, max: 126.99 }),
         faker.random.arrayElements(images),
         faker.random.uuid(),
         faker.random.arrayElement(categories),
         [author.id],
         faker.random.uuid(),
         author.name,
         faker.random.arrayElement(publishers),
         faker.internet.ip(),
         Number(faker.random.float({ min: 0.050, max: 2 }).toFixed(3)),
         faker.random.number(500),
         faker.lorem.words(3).split(' '),
         faker.random.arrayElement(['new', '', '', '', '', '']),
         faker.random.arrayElement([faker.lorem.paragraph(Math.ceil(Math.random() * 2)), '', '', '']),
         faker.random.arrayElement([faker.lorem.words(Math.ceil(Math.random() * 5)), '', '', '', '']),
         faker.random.arrayElement([faker.random.number(648), faker.random.number(312), faker.random.number(210), faker.random.number(120)]),
         faker.random.arrayElement([faker.lorem.word(), undefined]),
         faker.random.number({ min: 3, max: 19 }) + '+',
         faker.random.arrayElement(['Hardcover', 'Paperback', 'Paperback', 'Paperback'])
      )
   }

   else if (productType === 'E-book') {
      product = new EBook(
         String(faker.random.number({ min: 10000, max: 99999 })),
         faker.commerce.productName(),//faker.lorem.words(Math.ceil(Math.random() * 5)),
         faker.lorem.paragraphs(5, '\n'),
         faker.random.float({ min: 5.90, max: 126.99 }),
         ['https://www.bhacademic.com/wp-content/themes/useful-group/assets/svgs/placeholder-book.svg'],
         faker.random.uuid(),
         [author.id],
         faker.random.uuid(),
         faker.random.arrayElement(categories),
         author.name,
         faker.random.arrayElement(publishers),
         faker.internet.ip(),
         faker.random.arrayElements<string>(['PDF', 'RTF', 'EPUB', 'MOBI']),
         faker.lorem.words(3).split(' '),
         faker.random.arrayElement(['new', '', '', '', '', '']),
         faker.random.arrayElement([faker.lorem.paragraph(Math.ceil(Math.random() * 2)), '', '', '']),
         faker.random.arrayElement([faker.lorem.words(Math.ceil(Math.random() * 5)), '', '', '', '']),
         faker.random.arrayElement([faker.random.number(648), faker.random.number(312), faker.random.number(210), faker.random.number(120)]),
         faker.random.arrayElement([faker.lorem.word(), undefined]),
         faker.random.number({ min: 3, max: 19 }) + '+'
      );
   }

   else {
      product = new AudioBook(
         String(faker.random.number({ min: 10000, max: 99999 })),
         faker.commerce.productName(),
         faker.lorem.paragraphs(5, '\n'),
         faker.random.float({ min: 5.90, max: 126.99 }),
         ['https://www.bhacademic.com/wp-content/themes/useful-group/assets/svgs/placeholder-book.svg'],
         faker.random.uuid(),
         [author.id],
         faker.random.uuid(),
         faker.random.arrayElement(categories),
         author.name,
         faker.random.arrayElement(publishers),
         faker.internet.ip(),
         faker.name.lastName() + ', ' + faker.name.firstName(),
         faker.lorem.words(3).split(' '),
         faker.random.arrayElement(['new', '', '', '', '', '']),
         faker.random.arrayElement([faker.lorem.paragraph(Math.ceil(Math.random() * 2)), '', '', '']),
         faker.random.arrayElement([faker.lorem.words(Math.ceil(Math.random() * 5)), '', '', '', '']),
         faker.random.arrayElements<string>(['MP3']),
         `${faker.random.number(7)} hours and ${faker.random.number(59)}`,
         faker.random.arrayElement([faker.lorem.word(), undefined]),
         faker.random.number({ min: 3, max: 19 }) + '+'
      )
   }

   products.push((product as Book | EBook | AudioBook))
}

export default products