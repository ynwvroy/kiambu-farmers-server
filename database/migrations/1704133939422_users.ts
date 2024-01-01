import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('full_name').notNullable()
      table.string('username').notNullable().unique()
      table.string('email').notNullable().unique()
      table.string('phone_number').notNullable().unique()
      table.string('password').notNullable()
      table.enum('role', ['farmer', 'admin', 'buyer']).defaultTo('farmer')
      table.string('location').notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
