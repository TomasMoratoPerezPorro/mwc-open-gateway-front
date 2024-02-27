import * as React from 'react';
import { Configuration } from '../types/utilities';

const ConfigContext = React.createContext<Configuration>({});

ConfigContext.displayName = 'Environment config context';

type ConfigProviderProps = React.PropsWithChildren<{ config: Configuration }>;

export function ConfigProvider({ config, children }: ConfigProviderProps): React.ReactElement {
	return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>;
}

export function useConfig(): Configuration {
	return React.useContext(ConfigContext);
}

export const ConfigConsumer = ConfigContext.Consumer;
