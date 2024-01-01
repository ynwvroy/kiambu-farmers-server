import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Contact from '../../Models/Contact'

export default class ContactController {
  public async index({ response }: HttpContextContract) {
    try {
      const contact = await Contact.query().select('*').from('contacts')
      return response.json({
        success: true,
        message: 'Contact queries retrieved successfully',
        data: contact,
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
      const contact = await Contact.find(params.id)
      if (contact) {
        return response.json({
          success: true,
          message: 'Contact query retrieved successfully',
          data: contact,
        })
      } else {
        return response.json({
          success: true,
          message: 'Contact query not found',
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
      const contactQuery = await Contact.create(data)
      return response.json({
        success: true,
        message: 'Contact query stored successfully',
        data: contactQuery,
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
      const contact = await Contact.findOrFail(params.id)
      if (!contact) {
        return response.json({
          success: true,
          message: 'Contact query not found',
          data: null,
        })
      } else {
        contact.merge(request.all())

        await contact.save()
        return response.json({
          success: true,
          message: 'Contact query updated successfully',
          data: contact,
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
      const query = await Contact.findOrFail(params.id)
      await query.delete()

      return response.json({
        success: true,
        message: 'Successfully deleted the contact query',
        data: null,
      })
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.status(400).json({
          success: false,
          message: 'The contact query does not exist',
          data: null,
        })
      }

      if (error.code === 'ER_ROW_IS_REFERENCED_2') {
        return response.status(400).json({
          success: false,
          message: 'Cannot delete the contact query because it has related records',
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
