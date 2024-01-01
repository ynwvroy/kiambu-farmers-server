import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class EventsTickets extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  // 1. Student Ticket
  @column()
  public has_student_ticket: boolean

  @column()
  public student_ticket_price: number

  @column()
  public student_tickets_quantity: number

  // 2. Group Ticket
  @column()
  public has_group_ticket: boolean

  @column()
  public group_ticket_price: number

  @column()
  public group_tickets_quantity: number

  @column()
  public group_number_limit: number

  // 3. VIP Ticket
  @column()
  public has_vip_ticket: boolean

  @column()
  public vip_ticket_price: number

  @column()
  public vip_tickets_quantity: number

  // 4. Early Ticket
  @column()
  public has_early_ticket: boolean

  @column()
  public early_ticket_price: number

  @column()
  public early_tickets_quantity: number

  // 5. Regular Ticket
  @column()
  public has_regular_ticket: boolean

  @column()
  public regular_ticket_price: number

  @column()
  public regular_tickets_quantity: number

  // 6. VVIP Ticket
  @column()
  public has_vvip_ticket: boolean

  @column()
  public vvip_ticket_price: number

  @column()
  public vvip_tickets_quantity: number

  // 7. Backstage Ticket
  @column()
  public has_backstage_ticket: boolean

  @column()
  public backstage_ticket_price: number

  @column()
  public backstage_tickets_quantity: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
