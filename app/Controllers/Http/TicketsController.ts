import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Tickets from '../../Models/Tickets'

export default class TicketsController {
  // Get all tickets
  public async index({ response }: HttpContextContract) {
    try {
      const tickets = await Tickets.query()
        .select('*')
        .from('tickets')
        .preload('events')
        .preload('user')
        .preload('promo_codes')
      return response.json({
        success: true,
        message: 'Tickets retrieved successfully',
        data: tickets,
      })
    } catch (error) {
      return response.json({
        success: false,
        message: error.message,
        data: error,
      })
    }
  }

  public async getEventTickets({ params, response }: HttpContextContract) {
    try {
      const tickets = await Tickets.query()
        .select('*')
        .from('tickets')
        .where('event_id', params.id)
        .preload('user')
      return response.json({
        success: true,
        message: 'Single event tickets retrieved successfully',
        data: tickets,
      })
    } catch (error) {
      return response.json({
        success: false,
        message: error.message,
        data: error,
      })
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const tickets = await Tickets.find(params.id)
      if (tickets) {
        return response.json({
          success: true,
          message: 'Ticket retrieved successfully',
          data: tickets,
        })
      } else {
        return response.json({
          success: true,
          message: 'Ticket not found',
          data: null,
        })
      }
    } catch (error) {
      return response.json({
        success: false,
        message: error.message,
        data: error,
      })
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const data = request.all()
      const tickets = await Tickets.create(data)
      return response.json({
        success: true,
        message: 'Ticket created successfully',
        data: tickets,
      })
    } catch (error) {
      return response.json({
        success: false,
        message: error.message,
        data: error,
      })
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    try {
      const tickets = await Tickets.findOrFail(params.id)
      if (!tickets) {
        return response.json({
          success: true,
          message: 'Ticket not found',
          data: null,
        })
      } else {
        tickets.merge(request.all())

        await tickets.save()
        return response.json({
          success: true,
          message: 'Ticket updated successfully',
          data: tickets,
        })
      }
    } catch (error) {
      return response.json({
        success: false,
        message: error.message,
        data: error,
      })
    }
  }

  public async delete({ params, response }: HttpContextContract) {
    try {
      const tickets = await Tickets.findOrFail(params.id)
      await tickets.delete()

      return response.json({
        success: true,
        message: 'Successfully deleted the ticket',
        data: null,
      })
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.status(400).json({
          success: false,
          message: 'The ticket does not exist',
          data: null,
        })
      }

      if (error.code === 'ER_ROW_IS_REFERENCED_2') {
        return response.status(400).json({
          success: false,
          message: 'Cannot delete the ticket because it has related records',
          data: null,
        })
      }

      return response.status(500).json({
        success: false,
        message: error.message,
        data: error,
      })
    }
  }
}
