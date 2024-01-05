import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { DateTime } from 'luxon'
import Tasks from 'App/Models/Tasks'
import Teams from 'App/Models/Sales'
import Organizations from 'App/Models/Organizations'
import Events from 'App/Models/Events'
import EventCategories from 'App/Models/EventCategories'
import Careers from 'App/Models/Careers'
import MailList from 'App/Models/MailList'
import OrganizationsComments from 'App/Models/OrganizationsComments'
import EventsComments from 'App/Models/EventsComments'

export default class AnalyticsController {
  public async tasks({ response }: HttpContextContract) {
    try {
      // Total tasks
      const totalTasks = await Tasks.query().select('*').from('tasks')

      // Count tasks per team and order by count in descending order
      const teamWithMostTasks = await Teams.query()
        .select('teams.*')
        .count('tasks.id as taskCount')
        .leftJoin('tasks', 'teams.id', 'tasks.team_id')
        .groupBy('teams.id')
        .orderBy('taskCount', 'desc')
        .firstOrFail()

      // Find number of tasks in the team with most tasks
      const teamTasksCount = await Tasks.query()
        .select('*')
        .from('tasks')
        .where('team_id', teamWithMostTasks.id)

      // Team with the least tasks
      const teamWithLeastTasks = await Teams.query()
        .select('teams.*')
        .count('tasks.id as taskCount')
        .leftJoin('tasks', 'teams.id', 'tasks.team_id')
        .groupBy('teams.id')
        .orderBy('taskCount', 'asc')
        .firstOrFail()

      // Find number of tasks in the team with least tasks
      const teamLeastTasksCount = await Tasks.query()
        .select('*')
        .from('tasks')
        .where('team_id', teamWithLeastTasks.id)

      return response.json({
        success: true,
        message: 'Tasks Analytics Retrieved Successfully',
        data: {
          totalTasks: totalTasks.length,
          teamWithMostTasks: {
            name: teamWithMostTasks.name,
            taskCount: teamTasksCount.length,
          },
          teamWithLeastTasks: {
            name: teamWithLeastTasks.name,
            taskCount: teamLeastTasksCount.length,
          },
        },
      })
    } catch (error) {
      return response.json({
        success: false,
        message: error.message,
        data: error,
      })
    }
  }

  public async organizations({ response }: HttpContextContract) {
    try {
      // Total organizations
      const totalOrganizations = await Organizations.query().select('*').from('organizations')

      const totalEvents = await Events.query().select('*').from('events')

      // Organization with the highest number of events
      const organizationWithHighestEvents = await Organizations.query()
        .select('organizations.*')
        .leftJoin('events', 'organizations.id', 'events.organization_id')
        .groupBy('organizations.id')
        .orderByRaw('COUNT(events.id) DESC')
        .first()

      // Events for the organization with the highest events
      const eventCountForHighest = await Events.query().where(
        'organization_id',
        organizationWithHighestEvents?.id
      )

      // Organization with the least number of events
      const organizationWithLeastEvents = await Organizations.query()
        .select('organizations.*')
        .leftJoin('events', 'organizations.id', 'events.organization_id')
        .groupBy('organizations.id')
        .orderByRaw('COUNT(events.id) ASC')
        .first()

      // Events for the organization with the least events
      const eventCountForLeast = await Events.query().where(
        'organization_id',
        organizationWithLeastEvents?.id
      )

      return response.json({
        success: true,
        message: 'Organization Analytics Retrieved Successfully',
        data: {
          totalOrganizations: totalOrganizations.length,
          // avgEventsPerOrganization: totalEvents.length / totalOrganizations.length,
          organizationWithHighestEvents: {
            name: organizationWithHighestEvents?.name,
            events: eventCountForHighest.length,
          },
          organizationWithLeastEvents: {
            name: organizationWithLeastEvents?.name,
            events: eventCountForLeast.length,
          },
        },
      })
    } catch (error) {
      return response.json({
        success: false,
        message: error.message,
        data: error,
      })
    }
  }

