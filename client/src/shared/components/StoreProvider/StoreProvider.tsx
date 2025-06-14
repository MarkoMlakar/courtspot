import { ReactNode } from 'react';
import { StoreContext } from '../../../stores';
import rootStore from '../../../stores';

interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider = ({ children }: StoreProviderProps) => {
  return (
    <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
  );
};
