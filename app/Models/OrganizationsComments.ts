import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Organizations from 'App/Models/Organizations'

export default class OrganizationsComments extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public comment: string

  @column()
  public rating: number

  @column()
  public organization_id: number

  @column()
  public is_anonymous: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // Organizations relation
  @belongsTo(() => Organizations, {
    foreignKey: 'organization_id',
  })
  public organization: BelongsTo<typeof Organizations>
}
