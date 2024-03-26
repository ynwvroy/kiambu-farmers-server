import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Livestock from '../../Models/Livestock'

export default class LivestockController {
  public async index({ response }: HttpContextContract) {
    try {
      const livestock = await Livestock.query().select('*').from('livestocks')
      return response.json({
        success: true,
        message: 'Livestock retrieved successfully',
        data: livestock,
      })
    } catch (error) {
      return response.json({
        success: false,
        message: error.message,
        data: error,
      })
    }
  }

  public async getSingleFarmerLivestock({ response }: HttpContextContract) {
    try {
      const livestock = await Livestock.query()
      return response.json({
        success: true,
        message: 'Livestock retrieved successfully',
        data: livestock,
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
      const livestockQuery = await Livestock.query()
        .select('*')
        .from('livestocks')
        .where('id', params.id)
        .first()
      if (livestockQuery) {
        return response.json({
          success: true,
          message: 'Livestock retrieved successfully',
          data: livestockQuery,
        })
      } else {
        return response.json({
          success: true,
          message: 'Livestock not found',
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
      const livestockQuery = await Livestock.create(data)
      return response.json({
        success: true,
        message: 'Livestock stored successfully',
        data: livestockQuery,
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
      const livestock = await Livestock.findOrFail(params.id)
      if (!livestock) {
        return response.json({
          success: true,
          message: 'Livestock not found',
          data: null,
        })
      } else {
        livestock.merge(request.all())

        await livestock.save()
        return response.json({
          success: true,
          message: 'Livestock updated successfully',
          data: livestock,
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
      const livestock = await Livestock.findOrFail(params.id)
      await livestock.delete()

      return response.json({
        success: true,
        message: 'Successfully deleted the livestock record',
        data: null,
      })
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.status(400).json({
          success: false,
          message: 'The livestock record does not exist',
          data: null,
        })
      }

      if (error.code === 'ER_ROW_IS_REFERENCED_2') {
        return response.status(400).json({
          success: false,
          message: 'Cannot delete the livestock record because it has related records',
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
