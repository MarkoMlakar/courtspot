export enum ModalType {
  LOGIN = 'login',
  REGISTER = 'register',
}

export interface ModalData {
  type: ModalType;
  props?: Record<string, any>;
}
