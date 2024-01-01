import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { TaskFactory } from 'Database/factories/TasksFactory'

export default class TasksSeeder extends BaseSeeder {
  public async run() {
    await TaskFactory.with('team', 5).with('creator').with('assignee').createMany(5)
  }
}
