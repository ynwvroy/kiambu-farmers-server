import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { ProductCategoriesFactory } from 'Database/factories/ProductCategoriesFactory'

export default class ProductCategoriesSeeder extends BaseSeeder {
  public async run() {
    await ProductCategoriesFactory.createMany(5)
  }
}
