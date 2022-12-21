import React, { createContext, useCallback, useState, useContext, useMemo } from 'react';

interface ScrollContextData {
  scroll: boolean;
  setScrollState(active: boolean): void;
}

const ScrollContext = createContext<ScrollContextData>({} as ScrollContextData);

const ScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [scroll, setScroll] = useState<boolean>(false);

  const setScrollState = useCallback((active: boolean) => setScroll(active), []);

  return (
    <ScrollContext.Provider
      value={useMemo(() => ({ scroll, setScrollState }), [scroll, setScrollState])}
    >
      {children}
    </ScrollContext.Provider>
  );
};

function useScroll(): ScrollContextData {
  const context = useContext(ScrollContext);

  return context;
}

export { ScrollProvider, useScroll };
