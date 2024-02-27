import { useMemo } from 'react'
import { http } from '../utils/http'
import { useConfig } from '../context/config-context'
import { UseFetchReducerState, useFetchReducer } from './use-fetch-reducer'

export type HTTPMethod = keyof typeof http

export type UseOptionsOptions<T, ApiType = unknown> = {
  key: string
  transform?: (data: ApiType) => T
  method?: HTTPMethod
  url?: string
}

export type UnknownRecord = Record<string, unknown>

type FetchFnParams<
  T extends UnknownRecord,
  P extends Record<string, string>,
> = {
  body?: T | FormData
  params?: string | P
  param?: string
  method?: HTTPMethod
}

export type UseMutationHookReturn<T, E> = [
  (arg?: FetchFnParams<UnknownRecord, Record<string, string>>) => Promise<void>,
  UseFetchReducerState<T, E>,
]

export type UseMutationAction<S, E> =
  | {
      type: 'request'
    }
  | {
      type: 'success'
      payload: S
    }
  | {
      type: 'error'
      payload: E
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
export function useMutation<
  T,
  E = Error,
  ApiType extends UnknownRecord = UnknownRecord,
>({
  key,
  transform = (data: ApiType) => data as unknown as T,
  url,
  method: apiMethod = 'post',
}: UseOptionsOptions<T, ApiType>): UseMutationHookReturn<T, E> {
  const [state, dispatch] = useFetchReducer<T, E>()

  const { baseDlx, ...config } = useConfig()

  const execute = useMemo(() => {
    return async function <
      T extends UnknownRecord,
      P extends Record<string, string>,
    >(arg?: FetchFnParams<T, P>) {
      dispatch({ type: 'request' })

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
        dispatch({ type: 'success', payload: transform(response) })
      } catch (error) {
        dispatch({ type: 'error', payload: error as E })
      }
    }
  }, [dispatch])

  return [execute, state]
}
