import { Reducer, useEffect, useReducer } from 'react';
import { useConfig } from '../context/config-context';
import { UnknownRecord, http } from '../utils/http';


export type UseOptionsOptions<T, ApiType = unknown> = {
	key: string;
	url?: string;
	skip?: boolean;
	transform: (data: ApiType) => T;
};

export type UseQueryReturn<T, E> = {
	data: T | undefined;
	error: E | null;
	isLoading: boolean;
};

export type UseQueryAction<S, E> = {
  type: "request"
} | {
  type: "success", payload: S
} | {
  type: "error", payload: E
}

function getInitialState<T, E>(): UseQueryReturn<T, E> {
	return {
		data: undefined,
		error: null,
		isLoading: false,
	};
}

function reducer<T, E>(state: UseQueryReturn<T, E>, action: UseQueryAction<T, E>) {
	switch (action.type) {
		
	if (action.type === 'data' && typeof action.payload !== 'boolean') {
		return { ...state, data: action.payload, error: null, isLoading: false };
	} else if (action.type === 'loading' && typeof action.payload === 'boolean') {
		return { ...state, error: null, isLoading: action.payload };
	} else if (action.type === 'error' && typeof action.payload === 'boolean') {
		return { ...state, data: undefined, isError: action.payload, isLoading: false };
	}
	return state;
}

// A very quick pseudo-use-query
export function useQuery<T, ApiType extends UnknownRecord>({
	key,
	transform = (data: ApiType) => data as unknown as T,
	url = '',
	skip,
}: UseOptionsOptions<T, ApiType>): UseQueryReturn<T> {
	const { CLIENT_ID: clientId, middlewareBaseUrl: baseDlx, ...config } = useConfig();
	const [{ data, isLoading, error }, dispatch] = useReducer<Reducer<UseQueryReturn<T>, UseQueryAction<T>>>(
		reducer,
		getInitialState()
	);

	useEffect(() => {
		if (!skip) {
			(async function () {
				dispatch({ type: 'loading', payload: true });
				try {
					const response = await http.get<ApiType>(config, `${baseDlx}/${config[key]}${url}`, {
						headers: { 'Content-Type': 'application/json' },
					});
					dispatch({ type: 'data', payload: transform(response) });
				} catch (error) {
					dispatch({ type: 'error', payload: true });
				}
				dispatch({ type: 'loading', payload: false });
			})();
		}
	}, [dispatch]);

	return { data, isLoading, error };
}
