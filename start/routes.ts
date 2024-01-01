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
   * Users
   * ============================================
   */
  Route.group(() => {
    Route.get('/', 'UsersController.index')
    Route.get('/:id', 'UsersController.showById')
    Route.get('/slug/:slug', 'UsersController.showByUsername')
    Route.put('/:id', 'UsersController.update')
    Route.delete('/:id', 'UsersController.delete')
  }).prefix('/users')
}).prefix('/api/v1')
//   .middleware('auth')
