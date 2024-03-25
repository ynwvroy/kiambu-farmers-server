import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LivestockHealth from '../../Models/LivestockHealth'

export default class LivestockHealthController {
  public async index({ response }: HttpContextContract) {
    try {
      const livestockHealth = await LivestockHealth.query().select('*').from('livestock_health')
      return response.json({
        success: true,
        message: 'Livestock health records retrieved successfully',
        data: livestockHealth,
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
      const healthRecord = await LivestockHealth.query()
        .select('*')
        .from('livestock_health')
        .where('id', params.id)
        .first()
      if (healthRecord) {
        return response.json({
          success: true,
          message: 'Livestock health record retrieved successfully',
          data: healthRecord,
        })
      } else {
        return response.json({
          success: true,
          message: 'Livestock health record not found',
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
      const healthRecord = await LivestockHealth.create(data)
      return response.json({
        success: true,
        message: 'Livestock health record stored successfully',
        data: healthRecord,
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
      const healthRecord = await LivestockHealth.findOrFail(params.id)
      if (!healthRecord) {
        return response.json({
          success: true,
          message: 'Livestock health record not found',
          data: null,
        })
      } else {
        healthRecord.merge(request.all())

        await healthRecord.save()
        return response.json({
          success: true,
          message: 'Livestock health record updated successfully',
          data: healthRecord,
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
      const healthRecord = await LivestockHealth.findOrFail(params.id)
      await healthRecord.delete()

      return response.json({
        success: true,
        message: 'Successfully deleted the livestock health record',
        data: null,
      })
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.status(400).json({
          success: false,
          message: 'The livestock health record does not exist',
          data: null,
        })
      }

      if (error.code === 'ER_ROW_IS_REFERENCED_2') {
        return response.status(400).json({
          success: false,
          message: 'Cannot delete the livestock health record because it has related records',
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
