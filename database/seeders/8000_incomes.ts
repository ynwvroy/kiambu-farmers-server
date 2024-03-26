import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Income from 'App/Models/Income'

export default class IncomeSeeder extends BaseSeeder {
  public async run() {
    await Income.createMany([
      {
        farmer_id: 1,
        amount: 1000,
        description: 'Sale of crops',
        comments: 'Good harvest this season',
      },
      {
        farmer_id: 4,
        amount: 500,
        description: 'Livestock sales',
        comments: 'Sold some cattle at the market',
      },
      {
        farmer_id: 6,
        amount: 300,
        description: 'Miscellaneous income',
        comments: 'Income from other sources',
      },
      {
        farmer_id: 8,
        amount: 800,
        description: 'Crop sales',
        comments: 'Sold excess produce at the local market',
      },
      {
        farmer_id: 10,
        amount: 1200,
        description: 'Livestock auction',
        comments: 'Participated in a livestock auction',
      },
      {
        farmer_id: 1,
        amount: 400,
        description: 'Fishing income',
        comments: 'Sold fish caught from the farm pond',
      },
      {
        farmer_id: 4,
        amount: 600,
        description: 'Consulting services',
        comments: 'Provided agricultural consulting services',
      },
      {
        farmer_id: 6,
        amount: 1500,
        description: 'Contract farming',
        comments: 'Income from a contract farming agreement',
      },
      {
        farmer_id: 8,
        amount: 250,
        description: 'Honey sales',
        comments: 'Sold honey harvested from beehives',
      },
      {
        farmer_id: 10,
        amount: 700,
        description: 'Vegetable sales',
        comments: 'Sold vegetables from the farm stand',
      },
      {
        farmer_id: 1,
        amount: 1800,
        description: 'Agro-tourism income',
        comments: 'Income from farm tours and activities',
      },
      {
        farmer_id: 4,
        amount: 900,
        description: 'Crop subsidies',
        comments: 'Received government subsidies for crop cultivation',
      },
      {
        farmer_id: 6,
        amount: 1000,
        description: 'Greenhouse produce sales',
        comments: 'Sold produce grown in the greenhouse',
      },
    ])
  }
}
