import Factory from '@ioc:Adonis/Lucid/Factory'
import ProductCategories from 'App/Models/ProductCategories'
import slugify from 'slugify'

export const ProductCategoriesFactory = Factory.define(ProductCategories, ({ faker }) => {
  const name = faker.company.name()
  const slug = slugify(name, { lower: true })
  const description = faker.commerce.productDescription()

  return {
    name,
    description,
    slug,
  }
}).build()
