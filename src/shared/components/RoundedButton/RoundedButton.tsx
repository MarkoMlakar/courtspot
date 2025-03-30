import cx from 'classnames';
import styles from './RoundedButton.module.scss';

interface RoundedButtonProps {
  text: string;
  fontSize?: number;
  borderRadius?: number;
}

export const RoundedButton = ({
  text,
  fontSize = 0.875,
  borderRadius = 5,
}: RoundedButtonProps) => {
  const roundedBtnStyle = cx(styles.button, styles.button_rounded);

  return (
    <>
      <button
        className={roundedBtnStyle}
        style={{ borderRadius: `${borderRadius}rem` }}
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
