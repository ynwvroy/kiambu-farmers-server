import Factory from '@ioc:Adonis/Lucid/Factory'
import Orders from 'App/Models/Orders'
import { UserFactory } from './UserFactory'
import { ProductFactory } from './ProductFactory'

export const OrdersFactory = Factory.define(Orders, ({ faker }) => {
  return {
    tracking_number: faker.number.int({ min: 1000, max: 10000 }),
    quantity: faker.number.int({ min: 1, max: 10 }),
    total_price: faker.number.int({ min: 100, max: 1000 }),
    status: faker.helpers.arrayElement(['pending', 'processing', 'shipped', 'delivered']),
    payment_method: faker.helpers.arrayElement([
      'cash',
      'credit_card',
      'debit_card',
      'mobile_money',
    ]),
    payment_transaction_id: faker.number.int({ min: 1000, max: 10000 }),
    comments: faker.lorem.paragraph(),
    delivery_address: faker.location.streetAddress(),
  }
})
  .relation('seller', () => UserFactory)
  .relation('buyer', () => UserFactory)
  .relation('product', () => ProductFactory)
  .build()
