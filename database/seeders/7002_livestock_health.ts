import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import LivestockHealth from 'App/Models/LivestockHealth'

export default class LivestockHealthSeeder extends BaseSeeder {
  public async run() {
    await LivestockHealth.createMany([
      {
        livestock_id: 1,
        date_recorded: new Date('2023-01-10'),
        description: 'Vaccinated against common diseases',
        treatment: 'Administered antibiotics for minor infection',
        vaccination: 'Yes',
        medication: 'Yes',
        comments: 'Livestock appears healthy and active',
      },
      {
        livestock_id: 2,
        date_recorded: new Date('2023-01-10'),
        description: 'Received routine check-up from veterinarian',
        treatment: 'Trimmed hooves and administered dewormer',
        vaccination: 'Yes',
        medication: 'No',
        comments: 'No health concerns observed',
      },
      {
        livestock_id: 3,
        date_recorded: new Date('2023-01-10'),
        description: 'Treated for respiratory infection',
        treatment: 'Prescribed antibiotics and monitored closely',
        vaccination: 'No',
        medication: 'Yes',
        comments: 'Recovering well after treatment',
      },
      {
        livestock_id: 4,
        date_recorded: new Date('2023-01-10'),
        description: 'Administered vitamins and supplements',
        treatment: 'Provided additional feed for weight gain',
        vaccination: 'No',
        medication: 'No',
        comments: 'Livestock needs to gain more weight',
      },
      {
        livestock_id: 5,
        date_recorded: new Date('2023-01-10'),
        description: 'Received dental check-up and cleaning',
        treatment: 'Removed tartar buildup and addressed dental issues',
        vaccination: 'Yes',
        medication: 'No',
        comments: 'Improvement in dental health observed',
      },
    ])
  }
}
