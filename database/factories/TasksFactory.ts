import Factory from '@ioc:Adonis/Lucid/Factory'
import Task from 'App/Models/Tasks'
import slugify from 'slugify'
import { TeamFactory } from './SalesFactory'
import { UserFactory } from './UserFactory'

export const TaskFactory = Factory.define(Task, ({ faker }) => {
  const name = faker.company.name()
  const slug = slugify(name, { lower: true })

  return {
    name,
    slug,
    description: faker.company.catchPhraseDescriptor(),
    priority: faker.helpers.arrayElement(['low', 'medium', 'high']),
    label: faker.helpers.arrayElement(['bug', 'feature', 'enhancement']),
    status: faker.helpers.arrayElement(['todo', 'in_progress', 'in_review', 'done']),
    comments: faker.lorem.paragraph(),
  }
})
  .relation('team', () => TeamFactory)
  .relation('creator', () => UserFactory)
  .relation('assignee', () => UserFactory)
  .build()
