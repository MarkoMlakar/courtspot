import cx from 'classnames';
import styles from './FavoriteButton.module.scss';
import favoriteFilled from '../../../assets/favorite-star-filled.svg';
import favorite from '../../../assets/favorite-star.svg';

export const FavoriteButton = ({
  isFilled,
  onClick,
}: {
  isFilled: boolean;
  onClick: () => void;
}) => {
  const favoriteButtonClass = cx(
    styles.favoriteButton,
    isFilled && styles.favoriteButton__filled
  );
  return (
    <div className={favoriteButtonClass} onClick={onClick}>
      <img
        className={styles.favoriteButton__icon}
        src={isFilled ? favoriteFilled : favorite}
        alt="Favorite"
      ></img>
    </div>
  );
};
