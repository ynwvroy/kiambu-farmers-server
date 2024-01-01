import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import OrganizationsComments from '../../Models/OrganizationsComments'

export default class OrganizationsCommentsController {
  public async index({ response }: HttpContextContract) {
    try {
      const organizationsComments = await OrganizationsComments.query()
        .select('*')
        .from('organizations_comments')
        .preload('organization')
      return response.json({
        success: true,
        message: 'Organizations comments retrieved successfully',
        data: organizationsComments,
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
      const organizationsComments = await OrganizationsComments.query()
        .where('id', params.id)
        .preload('organization')
        .first()
      if (organizationsComments) {
        return response.json({
          success: true,
          message: "Organization's comment retrieved successfully",
          data: organizationsComments,
        })
      } else {
        return response.json({
          success: true,
          message: "Organization's comment not found",
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
      const organizationsComments = await OrganizationsComments.create(data)
      return response.json({
        success: true,
        message: "Organization's comment created successfully",
        data: organizationsComments,
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
      const organizationsComments = await OrganizationsComments.findOrFail(params.id)
      if (!organizationsComments) {
        return response.json({
          success: true,
          message: "Organization's comment not found",
          data: null,
        })
      } else {
        organizationsComments.merge(request.all())

        await organizationsComments.save()
        return response.json({
          success: true,
          message: "Organization's comment updated successfully",
          data: organizationsComments,
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
      const organizationsComments = await OrganizationsComments.findOrFail(params.id)
      await organizationsComments.delete()

      return response.json({
        success: true,
        message: "Successfully deleted the organization's comment",
        data: null,
      })
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.status(400).json({
          success: false,
          message: "Organization's comment does not exist",
          data: null,
        })
      }

      if (error.code === 'ER_ROW_IS_REFERENCED_2') {
        return response.status(400).json({
          success: false,
          message: "Cannot delete the organization's comment because it has related records",
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
