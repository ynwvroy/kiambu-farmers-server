import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddForeignKeys extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.foreign('organization_id').references('id').inTable('organizations').onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropForeign(['organization_id'])
    })
  }
}
