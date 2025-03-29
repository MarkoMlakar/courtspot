import styles from './MobileView.module.scss';
import { NavItems } from '../NavItems/NavItems.tsx';
import { useOrientation } from '../../../../shared/hooks/useOrientation';

export const MobileView = ({ onClose }) => {
  const orientation = useOrientation();
  const isLandscape = orientation === 'landscape';

  return (
    <div className={isLandscape ? styles.viewLandscape : styles.view}>
      <div
        className={
          isLandscape
            ? styles.view__items__landscape
            : styles.view__items__container
        }
      >
        <div className={styles.view__items}>
          <NavItems flexDirection={'column'} onLinkClick={onClose} />
        </div>
      </div>
    </div>
  );
};
