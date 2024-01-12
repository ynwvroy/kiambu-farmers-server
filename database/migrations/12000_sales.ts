import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Sales extends BaseSchema {
  protected tableName = 'sales'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('payment_transaction_id')
      table.string('payment_method')
      table.string('date')
      table.text('comments')
      table.float('total_amount')
      table.integer('farmer_id').unsigned().references('id').inTable('users')
      table.integer('product_id').unsigned().references('id').inTable('products')
      table.integer('units_sold')
      table.string('payment_received_date')
      table.string('payment_status')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
