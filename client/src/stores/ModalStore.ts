import { makeObservable, observable, action, computed } from 'mobx';
import { ModalType, ModalData } from '../models/modal';

class ModalStore {
  activeModals: ModalData[] = [];
  cleanupFunctions: Map<ModalType, () => void> = new Map();

  constructor() {
    makeObservable(this, {
      activeModals: observable,
      cleanupFunctions: observable,
      openModal: action,
      closeModal: action,
      closeAllModals: action,
      registerCleanup: action,
      unregisterCleanup: action,
      isModalOpen: computed,
    });
  }

  get isModalOpen() {
    return (type: ModalType): boolean => {
      return this.activeModals.some(modal => modal.type === type);
    };
  }

  openModal = (type: ModalType) => {
    // Don't open the same modal twice
    if (!this.isModalOpen(type)) {
      this.activeModals.push({ type });
    }
  };

  closeModal = (type: ModalType) => {
    // Execute cleanup function if exists
    const cleanupFn = this.cleanupFunctions.get(type);
    if (cleanupFn) {
      cleanupFn();
      this.cleanupFunctions.delete(type);
    }

    this.activeModals = this.activeModals.filter(modal => modal.type !== type);
  };

  closeAllModals = () => {
    // Execute all cleanup functions
    this.cleanupFunctions.forEach(cleanupFn => cleanupFn());
    this.cleanupFunctions.clear();
    this.activeModals = [];
  };

  registerCleanup = (type: ModalType, cleanupFn: () => void) => {
    this.cleanupFunctions.set(type, cleanupFn);
  };

  unregisterCleanup = (type: ModalType) => {
    this.cleanupFunctions.delete(type);
  };
}

export default new ModalStore();