  public async teams({ response }: HttpContextContract) {
    try {
      // Total teams
      const totalTeams = await Teams.query().select('*').from('teams')

      // Organization with the most teams
      const organizationWithMostTeams = await Organizations.query()
        .select('organizations.*')
        .leftJoin('teams', 'organizations.id', 'teams.organization_id')
        .groupBy('organizations.id')
        .orderByRaw('COUNT(teams.id) DESC')
        .first()

      const organizationWithMostTeamsCount = await Teams.query()
        .select('*')
        .from('teams')
        .where('organization_id', organizationWithMostTeams?.id)

      // Team with the most tasks
      const teamWithMostTasks = await Teams.query()
        .select('teams.*')
        .leftJoin('tasks', 'teams.id', 'tasks.team_id')
        .groupBy('teams.id')
        .orderByRaw('COUNT(tasks.id) DESC')
        .first()

      // Team with the most tasks count
      const teamWithMostTasksCount = await Tasks.query().where('team_id', teamWithMostTasks?.id)

      // Team with the least tasks
      const teamWithLeastTasks = await Teams.query()
        .select('teams.*')
        .leftJoin('tasks', 'teams.id', 'tasks.team_id')
        .groupBy('teams.id')
        .orderByRaw('COUNT(tasks.id) ASC')
        .first()

      // Team with the least tasks count
      const teamWithLeastTasksCount = await Tasks.query().where('team_id', teamWithLeastTasks?.id)

      return response.json({
        success: true,
        message: 'Team Analytics Retrieved Successfully',
        data: {
          totalTeams: totalTeams.length,
          organizationWithMostTeams: {
            name: organizationWithMostTeams?.name,
            teamCount: organizationWithMostTeamsCount.length,
          },
          teamWithMostTasks: {
            name: teamWithMostTasks?.name,
            taskCount: teamWithMostTasksCount.length,
          },
          teamWithLeastTasks: {
            name: teamWithLeastTasks?.name,
            taskCount: teamWithLeastTasksCount.length,
          },
        },
      })
    } catch (error) {
      return response.json({
        success: false,
        message: error.message,
        data: error,
      })
    }
  }

  public async eventCategories({ response }: HttpContextContract) {
    try {
      // Total event categories
      const totalEventCategories = await EventCategories.query()
        .select('*')
        .from('event_categories')

      // Category with the most events
      const categoryWithMostEvents = await EventCategories.query()
        .select('event_categories.*')
        .count('events.id as eventCount')
        .leftJoin('events', 'event_categories.id', 'events.event_category_id')
        .groupBy('event_categories.id')
        .orderBy('eventCount', 'desc')
        .firstOrFail()

      // Find number of events in the category with most events
      const categoryMostEventsCount = await Events.query()
        .select('*')
        .from('events')
        .where('event_category_id', categoryWithMostEvents.id)

      // Category with the least events
      const categoryWithLeastEvents = await EventCategories.query()
        .select('event_categories.*')
        .count('events.id as eventCount')
        .leftJoin('events', 'event_categories.id', 'events.event_category_id')
        .groupBy('event_categories.id')
        .orderBy('eventCount', 'asc')
        .firstOrFail()

      // Find number of events in the category with least events
      const categoryLeastEventsCount = await Events.query()
        .select('*')
        .from('events')
        .where('event_category_id', categoryWithLeastEvents.id)

      return response.json({
        success: true,
        message: 'Event Categories Analytics Retrieved Successfully',
        data: {
          totalEventCategories: totalEventCategories.length,
          categoryWithMostEvents: {
            name: categoryWithMostEvents.name,
            eventCount: categoryMostEventsCount.length,
          },
          categoryWithLeastEvents: {
            name: categoryWithLeastEvents.name,
            eventCount: categoryLeastEventsCount.length,
          },
        },
      })
    } catch (error) {
      return response.json({
        success: false,
        message: error.message,
        data: error,
      })
    }
  }

  public async careers({ response }: HttpContextContract) {
    try {
      // Total career applications
      const totalCareerApplications = await Careers.query().select('*').from('careers')

      // Role application with the most records
      const roleWithMostRecords = await Careers.query()
        .select('role_application')
        .count('id as recordCount')
        .groupBy('role_application')
        .orderBy('recordCount', 'desc')
        .first()

      // Total applications for the role with most records
      const roleMostRecordsCount = roleWithMostRecords ? roleWithMostRecords.$extras.recordCount : 0

      // Role application with the least records
      const roleWithLeastRecords = await Careers.query()
        .select('role_application')
        .count('id as recordCount')
        .groupBy('role_application')
        .orderBy('recordCount', 'asc')
        .first()

      // Total applications for the role with least records
      const roleLeastRecordsCount = roleWithLeastRecords
        ? roleWithLeastRecords.$extras.recordCount
        : 0

      // Total applications in the last 30 days
      const thirtyDaysAgo = DateTime.now().minus({ days: 30 })
      const totalApplicationsLast30Days = await Careers.query()
        .select('*')
        .from('careers')
        .where('created_at', '>=', thirtyDaysAgo.toSQLDate())

      return response.json({
        success: true,
        message: 'Careers Analytics Retrieved Successfully',
        data: {
          totalCareerApplications: totalCareerApplications.length,
          roleWithMostRecords: {
            role: roleWithMostRecords?.role_application,
            recordCount: roleMostRecordsCount,
          },
          roleWithLeastRecords: {
            role: roleWithLeastRecords?.role_application,
            recordCount: roleLeastRecordsCount,
          },
          totalApplicationsLast30Days: totalApplicationsLast30Days.length,
        },
      })
    } catch (error) {
      return response.json({
        success: false,
        message: error.message,
        data: error,
      })
    }
  }

