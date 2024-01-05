import Factory from '@ioc:Adonis/Lucid/Factory'
import Sales from 'App/Models/Sales'
import { UserFactory } from './UserFactory'

export const SalesFactory = Factory.define(Sales, ({ faker }) => {
  return {
    description: faker.finance.transactionDescription(),
    transaction_id: faker.number.int({ min: 100, max: 1000 }),
    date: faker.date.future(),
  }
})
  .relation('user', () => UserFactory)
  .build()
