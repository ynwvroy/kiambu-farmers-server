import Factory from '@ioc:Adonis/Lucid/Factory'
import EventsTickets from 'App/Models/EventsTickets'

export const EventsTicketsFactory = Factory.define(EventsTickets, ({ faker }) => {
  return {
    has_student_ticket: faker.datatype.boolean(),
    student_ticket_price: faker.number.int({ min: 100, max: 1000 }),
    student_tickets_quantity: faker.number.int({ min: 1, max: 10 }),
    has_group_ticket: faker.datatype.boolean(),
    group_ticket_price: faker.number.int({ min: 100, max: 1000 }),
    group_tickets_quantity: faker.number.int({ min: 1, max: 10 }),
    group_number_limit: faker.number.int({ min: 1, max: 10 }),
    has_vip_ticket: faker.datatype.boolean(),
    vip_ticket_price: faker.number.int({ min: 100, max: 1000 }),
    vip_tickets_quantity: faker.number.int({ min: 1, max: 10 }),
    has_early_ticket: faker.datatype.boolean(),
    early_ticket_price: faker.number.int({ min: 100, max: 1000 }),
    early_tickets_quantity: faker.number.int({ min: 1, max: 10 }),
    has_regular_ticket: faker.datatype.boolean(),
    regular_ticket_price: faker.number.int({ min: 100, max: 1000 }),
    regular_tickets_quantity: faker.number.int({ min: 1, max: 10 }),
  }
}).build()