  public async mailList({ response }: HttpContextContract) {
    try {
      // Total mail lists
      const totalMailList = await MailList.query().select('*').from('mail_lists')

      // Mail lists in the last 30 days
      const thirtyDaysAgo = DateTime.now().minus({ days: 30 })
      const mailListsLast30Day = await MailList.query()
        .select('*')
        .from('mail_lists')
        .where('created_at', '>=', thirtyDaysAgo.toSQLDate())

      // Mail lists in the last 60 days
      const sixtyDaysAgo = DateTime.now().minus({ days: 60 })
      const mailListsLast60Day = await MailList.query()
        .select('*')
        .from('mail_lists')
        .where('created_at', '>=', sixtyDaysAgo.toSQLDate())

      return response.json({
        success: true,
        message: 'Mail Lists Analytics Retrieved Successfully',
        data: {
          totalMailList: totalMailList.length,
          mailListsLast30Day: mailListsLast30Day.length,
          mailListsLast60Day: mailListsLast60Day.length,
        },
      })
    } catch (error) {
      return response.json({
        success: false,
        message: error.message,
        data: error,
      })
    }
  }

  public async organizationComments({ response }: HttpContextContract) {
    try {
      // Total comments
      const totalComments = await OrganizationsComments.query()
        .select('*')
        .from('organizations_comments')

      // Organization with the highest rating
      const orgWithHighestRating = await Organizations.query()
        .select('organizations.*')
        .leftJoin(
          'organizations_comments',
          'organizations.id',
          'organizations_comments.organization_id'
        )
        .groupBy('organizations.id')
        .orderByRaw('MAX(organizations_comments.rating) DESC')
        .first()

      // Organization with the least rating
      const orgWithLeastRating = await Organizations.query()
        .select('organizations.*')
        .leftJoin(
          'organizations_comments',
          'organizations.id',
          'organizations_comments.organization_id'
        )
        .groupBy('organizations.id')
        .orderByRaw('MIN(organizations_comments.rating) ASC')
        .first()

      return response.json({
        success: true,
        message: 'Organization Comments Analytics Retrieved Successfully',
        data: {
          totalComments: totalComments.length,
          orgWithHighestRating: {
            name: orgWithHighestRating?.name,
            highestRating: orgWithHighestRating ? orgWithHighestRating.$extras.max_rating : 0,
          },
          orgWithLeastRating: {
            name: orgWithLeastRating?.name,
            leastRating: orgWithLeastRating ? orgWithLeastRating.$extras.min_rating : 0,
          },
        },
      })
    } catch (error) {
      return response.json({
        success: false,
        message: error.message,
        data: error,
      })
    }
  }

  public async eventsComments({ response }: HttpContextContract) {
    try {
      // Total comments
      const totalComments = await EventsComments.query().select('*').from('events_comments')

      // Event with the highest rating
      const eventWithHighestRating = await Events.query()
        .select('events.*')
        .leftJoin('events_comments', 'events.id', 'events_comments.event_id')
        .groupBy('events.id')
        .orderByRaw('MAX(events_comments.rating) DESC')
        .first()

      // Event with the least rating
      const eventWithLeastRating = await Events.query()
        .select('events.*')
        .leftJoin('events_comments', 'events.id', 'events_comments.event_id')
        .groupBy('events.id')
        .orderByRaw('MIN(events_comments.rating) ASC')
        .first()

      return response.json({
        success: true,
        message: 'Events Comments Analytics Retrieved Successfully',
        data: {
          totalComments: totalComments.length,
          eventWithHighestRating: {
            name: eventWithHighestRating?.name,
            highestRating: eventWithHighestRating ? eventWithHighestRating.$extras.max_rating : 0,
          },
          eventWithLeastRating: {
            name: eventWithLeastRating?.name,
            leastRating: eventWithLeastRating ? eventWithLeastRating.$extras.min_rating : 0,
          },
        },
      })
    } catch (error) {
      return response.json({
        success: false,
        message: error.message,
        data: error,
      })
    }
  }
}
