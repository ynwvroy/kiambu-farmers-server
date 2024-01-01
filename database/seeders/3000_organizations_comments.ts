import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { OrganizationsCommentsFactory } from 'Database/factories/OrganizationsCommentsFactory'

export default class EventsComments extends BaseSeeder {
  public async run() {
    await OrganizationsCommentsFactory.with('organization', 5).createMany(5)
  }
}
