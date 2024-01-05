import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import ProductCategories from 'App/Models/ProductCategories'
import Organization from 'App/Models/Organizations'
import EventsTickets from 'App/Models/EventsTickets'

export default class Event extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public slug: string

  @column()
  public about: string

  @column()
  public description: string

  @column()
  public organizer_email: string

  @column()
  public organizer_phone: string

  @column()
  public additional_images: string

  @column()
  public event_has_promo_codes: boolean

  @column()
  public event_has_tickets: boolean

  @column()
  public product_category_id: number

  @column()
  public events_tickets_id: number

  @column()
  public organization_id: number

  @column()
  public views: number

  @column()
  public number_of_days: number

  @column()
  public start_date: Date

  @column()
  public end_date: Date

  @column()
  public start_time: Date

  @column()
  public end_time: Date

  @column()
  public event_qr_code: string

  @column()
  public event_link: string

  @column()
  public event_has_price: boolean

  @column()
  public entry_fee: string

  @column()
  public location: string

  @column()
  public maps_direction_pin: string

  @column()
  public banner_url: string

  @column()
  public is_public: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // Product category relation
  @belongsTo(() => ProductCategories, {
    foreignKey: 'product_category_id',
  })
  public category: BelongsTo<typeof ProductCategories>

  // Organization relation
  @belongsTo(() => Organization, {
    foreignKey: 'organization_id',
  })
  public organization: BelongsTo<typeof Organization>

  // Events tickets relation
  @belongsTo(() => EventsTickets, {
    foreignKey: 'events_tickets_id',
  })
  public ticket: BelongsTo<typeof EventsTickets>
}
