import Factory from '@ioc:Adonis/Lucid/Factory'
import Product from 'App/Models/Product'
import { UserFactory } from './UserFactory'
import { ProductCategoriesFactory } from './ProductCategoriesFactory'

export const ProductFactory = Factory.define(Product, ({ faker }) => {
  return {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    stock_quantity: faker.number.int({ min: 100, max: 1000 }),
    units_sold: faker.number.int({ min: 100, max: 1000 }),
    image_url: faker.image.urlLoremFlickr({ category: 'abstract' }),
    price: faker.number.int({ min: 100, max: 1000 }),
  }
})
  .relation('category', () => ProductCategoriesFactory)
  .relation('seller', () => UserFactory)
  .build()
