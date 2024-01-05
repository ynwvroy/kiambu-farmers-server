import Factory from '@ioc:Adonis/Lucid/Factory'
import Product from 'App/Models/Product'

export const ProductFactory = Factory.define(Product, ({ faker }) => {
  return {
    type: faker.company.name(),
    email: faker.internet.email(),
  }
}).build()
