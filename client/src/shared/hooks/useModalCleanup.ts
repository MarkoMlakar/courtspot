import { useEffect } from 'react';
import { useStores } from '../../stores';
import { ModalType } from '../../models/modal';

export const useModalCleanup = (type: ModalType, cleanupFn: () => void) => {
  const { modalStore } = useStores();

  useEffect(() => {
    // Register cleanup function
    modalStore.registerCleanup(type, cleanupFn);

    // Unregister cleanup function when component unmounts
    return () => {
      modalStore.unregisterCleanup(type);
    };
  }, [type, cleanupFn, modalStore]);
};
