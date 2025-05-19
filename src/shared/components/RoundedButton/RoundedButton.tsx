import cx from 'classnames';
import styles from './RoundedButton.module.scss';

interface RoundedButtonProps {
  text: string;
  fontSize?: number;
  borderRadius?: number;
  onClick: () => void;
}

export const RoundedButton = ({
  text,
  fontSize = 0.875,
  borderRadius = 5,
  onClick,
}: RoundedButtonProps) => {
  const roundedBtnStyle = cx(styles.button, styles.button_rounded);

  return (
    <>
      <button
        className={roundedBtnStyle}
        style={{ borderRadius: `${borderRadius}rem` }}
        onClick={onClick}
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
