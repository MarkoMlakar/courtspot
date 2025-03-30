import styles from './NavItems.module.scss';
import { Link } from 'react-router';
import cx from 'classnames';
import UserProfile from '../UserProfile/UserProfile.tsx';
import AuthButtons from '../AuthButtons/AuthButtons.tsx';

interface NavItemProps {
  flexDirection?: 'row' | 'column';
  onLinkClick?: () => void;
  onLoginClick?: () => void;
  onRegisterClick?: () => void;
}

export const NavItems = ({
  flexDirection = 'row',
  onLinkClick,
  onLoginClick,
  onRegisterClick,
}: NavItemProps) => {
  const isLoggedIn = false;

  const baseClassStyle = cx(styles.navbar__items, {
    [styles.navbar__items__column]: flexDirection === 'column',
    [styles.navbar__items__row]: flexDirection === 'row',
  });

  const navLinkStyles = cx(
    styles.navbar__itemsText,
    isLoggedIn && styles.navbar__itemsText_authenticated
  );

  const handleLinkClick = () => {
    if (onLinkClick) {
      onLinkClick();
    }
  };

  return (
    <div className={baseClassStyle}>
      <Link to="/" className={navLinkStyles} onClick={handleLinkClick}>
        Home
      </Link>
      <Link to="/courts" className={navLinkStyles} onClick={handleLinkClick}>
        Courts
      </Link>
      <Link
        to="/latest-visits"
        className={navLinkStyles}
        onClick={handleLinkClick}
      >
        Latest Visits
      </Link>
      <Link to="/favorites" className={navLinkStyles} onClick={handleLinkClick}>
        Favorites
      </Link>
      {isLoggedIn ? (
        <UserProfile flexDirection={flexDirection} />
      ) : (
        <AuthButtons
          flexDirection={flexDirection}
          onLoginClick={onLoginClick}
          onRegisterClick={onRegisterClick}
        />
      )}
    </div>
  );
};
