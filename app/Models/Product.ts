import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public stock_quantity: number

  @column()
  public units_sold: number

  @column()
  public image_url: string

  @column()
  public price: number

  @column()
  public seller_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // Seller relation
  @belongsTo(() => User, {
    foreignKey: 'seller_id',
  })
  public seller: BelongsTo<typeof User>
}
