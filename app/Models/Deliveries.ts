import { DateTime } from 'luxon'
import { BaseModel, column, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'

export default class Deliveries extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public slug: string

  @column()
  public admin_id: number

  @column()
  public contact_phone_number: string

  @column()
  public contact_email: string

  @column()
  public instagram_url: string

  @column()
  public facebook_url: string

  @column()
  public twitter_url: string

  @column()
  public linkedin_url: string

  @column()
  public location: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User, {
    foreignKey: 'admin_id',
  })
  public user: BelongsTo<typeof User>
}
