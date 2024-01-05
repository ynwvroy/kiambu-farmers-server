import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Orders from '../../Models/Orders'

export default class OrdersController {
  public async index({ response }: HttpContextContract) {
    try {
      const orders = await Orders.query()
        .select('*')
        .from('orders')
        .preload('buyer')
        .preload('seller')
        .preload('product')
      return response.json({
        success: true,
        message: 'Order retrieved successfully',
        data: orders,
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
      const ordersQuery = await Orders.query()
        .select('*')
        .from('orders')
        .where('id', params.id)
        .preload('buyer')
        .preload('seller')
        .preload('product')
        .first()
      if (ordersQuery) {
        return response.json({
          success: true,
          message: 'Order retrieved successfully',
          data: ordersQuery,
        })
      } else {
        return response.json({
          success: true,
          message: 'Order not found',
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
      const order = await Orders.query()
        .select('*')
        .from('orders')
        .where('seller_id', params.id)
        .preload('seller')
        .preload('buyer')
        .preload('product')
      if (order) {
        return response.json({
          success: true,
          message: "Seller's order record retrieved successfully",
          data: order,
        })
      } else {
        return response.json({
          success: true,
          message: "Seller's order record not found",
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

  public async showByBuyerId({ params, response }: HttpContextContract) {
    try {
      const order = await Orders.query()
        .select('*')
        .from('orders')
        .where('buyer_id', params.id)
        .preload('seller')
        .preload('buyer')
        .preload('product')
      if (order) {
        return response.json({
          success: true,
          message: "Buyer's order record retrieved successfully",
          data: order,
        })
      } else {
        return response.json({
          success: true,
          message: "Buyer's order record not found",
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
      const ordersQuery = await Orders.create(data)
      return response.json({
        success: true,
        message: 'Order stored successfully',
        data: ordersQuery,
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
      const orders = await Orders.findOrFail(params.id)
      if (!orders) {
        return response.json({
          success: true,
          message: 'Order not found',
          data: null,
        })
      } else {
        orders.merge(request.all())

        await orders.save()
        return response.json({
          success: true,
          message: 'Order updated successfully',
          data: orders,
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
      const order = await Orders.findOrFail(params.id)
      await order.delete()

      return response.json({
        success: true,
        message: 'Successfully deleted the order application',
        data: null,
      })
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.status(400).json({
          success: false,
          message: 'The order application does not exist',
          data: null,
        })
      }

      if (error.code === 'ER_ROW_IS_REFERENCED_2') {
        return response.status(400).json({
          success: false,
          message: 'Cannot delete the order application because it has related records',
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
