import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Team from '../../Models/Team'

export default class TeamController {
  public async index({ response }: HttpContextContract) {
    try {
      const team = await Team.query()
        .select('*')
        .from('teams')
        .preload('organization')
        .preload('event')
      return response.json({
        success: true,
        message: 'Teams retrieved successfully',
        data: team,
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
      const team = await Team.find(params.id)
      if (team) {
        return response.json({
          success: true,
          message: 'Team retrieved successfully',
          data: team,
        })
      } else {
        return response.json({
          success: true,
          message: 'Team not found',
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
      const teamQuery = await Team.create(data)
      return response.json({
        success: true,
        message: 'Team saved successfully',
        data: teamQuery,
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
      const team = await Team.findOrFail(params.id)
      if (!team) {
        return response.json({
          success: true,
          message: 'Team not found',
          data: null,
        })
      } else {
        team.merge(request.all())

        await team.save()
        return response.json({
          success: true,
          message: 'Team updated successfully',
          data: team,
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
      const team = await Team.findOrFail(params.id)
      await team.delete()

      return response.json({
        success: true,
        message: 'Successfully deleted the team',
        data: null,
      })
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.status(400).json({
          success: false,
          message: 'The team does not exist',
          code: 'E_ROW_NOT_FOUND',
          data: null,
        })
      }

      if (error.code === 'ER_ROW_IS_REFERENCED_2') {
        return response.status(400).json({
          success: false,
          message: 'Cannot delete the team because it has related records',
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
