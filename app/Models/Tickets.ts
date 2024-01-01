import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Events from 'App/Models/Events'
import PromoCodes from 'App/Models/PromoCodes'
import User from 'App/Models/User'

export default class Tickets extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public description: string

  @column()
  public event_id: number

  @column()
  public has_promo_code: boolean

  @column()
  public promo_code_id: number

  @column()
  public user_id: number

  @column()
  public amount_to_pay: number

  @column()
  public discount_amount: number

  @column()
  public has_paid: boolean

  @column()
  public method_of_payment: string

  @column()
  public payment_transaction_id: string

  @column()
  public ticket_type: string

  @column()
  public number_of_tickets: number

  @column()
  public currency: string

  @column()
  public seat_number_allocation: string

  @column()
  public check_in_status: string

  @column()
  public ticket_status: string

  @column()
  public refund_status: string

  @column()
  public refund_transaction_id: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // Events relation
  @belongsTo(() => Events, {
    foreignKey: 'event_id',
  })
  public events: BelongsTo<typeof Events>

  // Promo codes relation
  @belongsTo(() => PromoCodes, {
    foreignKey: 'promo_code_id',
  })
  public promo_codes: BelongsTo<typeof PromoCodes>

  // User relation
  @belongsTo(() => User, {
    foreignKey: 'user_id',
  })
  public user: BelongsTo<typeof User>
}
