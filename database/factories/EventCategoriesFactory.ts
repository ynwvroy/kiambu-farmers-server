import Factory from '@ioc:Adonis/Lucid/Factory'
import EventCategories from 'App/Models/EventCategories'
import slugify from 'slugify'

export const EventCategoriesFactory = Factory.define(EventCategories, ({ faker }) => {
  const name = faker.company.name()
  const slug = slugify(name, { lower: true })
  const description = faker.commerce.productDescription()

  return {
    name,
    description,
    slug,
    banner_url: faker.image.urlLoremFlickr({ category: 'abstract' }),
  }
}).build()
