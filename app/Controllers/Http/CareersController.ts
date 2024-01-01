import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Careers from '../../Models/Careers'

export default class CareersController {
  public async index({ response }: HttpContextContract) {
    try {
      const careers = await Careers.query().select('*').from('careers')
      return response.json({
        success: true,
        message: 'Career application retrieved successfully',
        data: careers,
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
      const careersQuery = await Careers.query().where('id', params.id).first()
      if (careersQuery) {
        return response.json({
          success: true,
          message: 'Career application retrieved successfully',
          data: careersQuery,
        })
      } else {
        return response.json({
          success: true,
          message: 'Career application not found',
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
      const careersQuery = await Careers.create(data)
      return response.json({
        success: true,
        message: 'Career application stored successfully',
        data: careersQuery,
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
      const careers = await Careers.findOrFail(params.id)
      if (!careers) {
        return response.json({
          success: true,
          message: 'Career application not found',
          data: null,
        })
      } else {
        careers.merge(request.all())

        await careers.save()
        return response.json({
          success: true,
          message: 'Career application updated successfully',
          data: careers,
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
      const career = await Careers.findOrFail(params.id)
      await career.delete()

      return response.json({
        success: true,
        message: 'Successfully deleted the career application',
        data: null,
      })
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.status(400).json({
          success: false,
          message: 'The career application does not exist',
          data: null,
        })
      }

      if (error.code === 'ER_ROW_IS_REFERENCED_2') {
        return response.status(400).json({
          success: false,
          message: 'Cannot delete the career application because it has related records',
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
