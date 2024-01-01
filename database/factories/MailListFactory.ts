import Factory from '@ioc:Adonis/Lucid/Factory'
import MailList from 'App/Models/MailList'

export const MailListFactory = Factory.define(MailList, ({ faker }) => {
  return {
    type: faker.company.name(),
    email: faker.internet.email(),
  }
}).build()
