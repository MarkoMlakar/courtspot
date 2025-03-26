import { RoundedButton } from '../../shared/components/RoundedButton/RoundedButton';
import styles from './Home.module.scss';

const Home = () => {
  return (
    <div className={styles.home}>
      <h1 className={styles.home__title}>Discover flowers around you</h1>
      <h2 className={styles.home__subtitle}>Explore between more than 8.427 sightings</h2>
      <RoundedButton text={'TODO'} />
    </div>
  );
};

export default Home;
