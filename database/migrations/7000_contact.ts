import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Contact extends BaseSchema {
  protected tableName = 'contacts'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table.string('email')
      table.string('description')
      table.string('topic')
      table.boolean('is_resolved')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
