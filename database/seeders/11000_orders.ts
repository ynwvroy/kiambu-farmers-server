import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { OrdersFactory } from 'Database/factories/OrdersFactory'

export default class OrderSeeder extends BaseSeeder {
  public async run() {
    await OrdersFactory.createMany(5)
  }
}
