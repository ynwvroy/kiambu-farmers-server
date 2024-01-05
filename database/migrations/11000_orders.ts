import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Orders extends BaseSchema {
  protected tableName = 'orders'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('buyer_id').unsigned().references('id').inTable('users')
      table.integer('seller_id').unsigned().references('id').inTable('users')
      table.integer('product_id').unsigned().references('id').inTable('products')
      table.integer('quantity')
      table.integer('total_price')
      table.string('status')
      table.string('payment_method')
      table.integer('payment_transaction_id')
      table.text('comments')
      table.string('delivery_address')
      table.integer('tracking_number')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
