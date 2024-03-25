import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Crop from 'App/Models/Crop'

export default class CropHealth extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public crop_id: number

  @column()
  public date_recorded: Date

  @column()
  public input_type: string

  @column()
  public quantity_applied: string

  @column()
  public application_method: string

  @column()
  public cost: number

  @column()
  public comments: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // crop relation
  @belongsTo(() => Crop, {
    foreignKey: 'crop_id',
  })
  public crop: BelongsTo<typeof Crop>
}
