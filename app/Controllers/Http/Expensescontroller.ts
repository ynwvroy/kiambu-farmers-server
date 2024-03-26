import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Expense from 'App/Models/Expenses'

export default class ExpensesController {
  public async index({ response }: HttpContextContract) {
    try {
      const expenses = await Expense.query().select('*').from('expenses')
      return response.json({
        success: true,
        message: 'Expense records retrieved successfully',
        data: expenses,
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
      const expense = await Expense.query()
        .select('*')
        .from('expenses')
        .where('id', params.id)
        .first()
      if (expense) {
        return response.json({
          success: true,
          message: 'Expense record retrieved successfully',
          data: expense,
        })
      } else {
        return response.json({
          success: true,
          message: 'Expense record not found',
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
      const expense = await Expense.create(data)
      return response.json({
        success: true,
        message: 'Expense record stored successfully',
        data: expense,
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
      const expense = await Expense.findOrFail(params.id)
      if (!expense) {
        return response.json({
          success: true,
          message: 'Expense record not found',
          data: null,
        })
      } else {
        expense.merge(request.all())
        await expense.save()
        return response.json({
          success: true,
          message: 'Expense record updated successfully',
          data: expense,
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
      const expense = await Expense.findOrFail(params.id)
      await expense.delete()
      return response.json({
        success: true,
        message: 'Successfully deleted the expense record',
        data: null,
      })
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.status(400).json({
          success: false,
          message: 'The expense record does not exist',
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
