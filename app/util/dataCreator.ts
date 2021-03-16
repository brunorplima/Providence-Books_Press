import faker from 'faker'
import Book from '../interfaces-objects/Book';
const books: Book[] = [];
let book: Book;
const exampleAuthors = ['Wegener, G.S.' , 'Van Der Jagt, A.' , 'De Vries, Anne' , 'Calvin, John' , 'Schouten, Andrew' , 'Beeke, Joel' , 'Van Der Waal, C.' , 'Alcock, Deborah']
for (let i = 0; i < 215; i++) {

   book = {
      _id: faker.random.uuid(),
      name: faker.commerce.productName(),//faker.lorem.words(Math.ceil(Math.random() * 5)),
      images: [faker.image.imageUrl(165, 264, 'Book', true, true)],
      description: faker.commerce.productDescription(),
      price: faker.random.float({ min: 5.90, max: 126.99 }),
      type: faker.random.arrayElement(['Book', 'E-book', 'Audio book']),
      weight: faker.random.float({ min: 0.050, max: 2 }).toFixed(3),
      tags: faker.lorem.words(3).split(' '),
      flag: faker.random.arrayElement(['new', '']),
      stock: faker.random.number(500),
      providenceReview: faker.lorem.paragraph(Math.ceil(Math.random() * 2)),
      subtitle: faker.lorem.words(Math.ceil(Math.random() * 5)),
      isbn: faker.internet.ip(),
      authors: faker.random.arrayElement(exampleAuthors),
      subject: faker.lorem.word(),
      numberPages: faker.random.number(648),
      age: faker.random.number({ min: 3, max: 19 }) + ' - 19',
      coverType: faker.random.arrayElement(['Hardcover', 'Paperback']),
      _publisherId: faker.random.uuid(),
      _categoryId: faker.random.uuid(),
      _authorIds: [faker.random.uuid()],
      publisher: faker.random.arrayElement(['PROVIDENCE PRESS', 'HRB', 'CROSSWAY', 'INHERITANCE PUBLICATIONS', 'RR']),
      publicationYear: faker.random.number({ min: 1955, max: 2021 }),
      category: faker.random.arrayElement(['DOCTRINE', 'CHURCH & CULTURE', 'SERMONS', 'COMMENTARIES', 'BIBLES', 'THEOLOGY', 'KIDS BOOKS', 'CIVIL GOVERNMENT', 'WORLD VIEW'])
   }
   books.push(book)
}

export default books