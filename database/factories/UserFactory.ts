import Factory from '@ioc:Adonis/Lucid/Factory'
import User from 'App/Models/User'
import { OrganizationsFactory } from './OrganizationsFactory'

export const UserFactory = Factory.define(User, ({ faker }) => {
  return {
    full_name: faker.person.fullName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    phone_number: faker.phone.number(),
    password: faker.internet.password(),
    user_type: faker.helpers.arrayElement(['super_admin', 'farmer', 'customer', 'support']),
    profile_url: faker.image.urlLoremFlickr({ category: 'abstract' }),
    is_verified: faker.datatype.boolean(),
  }
})
  .relation('organization', () => OrganizationsFactory)
  .build()
