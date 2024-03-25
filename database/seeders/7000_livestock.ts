import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Livestock from 'App/Models/Livestock'

export default class LivestockSeeder extends BaseSeeder {
  public async run() {
    await Livestock.createMany([
      {
        name: 'Holstein Friesian Cow',
        type: 'Dairy',
        breed: 'Holstein Friesian',
        date_of_birth: '2021-03-15',
        sex: 'Female',
        color: 'Black and White',
        status: 'Active',
      },
      {
        name: 'Boer Goat',
        type: 'Meat',
        breed: 'Boer',
        date_of_birth: '2020-12-10',
        sex: 'Male',
        color: 'White',
        status: 'Active',
      },
      {
        name: 'Rhode Island Red Chicken',
        type: 'Poultry',
        breed: 'Rhode Island Red',
        date_of_birth: '2022-01-20',
        sex: 'Female',
        color: 'Red',
        status: 'Active',
      },
      {
        name: 'Merino Sheep',
        type: 'Wool',
        breed: 'Merino',
        date_of_birth: '2021-07-05',
        sex: 'Male',
        color: 'White',
        status: 'Active',
      },
      {
        name: 'Landrace Pig',
        type: 'Pork',
        breed: 'Landrace',
        date_of_birth: '2021-05-28',
        sex: 'Female',
        color: 'Pink',
        status: 'Active',
      },
      {
        name: 'Buff Orpington Duck',
        type: 'Poultry',
        breed: 'Buff Orpington',
        date_of_birth: '2022-02-12',
        sex: 'Male',
        color: 'Buff',
        status: 'Active',
      },
      {
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
