import React, { createContext, useContext } from 'react';

const PageDataContext = createContext(null);

export const PageDataProvider = ({ data, children }) => {
  return (
    <PageDataContext.Provider value={data}>
      {children}
    </PageDataContext.Provider>
  );
};

export const usePageData = () => useContext(PageDataContext);
