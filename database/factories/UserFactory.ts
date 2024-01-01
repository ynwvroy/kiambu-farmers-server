import Users from 'App/Models/User'
import slugify from 'slugify'
import Factory from '@ioc:Adonis/Lucid/Factory'

export const UserFactory = Factory.define(Users, ({ faker }) => {
  const name = faker.person.fullName()
  const generatedUsername = slugify(name, { lower: true })

  return {
    full_name: name,
    username: generatedUsername,
    email: faker.internet.email(),
    password: faker.internet.password(),
    phone_number: faker.phone.number(),
    location: faker.location.streetAddress(),
  }
}).build()
