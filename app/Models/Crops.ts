import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'

export default class Crops extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public variety: string

  @column()
  public planted_date: string

  @column()
  public harvest_date: string

  @column()
  public actual_yield: number

  @column()
  public amount_profit: string

  @column()
  public farmer_id: number

  @column()
  public comments: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // Farmer relation
  @belongsTo(() => User, {
    foreignKey: 'farmer_id',
  })
  public farmer: BelongsTo<typeof User>
}
