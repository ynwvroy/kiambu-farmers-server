import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProductCategories from '../../Models/ProductCategories'

export default class ProductCategoriesController {
  public async index({ response }: HttpContextContract) {
    try {
      const productCategories = await ProductCategories.query()
        .select('*')
        .from('product_categories')
      return response.json({
        success: true,
        message: 'Product categories retrieved successfully',
        data: productCategories,
      })
    } catch (error) {
      return response.json({
        success: false,
        message: error.message,
        data: error,
      })
    }
  }

  // Get product category by id
  public async showById({ params, response }: HttpContextContract) {
    try {
      const productCategories = await ProductCategories.find(params.id)
      if (productCategories) {
        return response.json({
          success: true,
          message: 'Product category retrieved successfully',
          data: productCategories,
        })
      } else {
        return response.json({
          success: true,
          message: 'Product category not found',
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

  // Get Product category by slug
  public async showBySlug({ params, response }: HttpContextContract) {
    try {
      const productCategories = await ProductCategories.query()
        .select('*')
        .from('product_categories')
        .where('slug', params.slug)

      if (productCategories) {
        return response.json({
          success: true,
          message: 'Product category retrieved successfully',
          data: productCategories,
        })
      } else {
        return response.json({
          success: true,
          message: 'Product category  not found',
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
      const productCategories = await ProductCategories.create(data)
      return response.json({
        success: true,
        message: 'Product category created successfully',
        data: productCategories,
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
      const productCategories = await ProductCategories.findOrFail(params.id)
      if (!productCategories) {
        return response.json({
          success: true,
          message: 'Product category not found',
          data: null,
        })
      } else {
        productCategories.merge(request.all())

        await productCategories.save()
        return response.json({
          success: true,
          message: 'Product category updated successfully',
          data: productCategories,
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
      const productCategories = await ProductCategories.findOrFail(params.id)
      await productCategories.delete()

      return response.status(200).json({
        success: true,
        message: 'Successfully deleted the product category',
        data: null,
      })
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.status(400).json({
          success: false,
          message: 'The product category does not exist',
          code: 'E_ROW_NOT_FOUND',
          data: null,
        })
      }

      if (error.code === 'ER_ROW_IS_REFERENCED_2') {
        return response.status(400).json({
          success: false,
          message: 'Cannot delete the product category because it has related records.',
          code: 'ER_ROW_IS_REFERENCED_2',
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
