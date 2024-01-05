import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import Product from 'App/Models/Product'
export default class Orders extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public tracking_number: number

  @column()
  public product_id: number

  @column()
  public seller_id: number

  @column()
  public buyer_id: number

  @column()
  public quantity: number

  @column()
  public total_price: number

  @column()
  public status: string

  @column()
  public payment_method: string

  @column()
  public payment_transaction_id: number

  @column()
  public comments: string

  @column()
  public delivery_address: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // Seller relation
  @belongsTo(() => User, {
    foreignKey: 'seller_id',
  })
  public seller: BelongsTo<typeof User>

  // Buyer relation
  @belongsTo(() => User, {
    foreignKey: 'buyer_id',
  })
  public buyer: BelongsTo<typeof User>

  // Product relation
  @belongsTo(() => Product, {
    foreignKey: 'product_id',
  })
  public product: BelongsTo<typeof Product>
}
