import { cloneElement, useEffect } from 'react'

import type { ReactElement, ReactNode } from 'react'

export type FetchProps<T, E> = {
  data: T | null
  isLoading: boolean
  error: E | null
  errorComponent?: ReactElement<{ error: E }> | ((error: E) => ReactNode)
  loadingComponent?: ReactElement
  children: ReactElement<{ data: T }> | ((data: T) => ReactNode)
}

// declarative presentation of fetch state
export function Fetch<T = any, E = any>({
  error,
  data,
  isLoading,
  errorComponent,
  loadingComponent,
  children,
}: FetchProps<T, E>): ReactNode {

  useEffect(() => {
    console.log('data', data)
  }, [data])
  
  const isError = error !== null
  const hasData = data !== null

  useEffect(() => {
    console.log('hasData', hasData)
  }, [hasData])

  if (isError && errorComponent) {
    return typeof errorComponent === 'function'
      ? errorComponent(error)
      : cloneElement(errorComponent, { error })
  }

  if (isLoading && loadingComponent) {
    return loadingComponent
  }

  if (hasData) {
    return typeof children === 'function'
      ? children(data)
      : cloneElement(children, { data })
  }

  return null
}
