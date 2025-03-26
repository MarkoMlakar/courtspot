import styles from './NavItems.module.scss';
import { Link } from 'react-router';
import cx from 'classnames';
import UserProfile from '../UserProfile/UserProfile.tsx';
import AuthButtons from '../AuthButtons/AuthButtons.tsx';

interface NavItemProps {
  flexDirection?: 'row' | 'column';
  isDisplayed?: boolean;
}

export const NavItems = ({
  flexDirection = 'row',
  isDisplayed = true,
}: NavItemProps) => {
  const isLoggedIn = false;

  const baseClassStyle = cx(
    styles.navbar__items,
    isDisplayed && styles.navbar__items__visible,
    {
      [styles.navbar__items__column]: flexDirection === 'column',
      [styles.navbar__items__row]: flexDirection === 'row',
    }
  );

  const navLinkStyles = cx(
    styles.navbar__itemsText,
    isLoggedIn && styles.navbar__itemsText_authenticated
  );
  return (
    <>
      <div className={baseClassStyle}>
        <Link to="/courts" className={navLinkStyles}>
          Courts
        </Link>
        <Link to="/latest-visits" className={navLinkStyles}>
          Latest Visits
        </Link>
        <Link to="/favorites" className={navLinkStyles}>
          Favorites
        </Link>
      </div>
      {isLoggedIn ? (
        <UserProfile flexDirection={flexDirection} />
      ) : (
        <AuthButtons flexDirection={flexDirection} />
      )}
    </>
  );
};
