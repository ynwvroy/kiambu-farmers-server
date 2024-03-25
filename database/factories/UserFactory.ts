import Factory from '@ioc:Adonis/Lucid/Factory'
import User from 'App/Models/User'

export const UserFactory = Factory.define(User, ({ faker }) => {
  return {
    full_name: faker.person.fullName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    phone_number: faker.phone.number(),
    password: faker.internet.password(),
    user_type: faker.helpers.arrayElement(['super_admin', 'farmer', 'customer', 'support']),
    is_verified: faker.datatype.boolean(),
  }
}).build()
