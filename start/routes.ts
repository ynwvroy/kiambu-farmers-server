import Route from '@ioc:Adonis/Core/Route'

import HealthCheck from '@ioc:Adonis/Core/HealthCheck'

Route.get('/health', async ({ response }) => {
  const report = await HealthCheck.getReport()

  return report.healthy ? response.ok(report) : response.badRequest(report)
})

Route.get('/', async () => {
  return 'App running 🚀'
})

Route.group(() => {
  /**
   * ============================================
   * Authentication
   * ============================================
   */
  Route.group(() => {
    Route.post('/register', 'AuthenticationController.register')
    Route.post('/login', 'AuthenticationController.login')
    Route.post('/forgot-password', 'AuthenticationController.forgotPassword')
    Route.post('/reset-password', 'AuthenticationController.resetPassword')
  }).prefix('/auth')
  /**
   * ============================================
   * Users
   * ============================================
   */
  Route.group(() => {
    Route.get('/', 'UsersController.index')
    Route.get('/:id', 'UsersController.showById')
    Route.get('/slug/:slug', 'UsersController.showByUsername')
    Route.put('/:id', 'UsersController.update')
    Route.delete('/:id', 'UsersController.delete')
  })
    .prefix('/users')
    .middleware('auth')
}).prefix('/api/v1')
