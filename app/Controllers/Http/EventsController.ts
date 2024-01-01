import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Events from '../../Models/Events'

export default class EventsController {
  public async index({ response }: HttpContextContract) {
    try {
      const events = await Events.query()
        .select('*')
        .from('events')
        .preload('category')
        .preload('organization')
      return response.json({
        success: true,
        message: 'All events retrieved successfully',
        data: events,
      })
    } catch (error) {
      return response.json({
        success: false,
        message: error.message,
        data: error,
      })
    }
  }

  public async showById({ params, response }: HttpContextContract) {
    try {
      const events = await Events.query()
        .where('id', params.id)
        .preload('category')
        .preload('organization')
        .first()

      if (events) {
        return response.json({
          success: true,
          message: 'Event retrieved successfully',
          data: events,
        })
      } else {
        return response.json({
          success: true,
          message: 'Event not found',
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

  // Get organization by slug
  public async showBySlug({ params, response }: HttpContextContract) {
    try {
      const events = await Events.query()
        .select('*')
        .from('events')
        .where('slug', params.slug)
        .preload('category')
        .preload('organization')

      if (events) {
        return response.json({
          success: true,
          message: 'Event retrieved successfully',
          data: events,
        })
      } else {
        return response.json({
          success: true,
          message: 'Event not found',
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
      const events = await Events.create(data)
      return response.json({
        success: true,
        message: 'Event created successfully',
        data: events,
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
      const events = await Events.findOrFail(params.id)
      if (!events) {
        return response.json({
          success: true,
          message: 'Event not found',
          data: null,
        })
      } else {
        events.merge(request.all())

        await events.save()
        return response.json({
          success: true,
          message: 'Event has been updated successfully',
          data: events,
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
      const event = await Events.findOrFail(params.id)
      await event.delete()

      return response.json({
        success: true,
        message: 'Successfully deleted the event',
        data: null,
      })
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.status(400).json({
          success: false,
          message: 'The event does not exist',
          data: null,
          code: 'E_ROW_NOT_FOUND',
        })
      }

      if (error.code === 'ER_ROW_IS_REFERENCED_2') {
        return response.status(400).json({
          success: false,
          message: 'Cannot delete the event because it has related records',
          data: null,
          code: 'ER_ROW_IS_REFERENCED_2',
        })
      }

      return response.status(500).json({
        success: false,
        message: error.message,
        data: error,
      })
    }
  }

  // Events from one organization by id
  public async getOrganizationEventsById({ params, response }: HttpContextContract) {
    try {
      const events = await Events.query()
        .select('*')
        .from('events')
        .where('organization_id', params.id)
        .preload('organization')
        .preload('category')
      return response.json({
        success: true,
        message: 'Organization events retrieved successfully',
        data: events,
      })
    } catch (error) {
      return response.json({
        success: false,
        message: error.message,
        data: error,
      })
    }
  }

  // Events from one organization by slug
  public async getOrganizationEventsBySlug({ params, response }: HttpContextContract) {
    try {
      const events = await Events.query()
        .select('*')
        .from('events')
        .whereHas('organization', (query) => {
          query.where('slug', params.slug)
        })
        .preload('organization')
        .preload('category')

      return response.json({
        success: true,
        message: 'Event organizations events retrieved successfully',
        data: events,
      })
    } catch (error) {
      return response.json({
        success: false,
        message: error.message,
        data: error,
      })
    }
  }

  // // Events from one event category
  public async getEventCategoryEventsById({ params, response }: HttpContextContract) {
    try {
      const events = await Events.query()
        .select('*')
        .from('events')
        .where('event_category_id', params.id)
        .preload('organization')
        .preload('category')
      return response.json({
        success: true,
        message: 'Event category events retrieved successfully',
        data: events,
      })
    } catch (error) {
      return response.json({
        success: false,
        message: error.message,
        data: error,
      })
    }
  }

  // Events from one event category
  public async getEventCategoryEventsBySlug({ params, response }: HttpContextContract) {
    try {
      const events = await Events.query()
        .select('*')
        .from('events')
        .whereHas('category', (query) => {
          query.where('slug', params.slug)
        })
        .preload('organization')
        .preload('category')

      return response.json({
        success: true,
        message: 'Event category events retrieved successfully',
        data: events,
      })
    } catch (error) {
      return response.json({
        success: false,
        message: error.message,
        data: error,
      })
    }
  }
}
