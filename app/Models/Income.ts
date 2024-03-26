import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'

export default class Income extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public amount: number

  @column()
  public description: string

  @column()
  public comments: string

  @column()
  public farmer_id: number

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
