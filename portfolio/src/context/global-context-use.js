import { useContext } from 'react';

import { GlobalContext } from '../context/global-context';

export const useGlobalState = () => {
  const [templateGlobals, environment] = useContext(GlobalContext);
  // here return data from other context if needed

  return [templateGlobals, environment];
};
