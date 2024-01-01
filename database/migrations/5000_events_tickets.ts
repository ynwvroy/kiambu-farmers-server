import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Events extends BaseSchema {
  protected tableName = 'events_tickets'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.boolean('has_student_ticket')
      table.integer('student_ticket_price')
      table.integer('student_tickets_quantity')

      table.boolean('has_group_ticket')
      table.integer('group_ticket_price')
      table.integer('group_tickets_quantity')
      table.integer('group_number_limit')

      table.boolean('has_vip_ticket')
      table.integer('vip_ticket_price')
      table.integer('vip_tickets_quantity')

      table.boolean('has_early_ticket')
      table.integer('early_ticket_price')
      table.integer('early_tickets_quantity')

      table.boolean('has_regular_ticket')
      table.integer('regular_ticket_price')
      table.integer('regular_tickets_quantity')

      table.boolean('has_vvip_ticket')
      table.integer('vvip_ticket_price')
      table.integer('vvip_tickets_quantity')

      table.boolean('has_backstage_ticket')
      table.integer('backstage_ticket_price')
      table.integer('backstage_tickets_quantity')

      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
