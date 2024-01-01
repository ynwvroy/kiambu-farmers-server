import Factory from '@ioc:Adonis/Lucid/Factory'
import Careers from 'App/Models/Careers'

export const CareersFactory = Factory.define(Careers, ({ faker }) => {
  return {
    full_name: faker.internet.displayName(),
    email: faker.internet.email(),
    phone_number: faker.phone.number(),
    role_application: faker.company.catchPhraseDescriptor(),
    linkedin_url: faker.internet.url(),
    resume_url: faker.internet.url(),
    status: faker.lorem.word(),
    response_status: faker.lorem.word(),
  }
}).build()
