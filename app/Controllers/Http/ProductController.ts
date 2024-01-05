import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from '../../Models/Product'

export default class ProductController {
  public async index({ response }: HttpContextContract) {
    try {
      const product = await Product.query().select('*').from('products')
      return response.json({
        success: true,
        message: 'Products retrieved successfully',
        data: product,
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
      const product = await Product.find(params.id)
      if (product) {
        return response.json({
          success: true,
          message: 'Product record retrieved successfully',
          data: product,
        })
      } else {
        return response.json({
          success: true,
          message: 'Product record not found',
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
      const product = await Product.create(data)
      return response.json({
        success: true,
        message: 'Product created successfully',
        data: product,
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
      const product = await Product.findOrFail(params.id)
      if (!product) {
        return response.json({
          success: true,
          message: 'Product record not found',
          data: null,
        })
      } else {
        product.merge(request.all())

        await product.save()
        return response.json({
          success: true,
          message: 'Product record updated successfully',
          data: product,
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
      const product = await Product.findOrFail(params.id)
      await product.delete()

      return response.json({
        success: true,
        message: 'Successfully deleted the product',
        data: null,
      })
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.status(400).json({
          success: false,
          message: 'The product does not exist',
          code: 'E_ROW_NOT_FOUND',
          data: null,
        })
      }

      if (error.code === 'ER_ROW_IS_REFERENCED_2') {
        return response.status(400).json({
          success: false,
          message: 'Cannot delete the product because it has related records',
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
