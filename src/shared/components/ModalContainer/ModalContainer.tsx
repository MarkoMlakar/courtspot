import { observer } from 'mobx-react-lite';
import { Modal } from '../../../shared/components/Modal/Modal';
import { useStores } from '../../../stores';
import { ModalType } from '../../../models/modal';
import Login from '../../../components/Login/Login';
import Register from '../../../components/Register/Register';

const ModalContainer = observer(() => {
  const { modalStore } = useStores();

  // Handle login modal
  const isLoginOpen = modalStore.isModalOpen(ModalType.LOGIN);
  const handleLoginClose = () => modalStore.closeModal(ModalType.LOGIN);

  // Handle register modal
  const isRegisterOpen = modalStore.isModalOpen(ModalType.REGISTER);
  const handleRegisterClose = () => modalStore.closeModal(ModalType.REGISTER);

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

      {/* Add other modals as needed */}
    </>
  );
});

export default ModalContainer;
