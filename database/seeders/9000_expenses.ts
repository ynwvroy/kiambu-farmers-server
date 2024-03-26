import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Expense from 'App/Models/Expenses'

export default class ExpenseSeeder extends BaseSeeder {
  public async run() {
    await Expense.createMany([
      {
        farmer_id: 1,
        amount: 500,
        description: 'Seed purchase',
        comments: 'Bought seeds for planting next season',
      },
      {
        farmer_id: 4,
        amount: 300,
        description: 'Fertilizer',
        comments: 'Purchased fertilizer for crop fertilization',
      },
      {
        farmer_id: 6,
        amount: 200,
        description: 'Livestock feed',
        comments: 'Bought feed for the farm animals',
      },
      {
        farmer_id: 8,
        amount: 1000,
        description: 'Equipment maintenance',
        comments: 'Serviced and repaired farm machinery',
      },
      {
        farmer_id: 10,
        amount: 700,
        description: 'Fuel',
        comments: 'Bought fuel for farm vehicles and equipment',
      },
      {
        farmer_id: 1,
        amount: 400,
        description: 'Pesticides',
        comments: 'Purchased pesticides for pest control',
      },
      {
        farmer_id: 4,
        amount: 600,
        description: 'Irrigation system repair',
        comments: 'Fixed irrigation system pipes and valves',
      },
      {
        farmer_id: 6,
        amount: 800,
        description: 'Labor wages',
        comments: 'Paid wages to farm workers',
      },
      {
        farmer_id: 8,
        amount: 250,
        description: 'Packaging materials',
        comments: 'Bought packaging materials for products',
      },
      {
        farmer_id: 10,
        amount: 350,
        description: 'Utilities',
        comments: 'Paid for electricity and water bills',
      },
    ])
  }
}
