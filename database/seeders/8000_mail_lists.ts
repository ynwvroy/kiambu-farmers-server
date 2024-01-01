import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { MailListFactory } from 'Database/factories/MailListFactory'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    await MailListFactory.createMany(10)
  }
}
