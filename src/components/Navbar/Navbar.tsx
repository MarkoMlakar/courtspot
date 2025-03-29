import { Link } from 'react-router';
import styles from './Navbar.module.scss';
import logo from '../../assets/logo.svg';
import { MobileView } from './components/MobileView/MobileView';
import { NavItems } from './components/NavItems/NavItems.tsx';
import { HamburgerButton } from '../../shared/components/HamburgerButton/HamburgerButton.tsx';
import { useState, useEffect } from 'react';
import { CloseButton } from '../../shared/components/CloseButton/CloseButton.tsx';
import { useScrollLock } from '../../shared/hooks/useScrollLock';
import { useMediaQuery } from '../../shared/hooks/useMediaQuery';
import { MEDIA_QUERIES } from '../../shared/constants/breakpoints';

export const Navbar = () => {
  const [isMenuClicked, setIsMenuClicked] = useState(false);

  // Check for desktop mode only
  const isDesktop = useMediaQuery(MEDIA_QUERIES.desktop);
  const isMobileOrTablet = !isDesktop;

  // Use our scroll lock hook with the orientation option
  useScrollLock(isMenuClicked);

  const onHamburgerBtnClick = () => {
    setIsMenuClicked(!isMenuClicked);
  };

  // Close mobile menu when transitioning to desktop view
  useEffect(() => {
    if (isDesktop && isMenuClicked) {
      setIsMenuClicked(false);
    }
  }, [isDesktop, isMenuClicked]);

  return (
    <>
      <nav className={styles.navbar}>
        <Link to="/" className={styles.navbar__heading}>
          <img
            src={logo}
            alt="CourtSpot Logo"
            className={styles.navbar__logo}
          />
          <span className={styles.navbar__title}>CourtSpot</span>
        </Link>
        <div className={styles.navbar__items}>
          <NavItems />
        </div>
        {isMobileOrTablet && (
          <div className={styles.navbar__hbMenu} onClick={onHamburgerBtnClick}>
            {isMenuClicked ? <CloseButton /> : <HamburgerButton />}
          </div>
        )}
      </nav>
      {isMenuClicked && <MobileView />}
    </>
  );
};

export default Navbar;
