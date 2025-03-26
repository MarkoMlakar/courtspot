import styles from './HamburgerButton.module.scss';

export const HamburgerButton = () => {
  return (
    <div className={styles.navbar__hbMenu}>
      <div className={styles.line}></div>
      <div className={styles.line}></div>
      <div className={styles.line}></div>
    </div>
  );
};
