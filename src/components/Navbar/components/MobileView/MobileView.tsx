import styles from './MobileView.module.scss';
import { NavItems } from '../NavItems/NavItems.tsx';
import { useOrientation } from '../../../../shared/hooks/useOrientation';
import { useState } from 'react';
import Login from '../../../Login/Login.tsx';
import Register from '../../../Register/Register.tsx';

interface MobileViewProps {
  onCloseMenu: () => void;
}

export const MobileView = ({ onCloseMenu }: MobileViewProps) => {
  const [isLoginMenuOpen, setIsLoginMenuOpen] = useState(false);
  const [isRegisterMenuOpen, setIsRegisterMenuOpen] = useState(false);
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
        {!isLoginMenuOpen && !isRegisterMenuOpen ? (
          <div className={styles.view__items}>
            <NavItems
              flexDirection={'column'}
              onLinkClick={onCloseMenu}
              onLoginClick={() => setIsLoginMenuOpen(true)}
              onRegisterClick={() => setIsRegisterMenuOpen(true)}
            />
          </div>
        ) : isLoginMenuOpen ? (
          <div className={styles.view__items__login}>
            <Login setIsLoginModalOpen={() => setIsLoginMenuOpen(false)} />
          </div>
        ) : (
          <div className={styles.view__items__login}>
            <Register
              setIsRegisterModalOpen={() => setIsRegisterMenuOpen(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
};
