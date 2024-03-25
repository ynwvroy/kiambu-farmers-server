import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Livestocks extends BaseSchema {
  protected tableName = 'livestocks'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name').notNullable()
      table.string('type').notNullable()
      table.string('breed').notNullable()
      table.date('date_of_birth').notNullable()
      table.string('sex').notNullable()
      table.string('color').notNullable()
      table.string('status').notNullable()
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
