import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Livestock from 'App/Models/Livestock'

export default class LivestockProduction extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public livestock_id: number

  @column()
  public date_recorded: Date

  @column()
  public description: string

  @column()
  public treatment: string

  @column()
  public vaccination: string

  @column()
  public medication: string

  @column()
  public comments: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // Livestock relation
  @belongsTo(() => Livestock, {
    foreignKey: 'livestock_id',
  })
  public livestock: BelongsTo<typeof Livestock>
}
