import { getQuery } from './getQuery'

type RequestInitWithBody = Omit<RequestInit, 'body'> & {
  body?: UnknownRecord | FormData
}
type Options = Pick<
  RequestInitWithBody,
  'credentials' | 'headers' | 'mode' | 'cache' | 'body'
>
export type UnknownRecord = Record<string, unknown>
type ExtraOptions = {
  params?: UnknownRecord
  auth?: { clientId: string }
  user?: { userName: string; role: string }
  at?: { token: string }
}

export const createRequestInit = (
  config: Record<string, any>,
  opts?: RequestInitWithBody & ExtraOptions,
  service?: string
): RequestInit => {
  let body
  if (opts?.body instanceof FormData) {
    body = opts.body
  } else {
    body =
      opts?.body && opts?.method !== 'GET'
        ? JSON.stringify(opts.body)
        : undefined
  }

  const headers = new Headers(
    opts?.headers ?? {
      'Content-Type': 'application/json',
    }
  )

  //   if (opts?.auth && config.environmentName === 'dev')
  //     headers.append(
  //       'Authorization',
  //       `Basic ${String(toBase64(opts.auth.clientId))}`
  //     )

  return { ...opts, body, headers }
}

export async function baseFetch<T>(
  config: Record<string, any>,
  url: string,
  opts: RequestInitWithBody & ExtraOptions = {},
  service?: string
): Promise<T> {
  const _url = `${url}${getQuery(opts?.params ?? {})}`

  const _opts = createRequestInit(config, opts, service)
  return new Promise((resolve, reject) =>
    fetch(_url, _opts)
      .then((res) => {
        res
          .json()
          .then((body) => {
            if (!res.ok) {
              return reject(new Error('API_ERROR'))
            }
            // UnknownRecord type constraint to return an object or exact type could not be specified.
            return resolve(Array.isArray(body) ? { data: body } : body)
          })
          .catch(() => resolve(res as T))
      })
      .catch(() => reject(new Error('NETWORK_ERROR')))
  )
}

async function get<T extends UnknownRecord>(
  config: Record<string, any>,
  url: string,
  opts?: Omit<Options, 'body'> & ExtraOptions
): Promise<T> {
  return baseFetch(config, url, { ...opts, method: 'GET' })
}

async function post<T extends UnknownRecord>(
  config: Record<string, any>,
  url: string,
  opts?: Options & ExtraOptions
): Promise<T> {
  return baseFetch(config, url, {
    ...opts,
    method: 'POST',
  })
}

async function del<T extends UnknownRecord>(
  config: Record<string, any>,
  url: string,
  opts?: Options & ExtraOptions
): Promise<T> {
  return baseFetch(config, url, {
    ...opts,
    method: 'DELETE',
  })
}

export const http = { get, post, del }
