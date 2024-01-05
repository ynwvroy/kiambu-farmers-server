import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { BaseModel, column, belongsTo, BelongsTo, beforeSave } from '@ioc:Adonis/Lucid/Orm'
import Deliveries from 'App/Models/Deliveries'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ serializeAs: 'full_name' })
  public full_name: string

  @column({ serializeAs: 'username' })
  public username: string

  @column({ serializeAs: 'phone_number' })
  public phone_number: string

  @column()
  public email: string

  @column()
  public profile_url: string

  @column()
  public is_verified: boolean

  @column()
  public deliveries_id: number

  @column({ serializeAs: null })
  public password: string

  @column({ serializeAs: 'user_type' })
  public user_type: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  // Deliveries relation
  @belongsTo(() => Deliveries, {
    foreignKey: 'deliveries_id',
  })
  public deliveries: BelongsTo<typeof Deliveries>
}
