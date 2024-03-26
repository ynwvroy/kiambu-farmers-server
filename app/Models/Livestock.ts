import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'

export default class Livestock extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public type: string

  @column()
  public breed: string

  @column()
  public date_of_birth: string

  @column()
  public sex: string

  @column()
  public color: string

  @column()
  public status: string

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
