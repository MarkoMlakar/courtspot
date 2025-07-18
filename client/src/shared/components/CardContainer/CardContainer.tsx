import styles from './CardContainer.module.scss';
import { Card } from '../Card/Card.tsx';

export const CardContainer = () => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardContainer__items}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};
