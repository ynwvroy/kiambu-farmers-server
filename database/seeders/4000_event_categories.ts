import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { EventCategoriesFactory } from 'Database/factories/EventCategoriesFactory'

export default class EventCategoriesSeeder extends BaseSeeder {
  public async run() {
    await EventCategoriesFactory.createMany(5)
  }
}
