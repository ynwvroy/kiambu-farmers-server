import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Deliveries from '../../Models/Deliveries'

export default class DeliveriesController {
  public async index({ response }: HttpContextContract) {
    try {
      const deliveries = await Deliveries.query().select('*').from('deliveries').preload('user')
      return response.json({
        success: true,
        message: 'Deliveries retrieved successfully',
        data: deliveries,
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
      const deliveries = await Deliveries.find(params.id)
      if (deliveries) {
        return response.json({
          success: true,
          message: 'Deliveries retrieved successfully',
          data: deliveries,
        })
      } else {
        return response.json({
          success: true,
          message: 'Deliveries not found',
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

  // Get deliveries by slug
  public async showBySlug({ params, response }: HttpContextContract) {
    try {
      const deliveries = await Deliveries.query()
        .select('*')
        .from('deliveries')
        .where('slug', params.slug)

      if (deliveries) {
        return response.json({
          success: true,
          message: 'Deliveries retrieved successfully',
          data: deliveries,
        })
      } else {
        return response.json({
          success: true,
          message: 'Deliveries not found',
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
      // const data = request.all()
      // const deliveries = await Deliveries.create(data)

      // use a schema
      const deliveriesSchema = schema.create({
        name: schema.string(),
        description: schema.string.optional(),
        slug: schema.string(),
        admin_id: schema.number.optional(),
        contact_phone_number: schema.string.optional(),
        contact_email: schema.string.optional(),
        instagram_url: schema.string.optional(),
        facebook_url: schema.string.optional(),
        twitter_url: schema.string.optional(),
        linkedin_url: schema.string.optional(),
        location: schema.string.optional(),
        profile_url: schema.string.optional(),
      })

      const payload = await request.validate({ schema: deliveriesSchema })
      const deliveries = await Deliveries.create(payload)
      await deliveries.refresh()

      return response.json({
        success: true,
        message: 'Deliveries created successfully',
        data: deliveries,
      })
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        // Duplicate entry error
        return response.status(400).json({
          success: false,
          message: 'An deliveries with that name already exists.',
          data: null,
          code: 'ER_DUP_ENTRY',
        })
      }
      return response.json({
        success: false,
        message: error.message,
        data: error,
      })
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    try {
      const deliveries = await Deliveries.findOrFail(params.id)
      if (!deliveries) {
        return response.json({
          success: true,
          message: 'Deliveries not found',
          data: null,
        })
      } else {
        deliveries.merge(request.all())

        await deliveries.save()
        return response.json({
          success: true,
          message: 'Deliveries updated successfully',
          data: deliveries,
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
      const deliveries = await Deliveries.findOrFail(params.id)
      await deliveries.delete()

      return response.json({
        success: true,
        message: 'Successfully deleted the deliveries',
        data: null,
      })
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.status(400).json({
          success: false,
          message: 'The deliveries does not exist',
          data: null,
          code: 'E_ROW_NOT_FOUND',
        })
      }

      if (error.code === 'ER_ROW_IS_REFERENCED_2') {
        return response.status(400).json({
          success: false,
          message: 'Cannot delete the deliveries because it has related records',
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
}
