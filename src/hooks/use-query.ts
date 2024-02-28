import { useEffect } from 'react';
import { useConfig } from '../context/config-context';
import { UnknownRecord, http } from '../utils/http';
import { UseFetchReducerState, useFetchReducer } from './use-fetch-reducer';


export type UseOptionsOptions<T, ApiType = unknown> = {
	url: string;
	skip?: boolean;
	transform?: (data: ApiType) => T;
};

// A very quick pseudo-use-query
export function useQuery<T, E = Error, ApiType extends UnknownRecord = UnknownRecord>({
	transform,
	url = '',
	skip = false,
}: UseOptionsOptions<T, ApiType>): UseFetchReducerState<T, E> {
	
	const [state, dispatch] = useFetchReducer<T, E>()

	const doFetch = async () => {
		dispatch({ type: 'request' });
		try {
			const response = await http.get<ApiType>({}, `${url}`, {
				headers: { 'Content-Type': 'application/json' },
			});
			dispatch({ type: 'success', payload: transform ? transform(response) : response as unknown as T });
		} catch (error) {
			dispatch({ type: 'error', payload: error as E });
		}
	}

	useEffect(() => {
		if (!skip) {
			doFetch();
		}
	}, [dispatch]);

	return state;
}
