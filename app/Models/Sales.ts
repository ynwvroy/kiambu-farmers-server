import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import Product from 'App/Models/Product'

export default class Sales extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public payment_transaction_id: string

  @column()
  public payment_method: string

  @column()
  public payment_received_date: DateTime

  @column()
  public date: string

  @column()
  public comments: string

  @column()
  public total_amount: number

  @column()
  public farmer_id: number

  @column()
  public product_id: number

  @column()
  public units_sold: number

  @column()
  public payment_status: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // Farmer relation
  @belongsTo(() => User, {
    foreignKey: 'farmer_id',
  })
  public farmer: BelongsTo<typeof User>

  // Product relation
  @belongsTo(() => Product, {
    foreignKey: 'product_id',
  })
  public product: BelongsTo<typeof Product>
}
