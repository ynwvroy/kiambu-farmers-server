import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { EventsFactory } from 'Database/factories/EventsFactory'

export default class EventsSeeder extends BaseSeeder {
  public async run() {
    await EventsFactory.with('category', 5).with('organization', 5).createMany(5)
  }
}
