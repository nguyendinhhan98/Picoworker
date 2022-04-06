import * as Faker from 'faker';
import { UserEntity } from '../../modules/user/user.entity';
import { define } from 'typeorm-seeding';

define(UserEntity, (faker: typeof Faker) => {
  const user = new UserEntity();
  user.id = faker.random.uuid();
  user.fullName = faker.name.findName();
  user.email = faker.internet.email();
  user.username = faker.internet.userName();
  user.password = 'Abc@123123';
  user.region = faker.address.country();
  user.role = faker.random.arrayElement(['ADMIN', 'WORKER', 'EMPLOYER']);
  return user;
});
