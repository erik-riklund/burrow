import type { MiddlewareHandler } from 'service:http-server/types'
import type { RouteHandler } from 'service:http-server/types'

/**
 * Helper function that infers the expected type of the middleware handler.
 */
export const defineMiddlewareHandler = (handler: MiddlewareHandler) => handler;

/**
 * Helper function that infers the expected type of the route handler.
 */
export const defineRouteHandler = (handler: RouteHandler) => handler;