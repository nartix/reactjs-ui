import { createContext, useState } from 'react';

import { templateGlobals, environment } from '../globals';

export const GlobalContext = createContext([
  { ...templateGlobals, ...environment },
]);

export const GlobalContextProvider = ({ children }) => {
  // not needed since data is constant
  // const [globalState, setGlobalState] = useState({ ...templateGlobals, ...environment });

  return (
    <GlobalContext.Provider value={[{ ...templateGlobals, ...environment }]}>
      {children}
    </GlobalContext.Provider>
  );
};
