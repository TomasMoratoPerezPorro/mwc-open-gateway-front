import { Reducer, useMemo, useReducer } from 'react'
import { http } from '../utils/http'
import { ApiError, dtoUtils } from '../types/utilities'
import { useConfig } from '../context/config-context'

export type HTTPMethod = keyof typeof http

export type UseOptionsOptions<T, ApiType = unknown> = {
  key: string
  transform?: (data: ApiType) => T
  method?: HTTPMethod
  url?: string
}

export type UnknownRecord = Record<string, unknown>

export type UseMutationReturn<T> = {
  data: T | undefined
  isError: boolean
  isLoading: boolean
  error: ApiError | null
}

type FetchFnParams<
  T extends UnknownRecord,
  P extends Record<string, string>,
> = {
  body?: T | FormData
  params?: string | P
  param?: string
  method?: HTTPMethod
}

export type UseMutationHookReturn<T> = [
  (arg?: FetchFnParams<UnknownRecord, Record<string, string>>) => Promise<void>,
  UseMutationReturn<T>,
]

export type UseMutationAction<S> = {
  type: 'data' | 'loading' | 'error' | 'errorObj'
  payload: S | boolean | ApiError | null
}

function getInitialState<T>(): UseMutationReturn<T> {
  return {
    data: undefined,
    isError: false,
    isLoading: false,
    error: null,
  }
}

function reducer<T>(
  state: UseMutationReturn<T>,
  action: UseMutationAction<T>
): UseMutationReturn<T> {
  if (
    action.type === 'data' &&
    typeof action.payload !== 'boolean' &&
    action.payload !== undefined
  ) {
    return {
      ...state,
      data: action.payload as T,
      isError: false,
      isLoading: false,
      error: null,
    }
  } else if (action.type === 'loading' && typeof action.payload === 'boolean') {
    return { ...state, isLoading: action.payload }
  } else if (action.type === 'error' && typeof action.payload === 'boolean') {
    return {
      ...state,
      data: undefined,
      isError: action.payload,
      isLoading: false,
      error: null,
    }
  } else if (
    action.type === 'errorObj' &&
    dtoUtils.isApiError(action.payload)
  ) {
    return {
      ...state,
      data: undefined,
      isError: true,
      isLoading: false,
      error: action.payload,
    }
  }
  return state
}

function paramsToUrl(params: Record<string, string>) {
  return `?${Object.entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&')}`
}

function getMutationParams<P>(params?: string | P): string {
  if (!params) return ''
  return typeof params === 'string' ? params : paramsToUrl(params)
}

// A very quick pseudo-use-mutation
export function useMutation<T, ApiType extends UnknownRecord>({
  key,
  transform = (data: ApiType) => data as unknown as T,
  url,
  method: apiMethod = 'post',
}: UseOptionsOptions<T, ApiType>): UseMutationHookReturn<T> {
  const [{ data, isLoading, isError, error }, dispatch] = useReducer<
    Reducer<UseMutationReturn<T>, UseMutationAction<T>>
  >(reducer, getInitialState())

  const { baseDlx, ...config } = useConfig()

  const execute = useMemo(() => {
    return async function <
      T extends UnknownRecord,
      P extends Record<string, string>,
    >(arg?: FetchFnParams<T, P>) {
      dispatch({ type: 'loading', payload: true })

      try {
        const { body, params, param, method = apiMethod } = arg ?? {}
        const response = await http[method ?? apiMethod]<ApiType>(
          config,
          `${baseDlx}/${config[key]}${url ? `/${url}` : ''}${getMutationParams<string | P>(params)}${
            param ? `/${param}` : ''
          }`,
          {
            body,
            headers: { 'Content-Type': 'application/json' },
          }
        )
        dispatch({ type: 'data', payload: transform(response) })
      } catch (error) {
        if (dtoUtils.isApiError(error)) {
          dispatch({
            type: 'errorObj',
            payload: {
              description: error.description,
              message: error.message,
              error: error.error,
              status: error.status,
            },
          })
        } else {
          dispatch({ type: 'error', payload: true })
        }
      }
      dispatch({ type: 'loading', payload: false })
    }
  }, [dispatch])

  return [execute, { data, isLoading, isError, error }]
}
