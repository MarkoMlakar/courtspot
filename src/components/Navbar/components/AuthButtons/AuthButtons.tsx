import styles from './AuthButtons.module.scss';
import cx from 'classnames';
import { RoundedButton } from '../../../../shared/components/RoundedButton/RoundedButton';
import { useState } from 'react';
import { Modal } from '../../../../shared/components/Modal/Modal';
import Register from '../../../Register/Register';
import Login from '../../../Login/Login';
interface AuthButtonsProps {
  flexDirection?: 'row' | 'column';
  onLoginClick?: () => void;
  onRegisterClick?: () => void;
}

const AuthButtons = ({
  flexDirection = 'row',
  onLoginClick,
  onRegisterClick,
}: AuthButtonsProps) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const isMobileOrTablet = flexDirection === 'column';
  const isDesktop = flexDirection === 'row';

  const onSignUpBtnClick = () => {
    if (isDesktop) {
      setIsRegisterModalOpen(true);
    } else {
      onRegisterClick?.();
    }
  };

  const onLoginBtnClick = () => {
    if (isDesktop) {
      setIsLoginModalOpen(true);
    } else {
      onLoginClick?.();
    }
  };

  const baseClassStyle = cx(styles.base, {
    [styles.base__column]: isMobileOrTablet,
    [styles.base__row]: isDesktop,
  });
  return (
    <>
      {isLoginModalOpen && (
        <Modal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
        >
          <Login setIsLoginModalOpen={() => setIsLoginModalOpen(false)} />
        </Modal>
      )}
      {isRegisterModalOpen && (
        <Modal
          isOpen={isRegisterModalOpen}
          onClose={() => setIsRegisterModalOpen(false)}
        >
          <Register
            setIsRegisterModalOpen={() => setIsRegisterModalOpen(false)}
          />
        </Modal>
      )}
      <div className={baseClassStyle}>
        <button
          className={styles.button}
          aria-label="Log in to your account"
          onClick={onLoginBtnClick}
        >
          <span className={styles.button__text_highlighted}>Login</span>
        </button>
        <div className={styles.signUp__container} onClick={onSignUpBtnClick}>
          <RoundedButton text={'New Account'} />
        </div>
      </div>
    </>
  );
};

export default AuthButtons;
