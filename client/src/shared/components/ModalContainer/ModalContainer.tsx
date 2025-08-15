import { observer } from 'mobx-react-lite';
import { Modal } from './components/Modal/Modal';
import { useStores } from '../../../stores';
import { ModalType } from '../../../types/modal';
import Login from '../../../components/Login/Login';
import Register from '../../../components/Register/Register';
import { Profile } from '../../../components/Profile/Profile';

const ModalContainer = observer(() => {
  const { modalStore } = useStores();

  // Handle login modal
  const isLoginOpen = modalStore.isModalOpen(ModalType.LOGIN);
  const handleLoginClose = () => modalStore.closeModal(ModalType.LOGIN);

  // Handle register modal
  const isRegisterOpen = modalStore.isModalOpen(ModalType.REGISTER);
  const handleRegisterClose = () => modalStore.closeModal(ModalType.REGISTER);

  // Handle profile modal
  const isProfileOpen = modalStore.isModalOpen(ModalType.PROFILE);
  const handleProfileClose = () => modalStore.closeModal(ModalType.PROFILE);

  return (
    <>
      {isLoginOpen && (
        <Modal isOpen={true} onClose={handleLoginClose}>
          <Login />
        </Modal>
      )}

      {isRegisterOpen && (
        <Modal isOpen={true} onClose={handleRegisterClose}>
          <Register />
        </Modal>
      )}

      {isProfileOpen && (
        <Modal isOpen={true} onClose={handleProfileClose}>
          <Profile />
        </Modal>
      )}

      {/* Add other modals as needed */}
    </>
  );
});

export default ModalContainer;
