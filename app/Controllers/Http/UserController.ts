import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'

export default class UserController {
  public async update({ params, request, response }: HttpContextContract) {
    try {
      const user = await User.findOrFail(params.id)
      if (!user) {
        return response.json({
          success: true,
          message: 'User not found',
          data: null,
        })
      } else {
        user.merge(request.all())
        await user.save()
        return response.json({
          success: true,
          message: 'User has been updated successfully',
          data: user,
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

  public async index({ response }: HttpContextContract) {
    try {
      const users = await User.query().select('*').from('users')
      return response.json({
        success: true,
        message: 'Users retrieved successfully',
        data: users,
      })
    } catch (error) {
      return response.json({
        success: false,
        message: error.message,
        data: error,
      })
    }
  }

  public async getFarmers({ response }: HttpContextContract) {
    try {
      const users = await User.query().where('user_type', 'farmer').select('*').from('users')
      return response.json({
        success: true,
        message: 'Farmers retrieved successfully',
        data: users,
      })
    } catch (error) {
      return response.json({
        success: false,
        message: error.message,
        data: error,
      })
    }
  }

  /**
   * Display a single user
   * GET /users/:id
   *
   * @param  {Object} { request, response }: HttpContextContract
   * @return {[type]}    [description]
   */
  public async show({ params, response }: HttpContextContract) {
    try {
      const user = await User.find(params.id)
      if (!user) {
        return response.status(404).json({
          success: false,
          message: 'User not found',
          data: null,
        })
      }
      return response.status(200).json({
        success: true,
        message: 'Successfully retrieved the user',
        data: user,
      })
    } catch (error) {
      response.status(500).json({
        success: false,
        message: error.message,
        data: error,
      })
    }
  }

  public async delete({ params, response }: HttpContextContract) {
    try {
      const user = await User.findOrFail(params.id)
      await user.delete()

      return response.json({
        success: true,
        message: 'Successfully deleted the user',
        data: null,
      })
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.status(400).json({
          success: false,
          message: 'The user does not exist',
          data: null,
          code: 'E_ROW_NOT_FOUND',
        })
      }

      if (error.code === 'ER_ROW_IS_REFERENCED_2') {
        return response.status(400).json({
          success: false,
          message: 'Cannot delete the user because they have related records',
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
