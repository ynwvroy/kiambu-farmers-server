import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Tickets extends BaseSchema {
  protected tableName = 'tickets'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.text('description')
      table.boolean('has_promo_code')
      table.integer('amount_to_pay')
      table.integer('discount_amount')
      table.boolean('has_paid')
      table.string('method_of_payment')
      table.string('payment_transaction_id')
      table.string('ticket_type')
      table.integer('number_of_tickets')
      table.string('currency')
      table.string('seat_number_allocation')
      table.string('check_in_status')
      table.string('ticket_status')
      table.string('refund_status')
      table.string('refund_transaction_id')
      table.integer('event_id').unsigned().references('id').inTable('events')
      table.integer('promo_code_id').unsigned().references('id').inTable('promo_codes')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
