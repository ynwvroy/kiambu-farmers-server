import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Expenses extends BaseSchema {
  protected tableName = 'expenses'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.float('amount').notNullable()
      table.string('description').notNullable()
      table.text('comments').nullable()
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
