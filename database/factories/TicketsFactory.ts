import Factory from '@ioc:Adonis/Lucid/Factory'
import Tickets from 'App/Models/Tickets'
import { UserFactory } from './UserFactory'
import { EventsFactory } from './EventsFactory'
import { PromoCodesFactory } from './PromoCodesFactory'

export const TicketsFactory = Factory.define(Tickets, ({ faker }) => {
  return {
    description: faker.company.catchPhraseDescriptor(),
    has_promo_code: faker.datatype.boolean(),
    amount_to_pay: faker.number.int({ min: 1, max: 1000 }),
    discount_amount: faker.number.int({ min: 1, max: 1000 }),
    has_paid: faker.datatype.boolean(),
    method_of_payment: faker.helpers.arrayElement(['visa', 'mobile_money', 'cash']),
    payment_transaction_id: faker.string.alphanumeric(10),
    ticket_type: faker.helpers.arrayElement([
      'single',
      'group',
      'free',
      'early_bird',
      'vip',
      'vvip',
      'backstage',
      'student',
      'family',
    ]),
    number_of_tickets: faker.number.int({ min: 1, max: 5 }),
    currency: faker.helpers.arrayElement(['USD', 'EUR', 'GBP', 'KSH']),
    seat_number_allocation: faker.airline.seat(),
    check_in_status: faker.helpers.arrayElement([
      'checked_in',
      'waiting',
      'not_checked_in',
      'late',
    ]),
    ticket_status: faker.helpers.arrayElement(['checked_in', 'waiting', 'not_checked_in', 'late']),
    refund_status: faker.helpers.arrayElement(['refunded', 'waiting', 'not_refunded']),
    refund_transaction_id: faker.string.alphanumeric(10),
  }
})
  .relation('user', () => UserFactory)
  .relation('events', () => EventsFactory)
  .relation('promo_codes', () => PromoCodesFactory)
  .build()
