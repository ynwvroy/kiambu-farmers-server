import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Organization from 'App/Models/Organizations'
import Events from 'App/Models/Events'

export default class Teams extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public slug: string

  @column()
  public description: string

  @column()
  public event_id: number

  @column()
  public organization_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // Organization relation
  @belongsTo(() => Organization, {
    foreignKey: 'organization_id',
  })
  public organization: BelongsTo<typeof Organization>

  // Events relation
  @belongsTo(() => Events, {
    foreignKey: 'event_id',
  })
  public event: BelongsTo<typeof Events>
}
