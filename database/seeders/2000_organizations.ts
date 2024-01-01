import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { OrganizationsFactory } from 'Database/factories/OrganizationsFactory'

export default class OrganizationsSeeder extends BaseSeeder {
  public async run() {
    await OrganizationsFactory.with('user', 5).createMany(10)
  }
}
