import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CropHealth extends BaseSchema {
  protected tableName = 'crop_healths'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('crop_id').unsigned().references('id').inTable('crops')
      table.string('date_recorded')
      table.string('input_type')
      table.string('quantity_applied')
      table.string('application_method')
      table.float('cost')
      table.text('comments')
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
