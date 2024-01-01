import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import EventsComments from '../../Models/EventsComments'

export default class EventsCommentsController {
  public async index({ response }: HttpContextContract) {
    try {
      const eventsComments = await EventsComments.query()
        .select('*')
        .from('events_comments')
        .preload('event')
      return response.json({
        success: true,
        message: 'Events comments retrieved successfully',
        data: eventsComments,
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
      const eventsComments = await EventsComments.query()
        .where('id', params.id)
        .preload('event')
        .first()
      if (eventsComments) {
        return response.json({
          success: true,
          message: "Event's comment retrieved successfully",
          data: eventsComments,
        })
      } else {
        return response.json({
          success: true,
          message: "Event's comment not found",
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
      const eventsComments = await EventsComments.create(data)
      return response.json({
        success: true,
        message: "Event's comment created successfully",
        data: eventsComments,
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
      const eventsComments = await EventsComments.findOrFail(params.id)
      if (!eventsComments) {
        return response.json({
          success: true,
          message: "Event's comment not found",
          data: null,
        })
      } else {
        eventsComments.merge(request.all())

        await eventsComments.save()
        return response.json({
          success: true,
          message: "Event's comment updated successfully",
          data: eventsComments,
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
      const eventsComments = await EventsComments.findOrFail(params.id)
      await eventsComments.delete()

      return response.json({
        success: true,
        message: "Successfully deleted the event's comment",
        data: null,
      })
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.status(400).json({
          success: false,
          message: "Could not find the event's comment",
          data: null,
        })
      }

      if (error.code === 'ER_ROW_IS_REFERENCED_2') {
        return response.status(400).json({
          success: false,
          message: "Cannot delete the event's comment because it has related records",
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
