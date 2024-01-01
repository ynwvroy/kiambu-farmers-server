import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Careers extends BaseSchema {
  protected tableName = 'careers'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('full_name')
      table.string('email')
      table.string('phone_number')
      table.string('role_application')
      table.string('linkedin_url')
      table.string('resume_url')
      table.string('status')
      table.string('response_status')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
