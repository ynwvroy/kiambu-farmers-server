import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { EventsCommentsFactory } from 'Database/factories/EventsCommentsFactory'

export default class EventsComments extends BaseSeeder {
  public async run() {
    await EventsCommentsFactory.with('event', 5).createMany(5)
  }
}
