import { User } from 'better-auth'
import type { H3Event, H3EventContext } from 'h3'
import { requireAuth } from '../services/better-auth'

type authenticatedEvent = H3Event & {
  context: H3EventContext & {
    user: User
  }
}

export default function authenticatedUserHandler<T>(handler: (event: authenticatedEvent) => T | Promise<T>) {
  return defineEventHandler(async (event) => {
    await requireAuth(event) 
    return handler(event as authenticatedEvent)
  })
}