import Factory from '@ioc:Adonis/Lucid/Factory'
import OrganizationsComments from 'App/Models/OrganizationsComments'
import { OrganizationsFactory } from './OrganizationsFactory'

export const OrganizationsCommentsFactory = Factory.define(OrganizationsComments, ({ faker }) => {
  return {
    name: faker.internet.displayName(),
    email: faker.internet.email(),
    comment: faker.company.catchPhraseDescriptor(),
    rating: faker.number.int({ min: 1, max: 5 }), // Adjust the range as needed
    is_anonymous: faker.datatype.boolean(),
  }
})
  .relation('organization', () => OrganizationsFactory)
  .build()
