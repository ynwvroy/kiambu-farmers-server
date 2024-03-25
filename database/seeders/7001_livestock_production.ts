import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import LivestockProduction from 'App/Models/LivestockProduction'

export default class LivestockProductionSeeder extends BaseSeeder {
  public async run() {
    await LivestockProduction.createMany([
      {
        livestock_id: 1,
        date_recorded: new Date('2023-01-10'),
        description: 'Livestock appears healthy and active',
        production_type: 'Milk',
        quantity: 20,
        market_price: 50,
        profit_total: '1000',
        comments: 'Good milk production this month',
      },
      {
        livestock_id: 2,
        date_recorded: new Date('2023-01-10'),
        description: 'Livestock appears healthy and active',
        production_type: 'Meat',
        quantity: 5,
        market_price: 200,
        profit_total: '1000',
        comments: 'Sold some goats at the local market',
      },
      {
        livestock_id: 3,
        date_recorded: new Date('2023-01-10'),
        description: 'Livestock appears healthy and active',
        production_type: 'Eggs',
        quantity: 50,
        market_price: 2,
        profit_total: '100',
        comments: 'Collected eggs from the chicken coop',
      },
      {
        livestock_id: 4,
        date_recorded: new Date('2023-01-10'),
        description: 'Livestock appears healthy and active',
        production_type: 'Wool',
        quantity: 10,
        market_price: 20,
        profit_total: '200',
        comments: 'Sheared the sheep for wool',
      },
      {
        livestock_id: 5,
        date_recorded: new Date('2023-01-10'),
        description: 'Livestock appears healthy and active',
        production_type: 'Pork',
        quantity: 2,
        market_price: 300,
        profit_total: '600',
        comments: 'Sold some pigs to the butcher',
      },
      {
        livestock_id: 6,
        date_recorded: new Date('2023-01-10'),
        description: 'Livestock appears healthy and active',
        production_type: 'Eggs',
        quantity: 30,
        market_price: 2.5,
        profit_total: '75',
        comments: 'Harvested duck eggs from the coop',
      },
      {
        livestock_id: 7,
        date_recorded: new Date('2023-01-10'),
        description: 'Livestock appears healthy and active',
        production_type: 'Fiber',
        quantity: 5,
        market_price: 30,
        profit_total: '150',
        comments: 'Collected alpaca fiber for sale',
      },
    ])
  }
}
