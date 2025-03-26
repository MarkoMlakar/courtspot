import styles from './AuthButtons.module.scss';
import cx from 'classnames';
import { RoundedButton } from '../../../../shared/components/RoundedButton/RoundedButton';

interface AuthButtonsProps {
  flexDirection?: 'row' | 'column';
}

const AuthButtons = ({ flexDirection = 'row' }: AuthButtonsProps) => {
  const baseClassStyle = cx(styles.base, {
    [styles.base__column]: flexDirection === 'column',
    [styles.base__row]: flexDirection === 'row',
  });
  return (
    <div className={baseClassStyle}>
      <button
        className={styles.button}
        aria-label="Log in to your account"
        onClick={() => alert('Log in')}
      >
        <span className={styles.button__text_highlighted}>Login</span>
      </button>
      <RoundedButton text={'New Account'} />
    </div>
  );
};

export default AuthButtons;
