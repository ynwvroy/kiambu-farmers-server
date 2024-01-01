import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Events from 'App/Models/Events'

export default class PromoCodes extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public amount: number

  @column()
  public description: string

  @column()
  public event_id: number

  @column()
  public code: string

  @column()
  public is_valid: boolean

  @column()
  public valid_until: Date

  @column()
  public type_of_use: string

  @column()
  public currency: string

  @column()
  public redemption_count: number

  @column()
  public usage_limit_per_person: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // Event relation
  @belongsTo(() => Events, {
    foreignKey: 'event_id',
  })
  public event: BelongsTo<typeof Events>
}
