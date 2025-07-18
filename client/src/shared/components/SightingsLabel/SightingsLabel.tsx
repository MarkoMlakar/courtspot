import cx from 'classnames';
import styles from './SightingsLabel.module.scss';

export const SightingsLabel = ({ isFilled }: { isFilled: boolean }) => {
  const sightingsLabelStyles = cx(
    styles.sightingsLabel,
    isFilled && styles.sightingsLabel__filled
  );
  return (
    <div className={sightingsLabelStyles}>
      <span className={styles.sightingsLabel__text}>-1 sightings</span>
    </div>
  );
};
