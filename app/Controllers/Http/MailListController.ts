import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import MailList from '../../Models/MailList'

export default class MailListController {
  public async index({ response }: HttpContextContract) {
    try {
      const mailList = await MailList.query().select('*').from('mail_lists')
      return response.json({
        success: true,
        message: 'MailLists retrieved successfully',
        data: mailList,
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
      const mailList = await MailList.find(params.id)
      if (mailList) {
        return response.json({
          success: true,
          message: 'Mail record retrieved successfully',
          data: mailList,
        })
      } else {
        return response.json({
          success: true,
          message: 'Mail record not found',
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
      const mailList = await MailList.create(data)
      return response.json({
        success: true,
        message: 'Added to mail-list successfully',
        data: mailList,
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
      const mailList = await MailList.findOrFail(params.id)
      if (!mailList) {
        return response.json({
          success: true,
          message: 'Mail record not found',
          data: null,
        })
      } else {
        mailList.merge(request.all())

        await mailList.save()
        return response.json({
          success: true,
          message: 'Mail record updated successfully',
          data: mailList,
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
      const mailList = await MailList.findOrFail(params.id)
      await mailList.delete()

      return response.json({
        success: true,
        message: 'Successfully deleted the mail record',
        data: null,
      })
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.status(400).json({
          success: false,
          message: 'The mail record does not exist',
          code: 'E_ROW_NOT_FOUND',
          data: null,
        })
      }

      if (error.code === 'ER_ROW_IS_REFERENCED_2') {
        return response.status(400).json({
          success: false,
          message: 'Cannot delete the mail record because it has related records',
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
