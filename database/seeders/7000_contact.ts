import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { ContactFactory } from 'Database/factories/ContactFactory'

export default class ContactSeeder extends BaseSeeder {
  public async run() {
    await ContactFactory.createMany(5)
  }
}
