import { Factory, Seeder } from "typeorm-seeding";
import { User } from "@model/user";

export default class InitialDatabaseSeed implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(User)().createMany(15);
  }
}