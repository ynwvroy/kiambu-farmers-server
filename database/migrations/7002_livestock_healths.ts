import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class LivestockHealth extends BaseSchema {
  protected tableName = 'livestock_healths'

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
      table.string('treatment')
      table.string('vaccination')
      table.string('medication')
      table.string('comments')
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
