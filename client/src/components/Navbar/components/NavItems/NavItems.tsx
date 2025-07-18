import styles from './NavItems.module.scss';
import { Link } from 'react-router';
import cx from 'classnames';
import UserProfile from '../UserProfile/UserProfile.tsx';
import AuthButtons from '../AuthButtons/AuthButtons.tsx';

interface NavItemProps {
  flexDirection?: 'row' | 'column';
  onMenuClose?: () => void;
}

export const NavItems = ({
  flexDirection = 'row',
  onMenuClose,
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

  const handleItemClick = () => {
    // Small delay to ensure route change completes before closing menu
    setTimeout(() => {
      onMenuClose?.();
    }, 100);
  };

  return (
    <div className={baseClassStyle}>
      <Link to="/" className={navLinkStyles} onClick={handleItemClick}>
        Home
      </Link>
      <Link to="/courts" className={navLinkStyles} onClick={handleItemClick}>
        Courts
      </Link>
      <Link
        to="/latest-visits"
        className={navLinkStyles}
        onClick={handleItemClick}
      >
        Latest Visits
      </Link>
      <Link to="/favorites" className={navLinkStyles} onClick={handleItemClick}>
        Favorites
      </Link>
      {isLoggedIn ? (
        <UserProfile flexDirection={flexDirection} onMenuClose={onMenuClose} />
      ) : (
        <AuthButtons flexDirection={flexDirection} onCloseMenu={onMenuClose} />
      )}
    </div>
  );
};
