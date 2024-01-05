import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Team from 'App/Models/Sales'
import User from 'App/Models/User'

export default class Tasks extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public slug: string

  @column()
  public description: string

  @column()
  public priority: string

  @column()
  public label: string

  @column()
  public status: string

  @column()
  public comments: string

  @column()
  public created_by: number

  @column()
  public event_id: number

  @column()
  public assignee_id: number

  @column()
  public team_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // Team relation
  @belongsTo(() => Team, {
    foreignKey: 'team_id',
  })
  public team: BelongsTo<typeof Team>

  // User relation for creator
  @belongsTo(() => User, {
    foreignKey: 'created_by',
  })
  public creator: BelongsTo<typeof User>

  // User relation for assignee
  @belongsTo(() => User, {
    foreignKey: 'assignee_id',
  })
  public assignee: BelongsTo<typeof User>
}
