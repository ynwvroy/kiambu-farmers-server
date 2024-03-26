import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Incomes extends BaseSchema {
  protected tableName = 'incomes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.float('amount').notNullable()
      table.string('description').notNullable()
      table.text('comments').nullable()
      table.integer('farmer_id').unsigned().references('id').inTable('users')
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
