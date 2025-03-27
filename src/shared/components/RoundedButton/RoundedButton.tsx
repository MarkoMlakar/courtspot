import cx from 'classnames';
import styles from './RoundedButton.module.scss';

interface RoundedButtonProps {
  text: string;
  fontSize?: number;
  width?: number;
  height?: number;
}

export const RoundedButton = ({
  text,
  width = 8.75,
  height = 2.5,
  fontSize = 0.875,
}: RoundedButtonProps) => {
  const roundedBtnStyle = cx(styles.button, styles.button_rounded);

  return (
    <>
      <button
        className={roundedBtnStyle}
        style={{ width: `${width}rem`, height: `${height}rem` }}
        aria-label="Create an account"
        onClick={() => alert('Sign up!')}
      >
        <span
          className={styles.button__text}
          style={{ fontSize: `${fontSize}rem` }}
        >
          {text}
        </span>
      </button>
    </>
  );
};
