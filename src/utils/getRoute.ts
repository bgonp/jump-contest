const getRoute = (route: string, params: Record<string, string>): string =>
  Object.entries(params).reduce(
    (finalRoute, [key, value]) => finalRoute.replace(`:${key}`, value),
    route
  )

export default getRoute
