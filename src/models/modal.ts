export enum ModalType {
  LOGIN = 'login',
  REGISTER = 'register',
  PROFILE = 'profile',
}

export interface ModalData {
  type: ModalType;
}
