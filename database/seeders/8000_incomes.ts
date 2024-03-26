import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Income from 'App/Models/Income'

export default class IncomeSeeder extends BaseSeeder {
  public async run() {
    await Income.createMany([
      {
        amount: 1000,
        description: 'Sale of crops',
        comments: 'Good harvest this season',
      },
      {
        amount: 500,
        description: 'Livestock sales',
        comments: 'Sold some cattle at the market',
      },
      {
        amount: 300,
        description: 'Miscellaneous income',
        comments: 'Income from other sources',
      },
      {
        amount: 800,
        description: 'Crop sales',
        comments: 'Sold excess produce at the local market',
      },
      {
        amount: 1200,
        description: 'Livestock auction',
        comments: 'Participated in a livestock auction',
      },
      {
        amount: 400,
        description: 'Fishing income',
        comments: 'Sold fish caught from the farm pond',
      },
      {
        amount: 600,
        description: 'Consulting services',
        comments: 'Provided agricultural consulting services',
      },
      {
        amount: 1500,
        description: 'Contract farming',
        comments: 'Income from a contract farming agreement',
      },
      {
        amount: 250,
        description: 'Honey sales',
        comments: 'Sold honey harvested from beehives',
      },
      {
        amount: 700,
        description: 'Vegetable sales',
        comments: 'Sold vegetables from the farm stand',
      },
      {
        amount: 1800,
        description: 'Agro-tourism income',
        comments: 'Income from farm tours and activities',
      },
      {
        amount: 900,
        description: 'Crop subsidies',
        comments: 'Received government subsidies for crop cultivation',
      },
      {
        amount: 1000,
        description: 'Greenhouse produce sales',
        comments: 'Sold produce grown in the greenhouse',
      },
    ])
  }
}
