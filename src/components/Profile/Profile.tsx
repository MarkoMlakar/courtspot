import { CloseButton } from '../../shared/components/CloseButton/CloseButton';
import { ProfileCard } from '../../shared/components/ProfileCard/ProfileCard';
import { RoundedButton } from '../../shared/components/RoundedButton/RoundedButton';
import { TextField } from './components/TextField/TextField';
import styles from './Profile.module.scss';

export const Profile = () => {
  return (
    <div className={styles.profile}>
      <div className={styles.profile__closeButton}>
        <CloseButton />
      </div>
      <div className={styles.profile__container}>
        <ProfileCard />
        <div className={styles.profile__fields}>
          <TextField title="First Name" value="Marko" />
          <TextField title="Last Name" value="Mlakar" />
          <TextField title="Date of Birth" value="April 3, 1996" />
          <TextField title="Email Address" value="markomlakar@gmail.com" />
        </div>
        <div className={styles.profile__logout}>
          <RoundedButton text="Logout" borderRadius={0.19} />
        </div>
      </div>
    </div>
  );
};
