import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LivestockProduction from '../../Models/LivestockProduction'

export default class LivestockProductionController {
  public async index({ response }: HttpContextContract) {
    try {
      const livestockProduction = await LivestockProduction.query()
        .select('*')
        .from('livestock_production')
      return response.json({
        success: true,
        message: 'Livestock production records retrieved successfully',
        data: livestockProduction,
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
      const productionRecord = await LivestockProduction.query()
        .select('*')
        .from('livestock_production')
        .where('id', params.id)
        .first()
      if (productionRecord) {
        return response.json({
          success: true,
          message: 'Livestock production record retrieved successfully',
          data: productionRecord,
        })
      } else {
        return response.json({
          success: true,
          message: 'Livestock production record not found',
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
      const productionRecord = await LivestockProduction.create(data)
      return response.json({
        success: true,
        message: 'Livestock production record stored successfully',
        data: productionRecord,
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
      const productionRecord = await LivestockProduction.findOrFail(params.id)
      if (!productionRecord) {
        return response.json({
          success: true,
          message: 'Livestock production record not found',
          data: null,
        })
      } else {
        productionRecord.merge(request.all())

        await productionRecord.save()
        return response.json({
          success: true,
          message: 'Livestock production record updated successfully',
          data: productionRecord,
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
      const productionRecord = await LivestockProduction.findOrFail(params.id)
      await productionRecord.delete()

      return response.json({
        success: true,
        message: 'Successfully deleted the livestock production record',
        data: null,
      })
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.status(400).json({
          success: false,
          message: 'The livestock production record does not exist',
          data: null,
        })
      }

      if (error.code === 'ER_ROW_IS_REFERENCED_2') {
        return response.status(400).json({
          success: false,
          message: 'Cannot delete the livestock production record because it has related records',
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
