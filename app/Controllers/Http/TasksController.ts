import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Tasks from '../../Models/Tasks'

export default class TasksController {
  public async index({ response }: HttpContextContract) {
    try {
      const task = await Tasks.query()
        .select('*')
        .from('tasks')
        .preload('team')
        .preload('assignee')
        .preload('creator')
      return response.json({
        success: true,
        message: 'Tasks retrieved successfully',
        data: task,
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
      const task = await Tasks.query()
        .where('id', params.id)
        .preload('team')
        .preload('assignee')
        .preload('creator')
        .first()
      if (task) {
        return response.json({
          success: true,
          message: 'Task retrieved successfully',
          data: task,
        })
      } else {
        return response.json({
          success: true,
          message: 'Task not found',
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
      const tasksQuery = await Tasks.create(data)
      return response.json({
        success: true,
        message: 'Task stored successfully',
        data: tasksQuery,
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
      const task = await Tasks.findOrFail(params.id)
      if (!task) {
        return response.json({
          success: true,
          message: 'Task not found',
          data: null,
        })
      } else {
        task.merge(request.all())

        await task.save()
        return response.json({
          success: true,
          message: 'Task updated successfully',
          data: task,
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
      const task = await Tasks.findOrFail(params.id)
      await task.delete()

      return response.status(200).json({
        success: true,
        message: 'Successfully deleted the task',
        data: null,
      })
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.status(400).json({
          success: false,
          message: 'The task does not exist',
          code: 'E_ROW_NOT_FOUND',
          data: null,
        })
      }

      if (error.code === 'ER_ROW_IS_REFERENCED_2') {
        return response.status(400).json({
          success: false,
          message: 'Cannot delete the task because it has related records.',
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
