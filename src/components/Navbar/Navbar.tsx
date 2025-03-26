import { Link } from 'react-router';
import styles from './Navbar.module.scss';
import logo from '../../assets/logo.svg';
import { MobileView } from './components/MobileView/MobileView';
import { NavItems } from './components/NavItems/NavItems.tsx';
import { HamburgerButton } from '../../shared/components/HamburgerButton/HamburgerButton.tsx';
import { useState } from 'react';
import { CloseButton } from '../../shared/components/CloseButton/CloseButton.tsx';

export const Navbar = () => {
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const onHamburgerBtnClick = () => setIsMenuClicked(!isMenuClicked);
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
        <div className={styles.navbar__hbMenu} onClick={onHamburgerBtnClick}>
          {isMenuClicked ? <CloseButton /> : <HamburgerButton />}
        </div>
      </nav>
      {isMenuClicked && <MobileView />}
    </>
  );
};

export default Navbar;
