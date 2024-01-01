import Factory from '@ioc:Adonis/Lucid/Factory'
import EventsComments from 'App/Models/EventsComments'
import { EventsFactory } from './EventsFactory'

export const EventsCommentsFactory = Factory.define(EventsComments, ({ faker }) => {
  return {
    name: faker.internet.displayName(),
    email: faker.internet.email(),
    comment: faker.company.catchPhraseDescriptor(),
    rating: faker.number.int({ min: 1, max: 5 }), // Adjust the range as needed
    is_anonymous: faker.datatype.boolean(),
  }
})
  .relation('event', () => EventsFactory)
  .build()
