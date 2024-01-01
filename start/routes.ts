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
    message: 'Eveenti API running 🚀',
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
   * Analytics - GET
   * ============================================
   */
  Route.group(() => {
    Route.get('/tasks', 'AnalyticsController.tasks')
    Route.get('/organizations', 'AnalyticsController.organizations')
    Route.get('/teams', 'AnalyticsController.teams')
    Route.get('/event-categories', 'AnalyticsController.eventCategories')
    Route.get('/careers', 'AnalyticsController.careers')
    Route.get('/mail-list', 'AnalyticsController.mailList')
    Route.get('/organizations-comments', 'AnalyticsController.organizationComments')
    Route.get('/events-comments', 'AnalyticsController.eventsComments')
  }).prefix('/analytics')

  /**
   * ============================================
   * Event categories
   * ============================================
   */
  Route.group(() => {
    Route.get('/', 'EventCategoriesController.index')
    Route.post('/', 'EventCategoriesController.store')
    Route.get('/:id', 'EventCategoriesController.showById')
    Route.get('/slug/:slug', 'EventCategoriesController.showBySlug')
    Route.put('/:id', 'EventCategoriesController.update')
    Route.delete('/:id', 'EventCategoriesController.delete')
  }).prefix('/event-categories')

  /**
   * ============================================
   * Events comments
   * ============================================
   */
  Route.group(() => {
    Route.get('/', 'EventsCommentsController.index')
    Route.get('/:id', 'EventsCommentsController.show')
    Route.post('/', 'EventsCommentsController.store')
    Route.put('/:id', 'EventsCommentsController.update')
    Route.delete('/:id', 'EventsCommentsController.delete')
  }).prefix('/events-comments')

  /**
   * ============================================
   * Events
   * ============================================
   */
  Route.group(() => {
    Route.get('/', 'EventsController.index')
    Route.post('/', 'EventsController.store')
    Route.get('/:id', 'EventsController.showById')
    Route.get('/slug/:slug', 'EventsController.showBySlug')
    Route.put('/:id', 'EventsController.update')
    Route.delete('/:id', 'EventsController.delete')

    Route.get('/org/:id', 'EventsController.getOrganizationEventsById')
    Route.get('/org-slug/:slug', 'EventsController.getOrganizationEventsBySlug')
    Route.get('/category/:id', 'EventsController.getEventCategoryEventsById')
    Route.get('/category-slug/:slug', 'EventsController.getEventCategoryEventsBySlug')
  }).prefix('/events')

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
   * Organization comments
   * ============================================
   */
  Route.group(() => {
    Route.get('/', 'OrganizationsCommentsController.index')
    Route.get('/:id', 'OrganizationsCommentsController.show')
    Route.post('/', 'OrganizationsCommentsController.store')
    Route.put('/:id', 'OrganizationsCommentsController.update')
    Route.delete('/:id', 'OrganizationsCommentsController.delete')
  }).prefix('/organizations-comments')

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
   * Tickets
   * ============================================
   */
  Route.group(() => {
    Route.get('/', 'TicketsController.index')
    Route.get('/event/:id', 'TicketsController.getEventTickets')
    Route.post('/', 'TicketsController.store')
    Route.get('/:id', 'TicketsController.show')
    Route.put('/:id', 'TicketsController.update')
    Route.delete('/:id', 'TicketsController.delete')
  }).prefix('/tickets')

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
   * Teams
   * ============================================
   */
  Route.group(() => {
    Route.get('/', 'TeamController.index')
    Route.post('/', 'TeamController.store')
    Route.get('/:id', 'TeamController.show')
    Route.put('/:id', 'TeamController.update')
    Route.delete('/:id', 'TeamController.delete')
  }).prefix('/teams')

  /**
   * ============================================
   * Tasks
   * ============================================
   */
  Route.group(() => {
    Route.get('/', 'TasksController.index')
    Route.post('/', 'TasksController.store')
    Route.get('/:id', 'TasksController.show')
    Route.put('/:id', 'TasksController.update')
    Route.delete('/:id', 'TasksController.delete')
  }).prefix('/tasks')

  /**
   * ============================================
   * Careers Application
   * ============================================
   */
  Route.group(() => {
    Route.get('/', 'CareersController.index')
    Route.get('/:id', 'CareersController.show')
    Route.post('/', 'CareersController.store')
    Route.put('/:id', 'CareersController.update')
    Route.delete('/:id', 'CareersController.delete')
  }).prefix('/career-application')
})
  .prefix('/api/v1')
  .middleware('auth')
