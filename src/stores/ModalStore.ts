import { makeObservable, observable, action, computed } from 'mobx';
import { ModalType, ModalData } from '../models/modal';

class ModalStore {
  activeModals: ModalData[] = [];

  constructor() {
    makeObservable(this, {
      activeModals: observable,
      openModal: action,
      closeModal: action,
      closeAllModals: action,
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
    this.activeModals = this.activeModals.filter(modal => modal.type !== type);
  };

  closeAllModals = () => {
    this.activeModals = [];
  };
}

export default new ModalStore();
