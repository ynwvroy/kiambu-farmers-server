import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Income from 'App/Models/Income'

export default class IncomesController {
  public async index({ response }: HttpContextContract) {
    try {
      const incomes = await Income.query().select('*').from('incomes')
      return response.json({
        success: true,
        message: 'Income records retrieved successfully',
        data: incomes,
      })
    } catch (error) {
      return response.json({
        success: false,
        message: error.message,
        data: error,
      })
    }
  }

  public async getFarmerIncomes({ params, response }: HttpContextContract) {
    try {
      const incomes = await Income.query().where('farmer_id', params.id)
      return response.json({
        success: true,
        message: 'Income records retrieved successfully',
        data: incomes,
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
      const income = await Income.query().select('*').from('incomes').where('id', params.id).first()
      if (income) {
        return response.json({
          success: true,
          message: 'Income record retrieved successfully',
          data: income,
        })
      } else {
        return response.json({
          success: true,
          message: 'Income record not found',
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
      const income = await Income.create(data)
      return response.json({
        success: true,
        message: 'Income record stored successfully',
        data: income,
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
      const income = await Income.findOrFail(params.id)
      if (!income) {
        return response.json({
          success: true,
          message: 'Income record not found',
          data: null,
        })
      } else {
        income.merge(request.all())
        await income.save()
        return response.json({
          success: true,
          message: 'Income record updated successfully',
          data: income,
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
      const income = await Income.findOrFail(params.id)
      await income.delete()
      return response.json({
        success: true,
        message: 'Successfully deleted the income record',
        data: null,
      })
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.status(400).json({
          success: false,
          message: 'The income record does not exist',
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
