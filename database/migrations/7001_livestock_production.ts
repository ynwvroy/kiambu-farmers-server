import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class LivestockProductions extends BaseSchema {
  protected tableName = 'livestock_productions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table
        .integer('livestock_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('livestocks')
        .onDelete('CASCADE')
      table.string('date_recorded').notNullable()
      table.string('description').notNullable()
      table.string('production_type').notNullable()
      table.float('quantity').notNullable()
      table.float('market_price').notNullable()
      table.string('profit_total').notNullable()
      table.string('comments')
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
