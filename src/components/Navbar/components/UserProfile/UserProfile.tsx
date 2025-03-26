import styles from './UserProfile.module.scss';
import avatarImage from '../../../../assets/img_avatar.png';
import cx from 'classnames';
const openProfileInfo = () => {
  alert('Profile Info TODO');
};

interface UserProfileProps {
  flexDirection?: string;
}

const UserProfile = ({ flexDirection = 'row' }: UserProfileProps) => {
  const containerStyles = cx(styles.container, {
    [styles.container__column]: flexDirection === 'column',
    [styles.container__row]: flexDirection === 'row',
  });
  return (
    <div className={containerStyles}>
      <span className={styles.container__text} onClick={openProfileInfo}>
        Marko Mlakar
      </span>
      <img
        className={styles.avatarImage}
        src={avatarImage}
        onClick={openProfileInfo}
        alt="Avatar"
      ></img>
    </div>
  );
};

export default UserProfile;
