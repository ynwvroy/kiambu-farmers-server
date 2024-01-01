import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PromoCodes extends BaseSchema {
  protected tableName = 'promo_codes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('amount')
      table.string('description')
      table.integer('event_id').unsigned().references('id').inTable('events')
      table.string('code')
      table.boolean('is_valid')
      table.date('valid_until')
      table.string('type_of_use')
      table.string('currency')
      table.integer('redemption_count')
      table.integer('usage_limit_per_person')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
