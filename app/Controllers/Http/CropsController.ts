import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Crops from '../../Models/Crops'

export default class CropsController {
  public async index({ response }: HttpContextContract) {
    try {
      const crops = await Crops.query().select('*').from('crops')
      return response.json({
        success: true,
        message: 'Crop retrieved successfully',
        data: crops,
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
      const cropsQuery = await Crops.query()
        .select('*')
        .from('crops')
        .where('id', params.id)
        .first()
      if (cropsQuery) {
        return response.json({
          success: true,
          message: 'Crop retrieved successfully',
          data: cropsQuery,
        })
      } else {
        return response.json({
          success: true,
          message: 'Crop not found',
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
      const cropsQuery = await Crops.create(data)
      return response.json({
        success: true,
        message: 'Crop stored successfully',
        data: cropsQuery,
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
      const crops = await Crops.findOrFail(params.id)
      if (!crops) {
        return response.json({
          success: true,
          message: 'Crop not found',
          data: null,
        })
      } else {
        crops.merge(request.all())

        await crops.save()
        return response.json({
          success: true,
          message: 'Crop updated successfully',
          data: crops,
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
      const crop = await Crops.findOrFail(params.id)
      await crop.delete()

      return response.json({
        success: true,
        message: 'Successfully deleted the crop application',
        data: null,
      })
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.status(400).json({
          success: false,
          message: 'The crop application does not exist',
          data: null,
        })
      }

      if (error.code === 'ER_ROW_IS_REFERENCED_2') {
        return response.status(400).json({
          success: false,
          message: 'Cannot delete the crop application because it has related records',
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
