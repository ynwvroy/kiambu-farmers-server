import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Expense from 'App/Models/Expenses'

export default class ExpenseSeeder extends BaseSeeder {
  public async run() {
    await Expense.createMany([
      {
        amount: 500,
        description: 'Seed purchase',
        comments: 'Bought seeds for planting next season',
      },
      {
        amount: 300,
        description: 'Fertilizer',
        comments: 'Purchased fertilizer for crop fertilization',
      },
      {
        amount: 200,
        description: 'Livestock feed',
        comments: 'Bought feed for the farm animals',
      },
      {
        amount: 1000,
        description: 'Equipment maintenance',
        comments: 'Serviced and repaired farm machinery',
      },
      {
        amount: 700,
        description: 'Fuel',
        comments: 'Bought fuel for farm vehicles and equipment',
      },
      {
        amount: 400,
        description: 'Pesticides',
        comments: 'Purchased pesticides for pest control',
      },
      {
        amount: 600,
        description: 'Irrigation system repair',
        comments: 'Fixed irrigation system pipes and valves',
      },
      {
        amount: 800,
        description: 'Labor wages',
        comments: 'Paid wages to farm workers',
      },
      {
        amount: 250,
        description: 'Packaging materials',
        comments: 'Bought packaging materials for products',
      },
      {
        amount: 350,
        description: 'Utilities',
        comments: 'Paid for electricity and water bills',
      },
    ])
  }
}
