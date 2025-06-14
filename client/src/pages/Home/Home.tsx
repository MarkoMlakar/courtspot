import { SearchBar } from '../../shared/components/SearchBar/SearchBar';
import styles from './Home.module.scss';
import { CardContainer } from '../../shared/components/CardContainer/CardContainer.tsx';

const Home = () => {
  return (
    <div className={styles.home}>
      <div className={styles.home__stage}>
        <h1 className={styles.home__stage__title}>
          Discover courts around you
        </h1>
        <h2 className={styles.home__stage__subtitle}>
          Explore between more than 10.000 sport courts worldwide
        </h2>
        <SearchBar />
      </div>
      <CardContainer />
    </div>
  );
};

export default Home;
