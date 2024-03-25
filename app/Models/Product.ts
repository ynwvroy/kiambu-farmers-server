import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import ProductCategories from 'App/Models/ProductCategories'

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
  public price: number

  @column()
  public seller_id: number

  @column()
  public category_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // Seller relation
  @belongsTo(() => User, {
    foreignKey: 'seller_id',
  })
  public seller: BelongsTo<typeof User>

  // Category relation
  @belongsTo(() => ProductCategories, {
    foreignKey: 'category_id',
  })
  public category: BelongsTo<typeof ProductCategories>
}
