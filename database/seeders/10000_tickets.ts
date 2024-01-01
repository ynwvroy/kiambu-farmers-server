import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { TicketsFactory } from 'Database/factories/TicketsFactory'

export default class TicketsSeeder extends BaseSeeder {
  public async run() {
    await TicketsFactory.with('events', 5).with('promo_codes', 5).with('user', 5).createMany(5)
  }
}
