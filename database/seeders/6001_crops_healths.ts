import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import CropHealth from 'App/Models/CropHealth'

export default class CropHealthSeeder extends BaseSeeder {
  public async run() {
    await CropHealth.createMany([
      {
        crop_id: 1,
        date_recorded: new Date('2023-04-10'),
        input_type: 'Fertilizer',
        quantity_applied: '50 kg',
        application_method: 'Broadcasting',
        cost: 100,
        comments: 'Applied fertilizer during vegetative stage',
      },
      {
        crop_id: 2,
        date_recorded: new Date('2023-05-15'),
        input_type: 'Pesticide',
        quantity_applied: '5 liters',
        application_method: 'Spraying',
        cost: 80,
        comments: 'Controlled aphid infestation in wheat field',
      },
      {
        crop_id: 3,
        date_recorded: new Date('2023-07-20'),
        input_type: 'Herbicide',
        quantity_applied: '3 liters',
        application_method: 'Spot spraying',
        cost: 60,
        comments: 'Weed control in rice paddies',
      },
      {
        crop_id: 4,
        date_recorded: new Date('2023-06-05'),
        input_type: 'Fungicide',
        quantity_applied: '2 kg',
        application_method: 'Dusting',
        cost: 50,
        comments: 'Prevented fungal disease in soybean crop',
      },
      {
        crop_id: 5,
        date_recorded: new Date('2023-08-25'),
        input_type: 'Fertilizer',
        quantity_applied: '70 kg',
        application_method: 'Side dressing',
        cost: 120,
        comments: 'Boosted barley yield with additional fertilizer',
      },
      {
        crop_id: 6,
        date_recorded: new Date('2023-09-10'),
        input_type: 'Pesticide',
        quantity_applied: '8 liters',
        application_method: 'Fogging',
        cost: 100,
        comments: 'Controlled potato late blight outbreak',
      },
      {
        crop_id: 7,
        date_recorded: new Date('2023-05-20'),
        input_type: 'Fungicide',
        quantity_applied: '3 kg',
        application_method: 'Spraying',
        cost: 70,
        comments: 'Prevented tomato blight in greenhouse',
      },
    ])
  }
}
