import { SearchBar } from '../../shared/components/SearchBar/SearchBar';
import styles from './Home.module.scss';

const Home = () => {
  return (
    <div className={styles.home}>
      <div className={styles.home__stage}>
        <h1 className={styles.home__stage__title}>
          Discover tennis courts around you
        </h1>
        <h2 className={styles.home__stage__subtitle}>
          Explore between more than 10.000 courts worldwide
        </h2>
        <SearchBar />
      </div>
      <div className={styles.home__cardContainer}>
        <div className={styles.home__cardContainer__items}>
          <div className={styles.test}></div>
          <div className={styles.test}></div>
          <div className={styles.test}></div>
          <div className={styles.test}></div>
          <div className={styles.test}></div>
          <div className={styles.test}></div>
          <div className={styles.test}></div>
          <div className={styles.test}></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
