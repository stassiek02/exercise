import { useContext } from 'react';
import { GlobalStateContext } from '../context/globalStateContext';

export const useServices = () => {
  const context = useContext(GlobalStateContext);

  if (context === undefined) {
    throw new Error('useServices must be within Provider');
  }

  return context;
};
