import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Sales from '../../Models/Sales'

export default class SalesController {
  public async index({ response }: HttpContextContract) {
    try {
      const sales = await Sales.query()
        .select('*')
        .from('sales')
        .preload('farmer')
        .preload('product')
      return response.json({
        success: true,
        message: 'All sales retrieved successfully',
        data: sales,
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
      const sales = await Sales.query()
        .where('id', params.id)
        .preload('farmer')
        .preload('product')
        .first()
      if (sales) {
        return response.json({
          success: true,
          message: 'Sales retrieved successfully',
          data: sales,
        })
      } else {
        return response.json({
          success: true,
          message: 'Sales not found',
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

  public async showBySellerId({ params, response }: HttpContextContract) {
    try {
      const sales = await Sales.query()
        .select('*')
        .from('sales')
        .where('farmer_id', params.id)
        .preload('product')
        .preload('farmer')
      if (sales) {
        return response.json({
          success: true,
          message: "Seller's sale record retrieved successfully",
          data: sales,
        })
      } else {
        return response.json({
          success: true,
          message: "Seller's sale record not found",
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
      const salesQuery = await Sales.create(data)
      return response.json({
        success: true,
        message: 'Sale saved successfully',
        data: salesQuery,
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
      const sales = await Sales.findOrFail(params.id)
      if (!sales) {
        return response.json({
          success: true,
          message: 'Sales not found',
          data: null,
        })
      } else {
        sales.merge(request.all())

        await sales.save()
        return response.json({
          success: true,
          message: 'Sales updated successfully',
          data: sales,
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
      const sales = await Sales.findOrFail(params.id)
      await sales.delete()

      return response.json({
        success: true,
        message: 'Successfully deleted the sale',
        data: null,
      })
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.status(400).json({
          success: false,
          message: 'The sales does not exist',
          code: 'E_ROW_NOT_FOUND',
          data: null,
        })
      }

      if (error.code === 'ER_ROW_IS_REFERENCED_2') {
        return response.status(400).json({
          success: false,
          message: 'Cannot delete the sale because it has related records',
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
