import styles from './UserProfile.module.scss';
import avatarImage from '../../../../assets/img_avatar.png';
import cx from 'classnames';
import { useStores } from '../../../../stores';
import { ModalType } from '../../../../models/modal';

interface UserProfileProps {
  flexDirection?: string;
  onMenuClose?: () => void;
}

const UserProfile = ({
  flexDirection = 'row',
  onMenuClose,
}: UserProfileProps) => {
  const { modalStore, authStore } = useStores();

  const openProfileInfo = () => {
    modalStore.openModal(ModalType.PROFILE);
    onMenuClose?.();
  };

  const containerStyles = cx(styles.container, {
    [styles.container__column]: flexDirection === 'column',
    [styles.container__row]: flexDirection === 'row',
  });

  // Get username from auth store, fallback to "User" if not available
  const username = authStore.currentUser?.username || 'User';

  return (
    <button className={containerStyles} onClick={openProfileInfo}>
      <span className={styles.container__text}>{username}</span>
      <img className={styles.avatarImage} src={avatarImage} alt="Avatar"></img>
    </button>
  );
};

export default UserProfile;
