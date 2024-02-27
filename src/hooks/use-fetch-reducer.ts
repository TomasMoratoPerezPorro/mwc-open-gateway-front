import { Dispatch, Reducer, useReducer } from 'react'

export type UseFetchAction<S, E> =
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

export type UseFetchReducerState<T, E> = {
  data: T | null
  isLoading: boolean
  error: E | null
}

function reducer<T, E>(
  state: UseFetchReducerState<T, E>,
  action: UseFetchAction<T, E>
): UseFetchReducerState<T, E> {
  switch (action.type) {
    case 'request':
      return {
        ...state,
        isLoading: true,
        error: null,
        data: null,
      }
    case 'success':
      return {
        ...state,
        data: action.payload,
        error: null,
      }
    case 'error':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        data: null,
      }
    default:
      return state
  }
}

export function useFetchReducer<T, E>(
  initialState: UseFetchReducerState<T, E> = {
    data: null,
    isLoading: false,
    error: null,
  }
): [UseFetchReducerState<T, E>, Dispatch<UseFetchAction<T, E>>] {
  return useReducer<Reducer<UseFetchReducerState<T, E>, UseFetchAction<T, E>>>(
    reducer,
    initialState
  )
}
