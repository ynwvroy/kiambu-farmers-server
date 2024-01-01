import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PromoCodes from '../../Models/PromoCodes'

export default class PromoCodesController {
  public async index({ response }: HttpContextContract) {
    try {
      const promoCodes = await PromoCodes.query().select('*').from('promo_codes').preload('event')
      return response.json({
        success: true,
        message: 'PromoCodes retrieved successfully',
        data: promoCodes,
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
      const promoCodes = await PromoCodes.find(params.id)
      if (promoCodes) {
        return response.json({
          success: true,
          message: 'PromoCode retrieved successfully',
          data: promoCodes,
        })
      } else {
        return response.json({
          success: true,
          message: 'PromoCode not found',
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
      const promoCodes = await PromoCodes.create(data)
      return response.json({
        success: true,
        message: 'PromoCode created successfully',
        data: promoCodes,
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
      const promoCodes = await PromoCodes.findOrFail(params.id)
      if (!promoCodes) {
        return response.json({
          success: true,
          message: 'PromoCode not found',
          data: null,
        })
      } else {
        promoCodes.merge(request.all())

        await promoCodes.save()
        return response.json({
          success: true,
          message: 'PromoCode updated successfully',
          data: promoCodes,
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
      const promoCode = await PromoCodes.findOrFail(params.id)
      await promoCode.delete()

      return response.json({
        success: true,
        message: 'Successfully deleted the promoCode',
        data: null,
      })
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.status(400).json({
          success: false,
          message: 'The promoCode does not exist',
          data: null,
        })
      }

      if (error.code === 'ER_ROW_IS_REFERENCED_2') {
        return response.status(400).json({
          success: false,
          message: 'Cannot delete the promoCode because it has related records',
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
