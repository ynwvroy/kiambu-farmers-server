import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Livestock from 'App/Models/Livestock'

export default class LivestockSeeder extends BaseSeeder {
  public async run() {
    await Livestock.createMany([
      {
        farmer_id: 1,
        name: 'Holstein Friesian Cow',
        type: 'Dairy',
        breed: 'Holstein Friesian',
        date_of_birth: '2021-03-15',
        sex: 'Female',
        color: 'Black and White',
        status: 'Active',
      },
      {
        farmer_id: 4,
        name: 'Boer Goat',
        type: 'Meat',
        breed: 'Boer',
        date_of_birth: '2020-12-10',
        sex: 'Male',
        color: 'White',
        status: 'Active',
      },
      {
        farmer_id: 6,
        name: 'Rhode Island Red Chicken',
        type: 'Poultry',
        breed: 'Rhode Island Red',
        date_of_birth: '2022-01-20',
        sex: 'Female',
        color: 'Red',
        status: 'Active',
      },
      {
        farmer_id: 8,
        name: 'Merino Sheep',
        type: 'Wool',
        breed: 'Merino',
        date_of_birth: '2021-07-05',
        sex: 'Male',
        color: 'White',
        status: 'Active',
      },
      {
        farmer_id: 10,
        name: 'Landrace Pig',
        type: 'Pork',
        breed: 'Landrace',
        date_of_birth: '2021-05-28',
        sex: 'Female',
        color: 'Pink',
        status: 'Active',
      },
      {
        farmer_id: 1,
        name: 'Buff Orpington Duck',
        type: 'Poultry',
        breed: 'Buff Orpington',
        date_of_birth: '2022-02-12',
        sex: 'Male',
        color: 'Buff',
        status: 'Active',
      },
      {
        farmer_id: 4,
        name: 'Alpaca',
        type: 'Fiber',
        breed: 'Huacaya',
        date_of_birth: '2021-10-10',
        sex: 'Female',
        color: 'Brown',
        status: 'Active',
      },
    ])
  }
}
