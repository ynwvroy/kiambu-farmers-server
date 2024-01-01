import Factory from '@ioc:Adonis/Lucid/Factory'
import Team from 'App/Models/Team'
import slugify from 'slugify'
import { OrganizationsFactory } from './OrganizationsFactory'
import { EventsFactory } from './EventsFactory'

export const TeamFactory = Factory.define(Team, ({ faker }) => {
  const name = faker.company.name()
  const slug = slugify(name, { lower: true })

  return {
    name,
    slug,
    description: faker.company.catchPhraseDescriptor(),
  }
})
  .relation('organization', () => OrganizationsFactory)
  .relation('event', () => EventsFactory)
  .build()
