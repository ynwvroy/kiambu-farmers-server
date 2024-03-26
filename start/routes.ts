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
   * Incomes
   * ============================================
   */
  Route.group(() => {
    Route.get('/', 'IncomesController.index')
    Route.post('/', 'IncomesController.store')
    Route.get('/:id', 'IncomesController.show')
    Route.put('/:id', 'IncomesController.update')
    Route.delete('/:id', 'IncomesController.delete')
  }).prefix('/incomes')

  /**
   * ============================================
   * Expenses
   * ============================================
   */
  Route.group(() => {
    Route.get('/', 'ExpensesController.index')
    Route.post('/', 'ExpensesController.store')
    Route.get('/:id', 'ExpensesController.show')
    Route.put('/:id', 'ExpensesController.update')
    Route.delete('/:id', 'ExpensesController.delete')
  }).prefix('/expenses')

  /**
   * ============================================
   * Product List
   * ============================================
   */
  Route.group(() => {
    Route.get('/', 'ProductController.index')
    Route.post('/', 'ProductController.store')
    Route.get('/:id', 'ProductController.showById')
    Route.get('/seller/:id', 'ProductController.showBySellerId')
    Route.put('/:id', 'ProductController.update')
    Route.delete('/:id', 'ProductController.delete')
  }).prefix('/products')
}).prefix('/api/v1')

/**
 * ============================================
 * PROTECTED ROUTES
 * ============================================
 */
Route.group(() => {
  /**
   * ============================================
   * Users
   * ============================================
   */
  Route.group(() => {
    Route.get('/', 'UserController.index')
    Route.get('/:id', 'UserController.show')
    Route.get('/all/farmers', 'UserController.getFarmers')
    Route.put('/:id', 'UserController.update')
    Route.delete('/:id', 'UserController.delete')
  }).prefix('/user')

  /**
   * ============================================
   * Crops
   * ============================================
   */
  Route.group(() => {
    Route.get('/', 'CropsController.index')
    Route.post('/', 'CropsController.store')
    Route.get('/:id', 'CropsController.show')
    Route.put('/:id', 'CropsController.update')
    Route.delete('/:id', 'CropsController.delete')
  }).prefix('/crops')

  /**
   * ============================================
   * Crop healths
   * ============================================
   */
  Route.group(() => {
    Route.get('/', 'CropHealthController.index')
    Route.post('/', 'CropHealthController.store')
    Route.get('/:id', 'CropHealthController.show')
    Route.put('/:id', 'CropHealthController.update')
    Route.delete('/:id', 'CropHealthController.delete')
  }).prefix('/crop-health')

  /**
   * ============================================
   * Livestock
   * ============================================
   */
  Route.group(() => {
    Route.get('', 'LivestockController.index')
    Route.post('', 'LivestockController.store')
    Route.get('/:id', 'LivestockController.show')
    Route.put('/:id', 'LivestockController.update')
    Route.delete('/:id', 'LivestockController.delete')
  }).prefix('/livestock')

  /**
   * ============================================
   * Livestock health
   * ============================================
   */
  Route.group(() => {
    Route.get('/', 'LivestockHealthController.index')
    Route.post('/', 'LivestockHealthController.store')
    Route.get('/:id', 'LivestockHealthController.show')
    Route.put('/:id', 'LivestockHealthController.update')
    Route.delete('/:id', 'LivestockHealthController.delete')
  }).prefix('/livestock-health')

  /**
   * ============================================
   * Livestock production
   * ============================================
   */
  Route.group(() => {
    Route.get('/', 'LivestockProductionController.index')
    Route.post('/', 'LivestockProductionController.store')
    Route.get('/:id', 'LivestockProductionController.show')
    Route.put('/:id', 'LivestockProductionController.update')
    Route.delete('/:id', 'LivestockProductionController.delete')
  }).prefix('/livestock-production')

  /**
   * ============================================
   * Sales
   * ============================================
   */
  Route.group(() => {
    Route.get('/', 'SalesController.index')
    Route.post('/', 'SalesController.store')
    Route.get('/:id', 'SalesController.showById')
    Route.get('/seller/:id', 'SalesController.showBySellerId')
    Route.put('/:id', 'SalesController.update')
    Route.delete('/:id', 'SalesController.delete')
  }).prefix('/sales')

  /**
   * ============================================
   * Orders
   * ============================================
   */
  Route.group(() => {
    Route.get('/', 'OrdersController.index')
    Route.get('/:id', 'OrdersController.showById')
    Route.get('/seller/:id', 'OrdersController.showBySellerId')
    Route.get('/buyer/:id', 'OrdersController.showByBuyerId')
    Route.post('/', 'OrdersController.store')
    Route.put('/:id', 'OrdersController.update')
    Route.delete('/:id', 'OrdersController.delete')
  }).prefix('/orders')
}).prefix('/api/v1')
// .middleware('auth')
