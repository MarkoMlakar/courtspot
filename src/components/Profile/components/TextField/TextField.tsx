import styles from './TextField.module.scss';

interface TextFieldProps {
  title: string;
  value: string;
}

export const TextField = ({ title, value }: TextFieldProps) => {
  return (
    <div className={styles.textField}>
      <span className={styles.textField__title}>{title}</span>
      <span className={styles.textField__value}>{value}</span>
    </div>
  );
};
