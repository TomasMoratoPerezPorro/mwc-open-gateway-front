import { Reducer, useEffect, useReducer } from 'react';
import { useConfig } from '../context/config-context';
import { UnknownRecord, http } from '../utils/http';


export type UseOptionsOptions<T, ApiType = unknown> = {
	key: string;
	url?: string;
	skip?: boolean;
	transform: (data: ApiType) => T;
};

export type UseQueryReturn<T> = {
	data: T | undefined;
	isError: boolean;
	isLoading: boolean;
};

export type UseQueryAction<S> = {
	type: 'data' | 'loading' | 'error';
	payload: S | boolean;
};

function getInitialState<T>(): UseQueryReturn<T> {
	return {
		data: undefined,
		isError: false,
		isLoading: false,
	};
}

function reducer<T>(state: UseQueryReturn<T>, action: UseQueryAction<T>) {
	if (action.type === 'data' && typeof action.payload !== 'boolean') {
		return { ...state, data: action.payload, error: false, isLoading: false };
	} else if (action.type === 'loading' && typeof action.payload === 'boolean') {
		return { ...state, error: false, isLoading: action.payload };
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
	const [{ data, isLoading, isError }, dispatch] = useReducer<Reducer<UseQueryReturn<T>, UseQueryAction<T>>>(
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

	return { data, isLoading, isError };
}
