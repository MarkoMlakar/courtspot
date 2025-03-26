import { SearchBar } from '../../shared/components/SearchBar/SearchBar';
import styles from './Home.module.scss';

const Home = () => {
  return (
    <div className={styles.home}>
      <h1 className={styles.home__title}>Discover tennis courts around you</h1>
      <h2 className={styles.home__subtitle}>
        Explore between more than 10.000 courts worldwide
      </h2>
      <SearchBar />
    </div>
  );
};

export default Home;
