import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Crop from 'App/Models/Crops'

export default class CropSeeder extends BaseSeeder {
  public async run() {
    await Crop.createMany([
      {
        farmer_id: 1,
        name: 'Maize',
        variety: 'Hybrid',
        planted_date: '2023-03-01',
        harvest_date: '2023-07-01',
        actual_yield: 10000,
        amount_profit: 'High',
        comments: 'Good crop yield this season',
      },
      {
        farmer_id: 4,
        name: 'Wheat',
        variety: 'Red Winter Wheat',
        planted_date: '2023-10-01',
        harvest_date: '2024-05-01',
        actual_yield: 8000,
        amount_profit: 'Moderate',
        comments: 'Some pest issues encountered during growth',
      },
      {
        farmer_id: 6,
        name: 'Rice',
        variety: 'Basmati',
        planted_date: '2023-06-01',
        harvest_date: '2023-10-01',
        actual_yield: 6000,
        amount_profit: 'High',
        comments: 'Good water management resulted in excellent yield',
      },
      {
        farmer_id: 8,
        name: 'Soybeans',
        variety: 'GMO',
        planted_date: '2023-04-01',
        harvest_date: '2023-08-01',
        actual_yield: 7500,
        amount_profit: 'High',
        comments: 'Soybeans performed well in rotation with maize',
      },
      {
        farmer_id: 10,
        name: 'Barley',
        variety: 'Malting Barley',
        planted_date: '2023-09-01',
        harvest_date: '2024-03-01',
        actual_yield: 7000,
        amount_profit: 'Moderate',
        comments: 'Used for brewing purposes',
      },
      {
        farmer_id: 1,
        name: 'Potatoes',
        variety: 'Russet Burbank',
        planted_date: '2023-11-01',
        harvest_date: '2024-06-01',
        actual_yield: 12000,
        amount_profit: 'High',
        comments: 'Storage potatoes with good market demand',
      },
      {
        farmer_id: 4,
        name: 'Tomatoes',
        variety: 'Roma',
        planted_date: '2023-02-01',
        harvest_date: '2023-06-01',
        actual_yield: 9000,
        amount_profit: 'High',
        comments: 'Grown in greenhouse for better control over pests',
      },
    ])
  }
}
