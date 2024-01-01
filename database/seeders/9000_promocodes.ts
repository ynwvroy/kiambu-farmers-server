import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { PromoCodesFactory } from 'Database/factories/PromoCodesFactory'

export default class PromoCodesSeeder extends BaseSeeder {
  public async run() {
    await PromoCodesFactory.with('event', 5).createMany(5)
  }
}
