import styles from './Courts.module.scss';
import { SearchBar } from '../../shared/components/SearchBar/SearchBar.tsx';
import { CardContainer } from '../../shared/components/CardContainer/CardContainer.tsx';

const Courts = () => {
  return (
    <div className={styles.courts}>
      <div className={styles.courts__top}>
        <SearchBar />
        <div className={styles.courts__category}>
          <div className={styles.courts_categoryItem}>
            <span>Tennis</span>
          </div>
          <div className={styles.courts_categoryItem}>
            <span>Paddle</span>
          </div>
          <div className={styles.courts_categoryItem}>
            <span>Golf</span>
          </div>
          <div className={styles.courts_categoryItem}>
            <span>Basketball</span>
          </div>
        </div>
      </div>
      <CardContainer />
    </div>
  );
};

export default Courts;
