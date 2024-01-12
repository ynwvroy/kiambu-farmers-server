import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { SalesFactory } from 'Database/factories/SalesFactory'

export default class SalesSeeder extends BaseSeeder {
  public async run() {
    await SalesFactory.with('farmer', 5).with('product', 5).createMany(5)
  }
}
