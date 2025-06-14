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
  const { modalStore } = useStores();
  const openProfileInfo = () => {
    modalStore.openModal(ModalType.PROFILE);
    onMenuClose?.();
  };
  const containerStyles = cx(styles.container, {
    [styles.container__column]: flexDirection === 'column',
    [styles.container__row]: flexDirection === 'row',
  });
  return (
    <button className={containerStyles} onClick={openProfileInfo}>
      <span className={styles.container__text}>Marko Mlakar</span>
      <img className={styles.avatarImage} src={avatarImage} alt="Avatar"></img>
    </button>
  );
};

export default UserProfile;
