import Route from '@ioc:Adonis/Core/Route'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'

/**
 * ============================================
 * Home
 * ============================================
 */
Route.get('api/v1', ({ response }: HttpContextContract) => {
  return response.status(200).json({
    success: true,
    message: 'Kiambu Farmers API running 🚀',
  })
})
/**
 * ============================================
 * Health
 * ============================================
 */
Route.get('api/v1/health', async ({ response }) => {
  const report = await HealthCheck.getReport()

  return report.healthy ? response.ok(report) : response.badRequest(report)
})

/**
 * ============================================
 * Authentication
 * ============================================
 */
Route.group(() => {
  Route.post('/login', 'AuthenticationController.login')
  Route.post('/register', 'AuthenticationController.register')
  Route.post('/forgot-password', 'AuthenticationController.forgotPassword')
  Route.post('/reset-password', 'AuthenticationController.resetPassword')
}).prefix('/api/v1/auth')

/**
 * ============================================
 * PUBLIC ROUTES
 * ============================================
 */
Route.group(() => {
  /**
   * ============================================
   * Product categories
   * ============================================
   */
  Route.group(() => {
    Route.get('/', 'ProductCategoriesController.index')
    Route.post('/', 'ProductCategoriesController.store')
    Route.get('/:id', 'ProductCategoriesController.showById')
    Route.get('/slug/:slug', 'ProductCategoriesController.showBySlug')
    Route.put('/:id', 'ProductCategoriesController.update')
    Route.delete('/:id', 'ProductCategoriesController.delete')
  }).prefix('/product-categories')

  /**
   * ============================================
   * Users
   * ============================================
   */
  Route.group(() => {
    Route.get('/:id', 'AuthenticationController.show')
  }).prefix('/user')
}).prefix('/api/v1')

/**
 * ============================================
 * PROTECTED ROUTES
 * ============================================
 */
Route.group(() => {
  /**
   * ============================================
   * Organization
   * ============================================
   */
  Route.group(() => {
    Route.get('/', 'OrganizationsController.index')
    Route.post('/', 'OrganizationsController.store')
    Route.get('/:id', 'OrganizationsController.showById')
    Route.get('/slug/:slug', 'OrganizationsController.showBySlug')
    Route.put('/:id', 'OrganizationsController.update')
    Route.delete('/:id', 'OrganizationsController.delete')
  }).prefix('/organizations')

  /**
   * ============================================
   * Users
   * ============================================
   */
  Route.group(() => {
    Route.get('/', 'AuthenticationController.index')
    Route.put('/:id', 'UserController.update')
    Route.delete('/:id', 'UserController.delete')
  }).prefix('/user')

  /**
   * ============================================
   * Promo codes
   * ============================================
   */
  Route.group(() => {
    Route.get('/', 'PromoCodesController.index')
    Route.post('/', 'PromoCodesController.store')
    Route.get('/:id', 'PromoCodesController.show')
    Route.put('/:id', 'PromoCodesController.update')
    Route.delete('/:id', 'PromoCodesController.delete')
  }).prefix('/promo-codes')

  /**
   * ============================================
   * Contact queries
   * ============================================
   */
  Route.group(() => {
    Route.get('/', 'ContactController.index')
    Route.post('/', 'ContactController.store')
    Route.get('/:id', 'ContactController.show')
    Route.put('/:id', 'ContactController.update')
    Route.delete('/:id', 'ContactController.delete')
  }).prefix('/contact-queries')

  /**
   * ============================================
   * Mailing List
   * ============================================
   */
  Route.group(() => {
    Route.get('/', 'MailListController.index')
    Route.post('/', 'MailListController.store')
    Route.get('/:id', 'MailListController.show')
    Route.put('/:id', 'MailListController.update')
    Route.delete('/:id', 'MailListController.delete')
  }).prefix('/mail-list')

  /**
   * ============================================
   * Sales
   * ============================================
   */
  Route.group(() => {
    Route.get('/', 'SalesController.index')
    Route.post('/', 'SalesController.store')
    Route.get('/:id', 'SalesController.show')
    Route.put('/:id', 'SalesController.update')
    Route.delete('/:id', 'SalesController.delete')
  }).prefix('/sales')

  /**
   * ============================================
   * Orders Application
   * ============================================
   */
  Route.group(() => {
    Route.get('/', 'OrdersController.index')
    Route.get('/:id', 'OrdersController.show')
    Route.post('/', 'OrdersController.store')
    Route.put('/:id', 'OrdersController.update')
    Route.delete('/:id', 'OrdersController.delete')
  }).prefix('/order')
})
  .prefix('/api/v1')
  .middleware('auth')
