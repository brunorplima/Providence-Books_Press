import faker from 'faker';
import { User } from '../../../app/interfaces-objects/interfaces';

export default function () {
   const users: any[] = [];
   for (let i = 1; i <= 630; i++) {
      const user: any = {
         _id: faker.random.number({ min: 100000, max: 999999}).toString(),
         firstName: faker.name.firstName(),
         lastName: faker.name.lastName(),
         email: faker.internet.email(),
         address: i % 5 === 0 ? undefined : {
            main: faker.address.streetAddress(),
            city: faker.address.city(),
            stateProvince: faker.address.state(),
            country: faker.address.country(),
            zipCode: faker.address.zipCode(),
            secondary: faker.random.arrayElement([undefined, undefined, faker.address.secondaryAddress()])
         },
         primaryContactNumber: faker.random.arrayElement([faker.phone.phoneNumber(), faker.phone.phoneNumber(), faker.phone.phoneNumber(), faker.phone.phoneNumber(), undefined]),
         secondaryContactNumber: faker.random.arrayElement([undefined, undefined, undefined, faker.phone.phoneNumber(), faker.phone.phoneNumber()]),
         gender: faker.random.arrayElement([undefined, undefined, faker.random.arrayElement(['Male', 'Female'])]),
         dateOfBirth: faker.date.past(),
         since: faker.date.recent(),
         isCustomer: faker.random.arrayElement([false, true, true])
      }
      users.push(user);
   }
   return users;
}