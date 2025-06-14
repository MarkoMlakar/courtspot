import avatarImage from '../../../assets/img_avatar.png';
import styles from './ProfileCard.module.scss';

export const ProfileCard = () => {
  return (
    <div className={styles.profileCard}>
      <img
        className={styles.profileCard__avatar}
        src={avatarImage}
        alt="Avatar"
      ></img>
      <div className={styles.profileCard__info}>
        <span className={styles.profileCard__title}>Marko Mlakar</span>
        <span className={styles.profileCard__subtitle}>100 sightings</span>
      </div>
    </div>
  );
};
