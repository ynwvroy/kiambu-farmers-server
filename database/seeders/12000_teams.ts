import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { TeamFactory } from 'Database/factories/TeamFactory'

export default class TeamsSeeder extends BaseSeeder {
  public async run() {
    await TeamFactory.with('organization', 5).with('event', 5).createMany(5)
  }
}
