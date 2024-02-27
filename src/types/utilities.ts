export type ApiError = {
	description: string;
	message: string;
	error: string;
	status: number;
};

export const dtoUtils = {
	isApiError: (val: unknown): val is ApiError =>
		typeof val === 'object' &&
		!!val &&
		(<(keyof ApiError)[]>['description', 'message', 'error']).every((key) => key in val),
};

export type Configuration = Record<string, string>;