import styles from './MobileView.module.scss';
import { NavItems } from '../NavItems/NavItems.tsx';

export const MobileView = () => {
  return (
    <div className={styles.view}>
      <div className={styles.view__items}>
        <NavItems flexDirection={'column'} />
      </div>
    </div>
  );
};
