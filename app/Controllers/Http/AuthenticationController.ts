import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class AuthenticationController {
  /**
   * ============================================
   * Register new user
   * ============================================
   */
  public async register({ request, response }: HttpContextContract) {
    try {
      const registerSchema = schema.create({
        full_name: schema.string(),
        username: schema.string(),
        phone_number: schema.string(),
        email: schema.string({}, [rules.email()]),
        password: schema.string(),
        location: schema.string(),
      })

      const payload = await request.validate({ schema: registerSchema })
      const user = await User.create(payload)
      await user.refresh()

      return response.status(200).json({
        success: true,
        message: 'Account created successfully',
        data: user,
      })
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        // Duplicate entry error
        return response.status(400).json({
          success: false,
          message: 'Email or username or phone number or username already exists.',
          data: null,
          code: 'ER_DUP_ENTRY',
        })
      }
      response.status(500).json({
        success: false,
        message: error.message,
        data: error,
      })
    }
  }

  /**
   * ============================================
   * Login
   * ============================================
   */
  public async login({ auth, request, response }: HttpContextContract) {
    try {
      const loginSchema = schema.create({
        email: schema.string({}, [rules.email()]),
        password: schema.string(),
      })

      const payload = await request.validate({ schema: loginSchema })
      const token = await auth.use('api').attempt(payload.email, payload.password)

      const user = await User.findBy('email', payload.email)

      if (!user) {
        throw new Error('Could not find the email password combination used. Please try again!')
      }

      response.status(200).json({
        success: true,
        message: 'Successfully authenticated',
        data: {
          token,
          user: user.toJSON(), // Convert user object to JSON
        },
      })
    } catch (error) {
      response.status(500).json({
        success: false,
        message: error.message,
        data: error,
      })
    }
  }

  /**
   * ============================================
   * Forgot password
   * ============================================
   */
  public async forgotPassword({ request, response }: HttpContextContract) {
    try {
      const forgotPasswordSchema = schema.create({
        email: schema.string({}, [rules.email()]),
      })

      const payload = await request.validate({ schema: forgotPasswordSchema })

      const user = await User.findBy('email', payload.email)

      if (!user) {
        return response.status(400).json({
          success: false,
          message: 'Could not find any user by the email provided',
          data: null,
        })
      }
      // generate random password
      const newPassword = Math.random().toString(36).substring(7)
      //const resetExpiry = ''
      await user.merge({
        password: newPassword,
        //isReset:true,
        //resetExpiry:resetExpiry,
      })
      await user.save()
      // TODO: send email containing newly set password
      return response.status(200).json({
        success: true,
        message: 'Follow the instructions sent to your email to login',
        data: null,
      })
    } catch (error) {
      response.status(500).json({
        success: false,
        message: error.message,
        data: error,
      })
    }
  }

  /**
   * ============================================
   * Reset password
   * ============================================
   */
  public async resetPassword({ request, response, auth }: HttpContextContract) {
    try {
      const setPasswordSchema = schema.create({
        password: schema.string(),
        confirmPassword: schema.string(),
      })

      await auth.use('api').authenticate()
      const user = auth.use('api').user
      if (!user) {
        return response.status(404).json({
          success: false,
          message: 'user is not authenticated',
          data: null,
        })
      }

      const payload = await request.validate({ schema: setPasswordSchema })
      user.password = payload.password
      await user.save()
      return response.status(200).json({
        success: true,
        message: 'password successfully set',
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
}
