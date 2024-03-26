import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Crops extends BaseSchema {
  protected tableName = 'crops'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name')
      table.string('variety')
      table.string('planted_date')
      table.string('harvest_date')
      table.integer('actual_yield')
      table.string('amount_profit')
      table.text('comments')
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
