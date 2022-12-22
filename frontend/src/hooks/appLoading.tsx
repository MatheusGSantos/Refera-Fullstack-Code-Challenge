import React, { createContext, useCallback, useState, useContext, useMemo, useEffect } from 'react';

// Add here the components that should be loaded before the app is ready
const APP_LOADABLE_COMPONENTS = ['CategoryList', 'OrderList'] as const;

interface AppLoadingContextData {
  appLoading: boolean;
  markAsLoaded: (key: typeof APP_LOADABLE_COMPONENTS[number]) => void;
}

interface IAppLoadedComponents {
  [key: string]: boolean;
}

const AppLoadingContext = createContext<AppLoadingContextData>({} as AppLoadingContextData);

const AppLoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [appLoading, setAppLoading] = useState<boolean>(true);
  const [appLoadedComponents, setAppLoadedComponents] = useState<IAppLoadedComponents>(
    Object.fromEntries(APP_LOADABLE_COMPONENTS.map((x) => [x, false])),
  );

  const markAsLoaded = useCallback(
    (key: typeof APP_LOADABLE_COMPONENTS[number]) => {
      appLoading && setAppLoadedComponents((prev) => ({ ...prev, [key]: true }));
    },
    [appLoading],
  );

  useEffect(() => {
    if (appLoading && Object.values(appLoadedComponents).every((x) => x)) {
      setAppLoading(false);
    }
  }, [appLoadedComponents]);

  return (
    <AppLoadingContext.Provider
      value={useMemo(() => ({ appLoading, markAsLoaded }), [appLoading, markAsLoaded])}
    >
      {children}
    </AppLoadingContext.Provider>
  );
};

function useAppLoading(): AppLoadingContextData {
  const context = useContext(AppLoadingContext);

  return context;
}

export { AppLoadingProvider, useAppLoading };
