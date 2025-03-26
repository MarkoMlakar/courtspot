import cx from 'classnames';
import styles from './RoundedButton.module.scss';

interface RoundedButtonProps {
  text: string;
}

export const RoundedButton = ({ text }: RoundedButtonProps) => {
  const roundedBtnStyle = cx(styles.button, styles.button_rounded);

  return (
    <>
      <button
        className={roundedBtnStyle}
        aria-label="Create an account"
        onClick={() => alert('Sign up!')}
      >
        <span className={styles.button__text}>{text}</span>
      </button>
    </>
  );
};
