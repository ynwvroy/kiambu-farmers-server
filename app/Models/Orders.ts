import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Orders extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public full_name: string

  @column()
  public email: string

  @column({ serializeAs: 'phone_number' })
  public phone_number: string

  @column()
  public role_application: string

  @column()
  public linkedin_url: string

  @column()
  public resume_url: string

  @column()
  public status: string

  @column()
  public response_status: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
