import { UserEntity } from '../../modules/user/user.entity';
import { Factory, Seeder } from 'typeorm-seeding';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory): Promise<any> {
    await factory(UserEntity)().createMany(10);
  }
}
