export const getQuery = (params: Record<string, unknown>): string => {
  if (!Object.keys(params).length) return ''

  const sanitizedObj = Object.fromEntries(
    Object.entries(params).map(([key, val]) => [key, `${val}`])
  )

  return Object.keys(sanitizedObj)
    ? `?${new URLSearchParams(sanitizedObj).toString()}`
    : ''
}
