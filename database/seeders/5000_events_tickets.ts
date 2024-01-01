import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { EventsTicketsFactory } from 'Database/factories/EventsTicketsFactory'

export default class EventsTicketsSeeder extends BaseSeeder {
  public async run() {
    await EventsTicketsFactory.createMany(15)
  }
}
