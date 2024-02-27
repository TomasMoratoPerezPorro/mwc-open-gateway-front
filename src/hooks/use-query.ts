import { useEffect } from 'react';
import { useConfig } from '../context/config-context';
import { UnknownRecord, http } from '../utils/http';
import { UseFetchReducerState, useFetchReducer } from './use-fetch-reducer';


export type UseOptionsOptions<T, ApiType = unknown> = {
	key: string;
	url?: string;
	skip?: boolean;
	transform?: (data: ApiType) => T;
};

// A very quick pseudo-use-query
export function useQuery<T, E = Error, ApiType extends UnknownRecord = UnknownRecord>({
	key,
	transform,
	url = '',
	skip,
}: UseOptionsOptions<T, ApiType>): UseFetchReducerState<T, E> {
	const { CLIENT_ID: clientId, middlewareBaseUrl: baseDlx, ...config } = useConfig();
	
	const [state, dispatch] = useFetchReducer<T, E>()

	useEffect(() => {
		if (!skip) {
			(async function () {
				dispatch({ type: 'request' });
				try {
					const response = await http.get<ApiType>(config, `${baseDlx}/${config[key]}${url}`, {
						headers: { 'Content-Type': 'application/json' },
					});
					

					dispatch({ type: 'success', payload: transform ? transform(response) : response as unknown as T });
				} catch (error) {
					dispatch({ type: 'error', payload: error as E });
				}
			})();
		}
	}, [dispatch]);

	return state;
}