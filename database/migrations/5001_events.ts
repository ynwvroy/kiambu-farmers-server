import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Events extends BaseSchema {
  protected tableName = 'events'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table.text('about')
      table.text('description')
      table.string('slug')
      table.string('organizer_email')
      table.string('organizer_phone')
      table.text('additional_images')
      table.string('start_date')
      table.time('start_time')
      table.string('end_date')
      table.time('end_time')
      table.integer('views')
      table.integer('number_of_days')
      table.integer('product_category_id').unsigned().references('id').inTable('product_categories')
      table.integer('organization_id').unsigned().references('id').inTable('organizations')
      table.string('event_qr_code')
      table.string('event_link')
      table.string('ticket_qr_code')
      table.boolean('event_has_price')
      table.boolean('event_has_promo_codes')
      table.boolean('event_has_tickets')
      table.string('entry_fee')
      table.string('location')
      table.string('maps_direction_pin')
      table.text('banner_url')
      table.boolean('is_public')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
