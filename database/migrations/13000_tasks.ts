import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Tasks extends BaseSchema {
  protected tableName = 'tasks'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table.string('slug')
      table.text('description')
      table.string('priority')
      table.string('label')
      table.string('status')
      table.integer('created_by').unsigned().references('id').inTable('users')
      table.integer('team_id').unsigned().references('id').inTable('teams')
      table.integer('assignee_id').unsigned().references('id').inTable('users')
      table.text('comments')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
