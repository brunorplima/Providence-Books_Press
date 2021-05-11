import faker, { fake } from "faker";
import { Article } from "../../../app/interfaces-objects/interfaces";


const articles: Article[] = [];

for (let i = 1; i <= 95; i++) {
   const article: Article = {
      _id: String(faker.random.number({ min: 10000, max: 99999 })),
      author: {
         name: `${faker.name.lastName()}, ${faker.name.firstName()}`,
         credential: faker.random.arrayElement(['Pr.', 'Mr.', 'Mrs.', 'Pb.', 'Dc.', 'Dr.']),
         about: i % 3 === 0 ? faker.lorem.paragraph() : undefined
      },
      category: faker.random.arrayElement(['Soteorology', 'Creeds and confessions', 'Worship service', 'Lord\'s Day', 'Christology', 'Predestination', 'Sola Scriptura', 'Christian life', 'Education', 'Eschatology', 'Sermons']),
      datePosted: faker.date.past(),
      image: faker.random.arrayElement([
         'https://thumbs.dreamstime.com/b/concept-open-magic-book-pages-water-land-small-child-fantasy-nature-learning-copy-space-166401875.jpg',
         'https://scx2.b-cdn.net/gfx/news/2019/2-nature.jpg',
         'https://566259-1826367-raikfcquaxqncofqfm.stackpathdns.com/wp-content/uploads/2018/01/turkey-3048299_1920-1366x550.jpg',
         'https://cdn-prod.medicalnewstoday.com/content/images/articles/325/325466/man-walking-dog.jpg',
         'https://llandscapes-10674.kxcdn.com/wp-content/uploads/2020/02/photography-quotes.jpg',
         'https://www.meissl.com/media/images/8f24db1f/schweiz.jpg',
         'https://xoxobella.com/wp-content/uploads/2020/08/instagram_captions_for_nature_photos-3.jpg',
         'http://www.natureimagesawards.com/wp-content/uploads/2019/05/archway-in-a-pod.jpg',
         'https://seoimgak.mmtcdn.com/blog/sites/default/files/images/Lake-Louise.jpg',
         'https://i.ytimg.com/vi/IUN664s7N-c/maxresdefault.jpg',
         'https://loveincorporated.blob.core.windows.net/contentimages/gallery/e66eddfd-1ae7-4dab-8fb1-a9e3ed5e4577-pamukke-pools-lede.jpg',
         'https://ichef.bbci.co.uk/news/976/cpsprodpb/3ED6/production/_106768061_gettyimages-1126199440.jpg',
         'https://thumbs.dreamstime.com/b/scenic-nature-landscape-path-near-lake-forest-path-tunnel-trees-near-lake-scenic-nature-autumn-landscape-panorama-view-115358410.jpg',
         'https://i.ytimg.com/vi/T75IKSXVXlc/maxresdefault.jpg',
      ]),
      title: faker.lorem.words(faker.random.arrayElement([faker.random.number({ min: 2, max: 5 }), faker.random.number({ min: 3, max: 4 })])),
      subtitle: i % 4 === 0 ? faker.lorem.words(faker.random.arrayElement([faker.random.number({ min: 2, max: 7 }), faker.random.number({ min: 3, max: 6 })])) : undefined,
      body: faker.lorem.paragraphs(faker.random.number({ min: 7, max: 30 }))
   }

   articles.push(article);
}

export default articles;