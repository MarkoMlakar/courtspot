import { observer } from 'mobx-react-lite';
import { CloseButton } from '../../shared/components/CloseButton/CloseButton';
import { ProfileCard } from '../../shared/components/ProfileCard/ProfileCard';
import { RoundedButton } from '../../shared/components/RoundedButton/RoundedButton';
import { TextField } from './components/TextField/TextField';
import styles from './Profile.module.scss';
import { useStores } from '../../stores';
import { ModalType } from '../../types/modal';
import { formatDateOfBirth } from '../../shared/utils';

export const Profile = observer(() => {
  const { modalStore, authStore } = useStores();

  const onCloseClick = () => {
    modalStore.closeModal(ModalType.PROFILE);
  };

  const handleLogout = () => {
    authStore.logout();
    modalStore.closeModal(ModalType.PROFILE);
  };

  const user = authStore.currentUser;

  // Import the utility function from shared utils

  return (
    <div className={styles.profile} data-testid="profile-modal">
      <div className={styles.profile__closeButton} onClick={onCloseClick}>
        <CloseButton />
      </div>
      <div className={styles.profile__container}>
        <ProfileCard />
        <div className={styles.profile__fields}>
          <TextField title="First Name" value={user?.first_name || ''} />
          <TextField title="Last Name" value={user?.last_name || ''} />
          <TextField
            title="Date of Birth"
            value={formatDateOfBirth(user?.date_of_birth)}
          />
          <TextField title="Email Address" value={user?.email || ''} />
        </div>
        <div className={styles.profile__logout}>
          <RoundedButton
            text="Logout"
            borderRadius={0.19}
            onClick={handleLogout}
          />
        </div>
      </div>
    </div>
  );
});
