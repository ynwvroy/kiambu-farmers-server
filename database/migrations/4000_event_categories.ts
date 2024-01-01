import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class EventCategories extends BaseSchema {
  protected tableName = 'event_categories'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table.text('description')
      table.string('slug')
      table.text('banner_url')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
