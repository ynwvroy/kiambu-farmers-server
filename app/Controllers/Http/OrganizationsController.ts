import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import Organizations from '../../Models/Organizations'

export default class OrganizationsController {
  public async index({ response }: HttpContextContract) {
    try {
      const organizations = await Organizations.query()
        .select('*')
        .from('organizations')
        .preload('user')
      return response.json({
        success: true,
        message: 'Organizations retrieved successfully',
        data: organizations,
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
      const organizations = await Organizations.find(params.id)
      if (organizations) {
        return response.json({
          success: true,
          message: 'Organization retrieved successfully',
          data: organizations,
        })
      } else {
        return response.json({
          success: true,
          message: 'Organization not found',
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

  // Get organization by slug
  public async showBySlug({ params, response }: HttpContextContract) {
    try {
      const organization = await Organizations.query()
        .select('*')
        .from('organizations')
        .where('slug', params.slug)

      if (organization) {
        return response.json({
          success: true,
          message: 'Organization retrieved successfully',
          data: organization,
        })
      } else {
        return response.json({
          success: true,
          message: 'Organization not found',
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
      // const data = request.all()
      // const organizations = await Organizations.create(data)

      // use a schema
      const organizationSchema = schema.create({
        name: schema.string(),
        description: schema.string.optional(),
        slug: schema.string(),
        admin_id: schema.number.optional(),
        contact_phone_number: schema.string.optional(),
        contact_email: schema.string.optional(),
        instagram_url: schema.string.optional(),
        facebook_url: schema.string.optional(),
        twitter_url: schema.string.optional(),
        linkedin_url: schema.string.optional(),
        location: schema.string.optional(),
        profile_url: schema.string.optional(),
      })

      const payload = await request.validate({ schema: organizationSchema })
      const organization = await Organizations.create(payload)
      await organization.refresh()

      return response.json({
        success: true,
        message: 'Organization created successfully',
        data: organization,
      })
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        // Duplicate entry error
        return response.status(400).json({
          success: false,
          message: 'An organization with that name already exists.',
          data: null,
          code: 'ER_DUP_ENTRY',
        })
      }
      return response.json({
        success: false,
        message: error.message,
        data: error,
      })
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    try {
      const organizations = await Organizations.findOrFail(params.id)
      if (!organizations) {
        return response.json({
          success: true,
          message: 'Organization not found',
          data: null,
        })
      } else {
        organizations.merge(request.all())

        await organizations.save()
        return response.json({
          success: true,
          message: 'Organization updated successfully',
          data: organizations,
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
      const organization = await Organizations.findOrFail(params.id)
      await organization.delete()

      return response.json({
        success: true,
        message: 'Successfully deleted the organization',
        data: null,
      })
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.status(400).json({
          success: false,
          message: 'The organization does not exist',
          data: null,
          code: 'E_ROW_NOT_FOUND',
        })
      }

      if (error.code === 'ER_ROW_IS_REFERENCED_2') {
        return response.status(400).json({
          success: false,
          message: 'Cannot delete the organization because it has related records',
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
