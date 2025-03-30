import styles from './Card.module.scss';
import { FavoriteButton } from '../FavoriteButton/FavoriteButton';
import { SightingsLabel } from '../SightingsLabel/SightingsLabel';

export const Card = () => {
  const isFilled = true;
  return (
    <div className={styles.card}>
      <div className={styles.card__favoriteButton}>
        <FavoriteButton isFilled={isFilled} onClick={() => {}} />
      </div>
      <div className={styles.card__text}>
        <span className={styles.card__text__title}>Court</span>
        <span className={styles.card__text__subtitle}>
          Address: 123 Main St, Anytown, USA
        </span>
      </div>
      <div className={styles.card__sightingsLabel}>
        <SightingsLabel isFilled={isFilled} />
      </div>
    </div>
  );
};
