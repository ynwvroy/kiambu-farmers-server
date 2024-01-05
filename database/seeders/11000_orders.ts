import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { OrdersFactory } from 'Database/factories/OrdersFactory'

export default class OrderSeeder extends BaseSeeder {
  public async run() {
    await OrdersFactory.with('seller', 2).with('buyer', 2).with('product', 2).createMany(5)
  }
}
