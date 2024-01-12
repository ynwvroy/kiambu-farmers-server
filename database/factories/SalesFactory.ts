import Factory from '@ioc:Adonis/Lucid/Factory'
import Sales from 'App/Models/Sales'
import { UserFactory } from './UserFactory'
import { ProductFactory } from './ProductFactory'

export const SalesFactory = Factory.define(Sales, ({ faker }) => {
  return {
    payment_transaction_id: faker.finance.accountNumber(),
    date: faker.date.future(),
    payment_method: faker.finance.transactionType(),
    payment_received_date: faker.date.future(),
    comments: faker.lorem.sentence(),
    total_amount: faker.finance.amount(),
    units_sold: faker.number.int({ min: 1, max: 10 }),
    payment_status: faker.helpers.arrayElement(['paid', 'pending']),
  }
})
  .relation('farmer', () => UserFactory)
  .relation('product', () => ProductFactory)
  .build()
