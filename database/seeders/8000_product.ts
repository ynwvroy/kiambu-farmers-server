import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { ProductFactory } from 'Database/factories/ProductFactory'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    await ProductFactory.with('seller', 5).with('category', 5).createMany(10)
  }
}
