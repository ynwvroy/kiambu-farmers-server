import Factory from '@ioc:Adonis/Lucid/Factory'
import Events from 'App/Models/Events'
import slugify from 'slugify'
import { ProductCategoriesFactory } from './ProductCategoriesFactory'
import { OrganizationsFactory } from './OrganizationsFactory'

export const EventsFactory = Factory.define(Events, ({ faker }) => {
  const name = faker.internet.displayName()
  const slug = slugify(name, { lower: true })

  return {
    name,
    about: faker.lorem.paragraph(),
    description: faker.lorem.paragraph(),
    slug,
    organizer_email: faker.internet.email(),
    organizer_phone: faker.phone.number(),
    number_of_days: faker.number.int({ min: 1, max: 10 }),
    views: faker.number.int({ min: 1, max: 10 }),
    additional_images: faker.image.urlLoremFlickr({ category: 'abstract' }),
    start_date: faker.date.future(),
    end_date: faker.date.future(),
    start_time: faker.date.anytime(),
    end_time: faker.date.anytime(),
    event_qr_code: faker.image.urlLoremFlickr({ category: 'abstract' }),
    event_link: faker.internet.url(),
    event_has_price: faker.datatype.boolean(),
    event_has_promo_codes: faker.datatype.boolean(),
    event_has_tickets: faker.datatype.boolean(),
    entry_fee: faker.commerce.price(),
    location: faker.location.city(),
    maps_direction_pin: faker.image.urlLoremFlickr({ category: 'abstract' }),
    banner_url: faker.image.urlLoremFlickr({ category: 'abstract' }),
    is_public: faker.datatype.boolean(),
  }
})
  .relation('category', () => ProductCategoriesFactory)
  .relation('organization', () => OrganizationsFactory)
  .build()
