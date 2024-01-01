import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  /**
   * ============================================
   * Get all users
   * ============================================
   */
  public async index({ response }: HttpContextContract) {
    try {
      const users = await User.query().select('*')
      return response.json({
        success: true,
        data: users,
        message: 'Users retrieved successfully',
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
   * ============================================
   * Get one user by id
   * ============================================
   */
  public async showById({ params, response }: HttpContextContract) {
    try {
      const user = await User.query().select('*').where('id', params.id)
      return response.json({
        success: true,
        data: user,
        message: 'Single user retrieved successfully',
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
   * ============================================
   * Get one user by username
   * ============================================
   */
  public async showByUsername({ params, response }: HttpContextContract) {
    try {
      const user = await User.query().select('*').where('username', params.username)
      return response.json({
        success: true,
        data: user,
        message: 'Single user retrieved successfully',
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
   * ============================================
   * Update single user by id
   * ============================================
   */
  public async update({ params, response, request }: HttpContextContract) {
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
          message: 'User updated successfully',
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

  /**
   * ============================================
   * Delete user by id
   * ============================================
   */
  public async delete({ params, response }: HttpContextContract) {
    try {
      const user = await User.findOrFail(params.id)
      await user.delete()

      return response.status(200).json({
        success: true,
        message: 'Successfully deleted the user',
        data: null,
      })
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.status(400).json({
          success: false,
          message: 'The user does not exist',
          code: 'E_ROW_NOT_FOUND',
          data: null,
        })
      }

      if (error.code === 'ER_ROW_IS_REFERENCED_2') {
        return response.status(400).json({
          success: false,
          message: 'Cannot delete the user because it has related records.',
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
