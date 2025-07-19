import { createContext, useContext } from 'react';
import ModalStore from './ModalStore';
import AuthStore from './AuthStore';

// Create a root store that contains all stores
class RootStore {
  modalStore: typeof ModalStore;
  authStore: typeof AuthStore;

  constructor() {
    this.modalStore = ModalStore;
    this.authStore = AuthStore;
  }
}

const rootStore = new RootStore();

// Create a React context for the stores
const StoreContext = createContext<RootStore>(rootStore);

// Create a hook for using the stores
export const useStores = () => useContext(StoreContext);

// Also export a provider component
export { StoreContext };
export default rootStore;
