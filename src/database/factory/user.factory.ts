import { Faker } from "@faker-js/faker";
import { User } from "@model/user";
import { define } from "typeorm-seeding";
import * as bcrypt from 'bcrypt';

define(User, (faker: Faker) => {
  const user = new User();
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  user.setName(`${firstName} ${lastName}`);
  user.setEmail(`${firstName.toLowerCase()}@gmail.com`);
  user.setBalance(1000);
  user.setRole('client')
  user.setPassword(bcrypt.hashSync('password', 10))
  return user;
});