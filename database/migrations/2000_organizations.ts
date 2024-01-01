import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Organizations extends BaseSchema {
  protected tableName = 'organizations'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').unique()
      table.string('slug').unique()
      table.text('description')
      table
        .integer('admin_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .nullable()
      table.string('contact_phone_number')
      table.string('contact_email')
      table.string('instagram_url')
      table.string('facebook_url')
      table.string('twitter_url')
      table.string('linkedin_url')
      table.string('location')
      table.text('profile_url')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
