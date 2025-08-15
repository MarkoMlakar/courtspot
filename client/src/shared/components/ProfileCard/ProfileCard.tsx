import avatarImage from '../../../assets/img_avatar.png';
import styles from './ProfileCard.module.scss';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../../stores';

export const ProfileCard = observer(() => {
  const { authStore } = useStores();

  const user = authStore.currentUser;

  return (
    <div className={styles.profileCard}>
      <img
        className={styles.profileCard__avatar}
        src={avatarImage}
        alt="Avatar"
      ></img>
      <div className={styles.profileCard__info}>
        <span className={styles.profileCard__title}>
          {user?.first_name} {user?.last_name}
        </span>
        <span className={styles.profileCard__subtitle}>100 sightings</span>
      </div>
    </div>
  );
});
