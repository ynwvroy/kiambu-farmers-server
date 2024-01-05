import Factory from '@ioc:Adonis/Lucid/Factory'
import slugify from 'slugify'
import Deliveries from 'App/Models/Deliveries'
import { UserFactory } from './UserFactory'

export const DeliveriesFactory = Factory.define(Deliveries, ({ faker }) => {
  const name = faker.company.name()
  const slug = slugify(name, { lower: true })

  return {
    name,
    description: faker.company.catchPhraseDescriptor(),
    contact_phone_number: faker.phone.number(),
    contact_email: faker.internet.email(),
    location: faker.location.city(),
    profile_url: faker.image.urlLoremFlickr({ category: 'abstract' }),
    instagram_url: faker.internet.url(),
    facebook_url: faker.internet.url(),
    twitter_url: faker.internet.url(),
    linkedin_url: faker.internet.url(),
    slug,
  }
})
  .relation('user', () => UserFactory)
  .build()
