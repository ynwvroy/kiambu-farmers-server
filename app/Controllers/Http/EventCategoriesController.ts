import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import EventCategories from '../../Models/EventCategories'

export default class EventCategoriesController {
  public async index({ response }: HttpContextContract) {
    try {
      const eventCategories = await EventCategories.query().select('*').from('event_categories')
      return response.json({
        success: true,
        message: 'Event categories retrieved successfully',
        data: eventCategories,
      })
    } catch (error) {
      return response.json({
        success: false,
        message: error.message,
        data: error,
      })
    }
  }

  // Get event category by id
  public async showById({ params, response }: HttpContextContract) {
    try {
      const eventCategories = await EventCategories.find(params.id)
      if (eventCategories) {
        return response.json({
          success: true,
          message: 'Event category retrieved successfully',
          data: eventCategories,
        })
      } else {
        return response.json({
          success: true,
          message: 'Event category not found',
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

  // Get event category by slug
  public async showBySlug({ params, response }: HttpContextContract) {
    try {
      const eventCategories = await EventCategories.query()
        .select('*')
        .from('event_categories')
        .where('slug', params.slug)

      if (eventCategories) {
        return response.json({
          success: true,
          message: 'Event category retrieved successfully',
          data: eventCategories,
        })
      } else {
        return response.json({
          success: true,
          message: 'Event category  not found',
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
      const eventCategories = await EventCategories.create(data)
      return response.json({
        success: true,
        message: 'Event category created successfully',
        data: eventCategories,
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
      const eventCategories = await EventCategories.findOrFail(params.id)
      if (!eventCategories) {
        return response.json({
          success: true,
          message: 'Event category not found',
          data: null,
        })
      } else {
        eventCategories.merge(request.all())

        await eventCategories.save()
        return response.json({
          success: true,
          message: 'Event category updated successfully',
          data: eventCategories,
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
      const eventCategories = await EventCategories.findOrFail(params.id)
      await eventCategories.delete()

      return response.status(200).json({
        success: true,
        message: 'Successfully deleted the event category',
        data: null,
      })
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.status(400).json({
          success: false,
          message: 'The event category does not exist',
          code: 'E_ROW_NOT_FOUND',
          data: null,
        })
      }

      if (error.code === 'ER_ROW_IS_REFERENCED_2') {
        return response.status(400).json({
          success: false,
          message: 'Cannot delete the event category because it has related records.',
          code: 'ER_ROW_IS_REFERENCED_2',
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
