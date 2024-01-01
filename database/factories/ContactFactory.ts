import Factory from '@ioc:Adonis/Lucid/Factory'
import Contact from 'App/Models/Contact'

export const ContactFactory = Factory.define(Contact, ({ faker }) => {
  return {
    name: faker.internet.displayName(),
    email: faker.internet.email(),
    description: faker.company.catchPhraseDescriptor(),
    topic: faker.company.catchPhraseDescriptor(),
    is_resolved: faker.datatype.boolean(),
  }
}).build()
