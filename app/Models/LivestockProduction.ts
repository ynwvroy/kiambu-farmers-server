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
  public production_type: string

  @column()
  public quantity: number

  @column()
  public market_price: number

  @column()
  public profit_total: string

  @column()
  public comments: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // Seller relation
  @belongsTo(() => Livestock, {
    foreignKey: 'livestock_id',
  })
  public livestock: BelongsTo<typeof Livestock>
}
