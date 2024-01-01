import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class EventsComments extends BaseSchema {
  protected tableName = 'events_comments'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table.string('email')
      table.text('comment')
      table.integer('rating')
      table.integer('event_id').unsigned().references('id').inTable('events')
      table.boolean('is_anonymous')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
