import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { CareersFactory } from 'Database/factories/CareersFactory'

export default class CareerSeeder extends BaseSeeder {
  public async run() {
    await CareersFactory.createMany(5)
  }
}
