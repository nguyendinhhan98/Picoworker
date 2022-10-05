import { faker } from '@faker-js/faker';
import { UserEntity } from '../../modules/user/user.entity';
import { define } from 'typeorm-seeding';

define(UserEntity, () => {
  const user = new UserEntity();
  user.id = faker.datatype.uuid();
  user.fullName = faker.name.fullName();
  user.email = faker.internet.email();
  user.username = faker.internet.userName();
  user.password = 'Abc@123123';
  user.region = faker.address.country();
  user.role = faker.helpers.arrayElement(['ADMIN', 'WORKER', 'EMPLOYER']);
  return user;
});
