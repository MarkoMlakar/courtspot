import cx from 'classnames';
import styles from './CloseButton.module.scss';

export const CloseButton = () => {
  return (
    <div className={styles.container}>
      <div className={cx(styles.line, styles.line__line1)}></div>
      <div className={cx(styles.line, styles.line__line2)}></div>
    </div>
  );
};
