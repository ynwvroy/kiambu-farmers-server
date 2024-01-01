import Factory from '@ioc:Adonis/Lucid/Factory'
import PromoCodes from 'App/Models/PromoCodes'
import { EventsFactory } from './EventsFactory'

export const PromoCodesFactory = Factory.define(PromoCodes, ({ faker }) => {
  return {
    description: faker.company.name(),
    code: faker.string.alphanumeric(10),
    is_valid: faker.datatype.boolean(),
    valid_until: faker.date.future(),
    type_of_use: faker.helpers.arrayElement([
      'single_use',
      'multiple_use',
      'first_time_user',
      'referral',
    ]),
    amount: faker.number.int({ min: 1, max: 1000 }),
    currency: faker.helpers.arrayElement(['USD', 'EUR', 'GBP', 'KSH']),
    redemption_count: faker.number.int({ min: 1, max: 100 }),
    usage_limit_per_person: faker.number.int({ min: 1, max: 100 }),
  }
})
  .relation('event', () => EventsFactory)
  .build()
