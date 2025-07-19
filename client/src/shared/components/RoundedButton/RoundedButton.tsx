import cx from 'classnames';
import styles from './RoundedButton.module.scss';

interface RoundedButtonProps {
  text: string;
  fontSize?: number;
  borderRadius?: number;
  onClick?: () => void;
  disabled?: boolean;
}

export const RoundedButton = ({
  text,
  fontSize = 0.875,
  borderRadius = 5,
  onClick,
  disabled = false,
}: RoundedButtonProps) => {
  const roundedBtnStyle = cx(styles.button, styles.button_rounded);
  const textStyle = cx(styles.button__text, {
    [styles.button__text_disabled]: disabled,
  });

  return (
    <>
      <button
        className={roundedBtnStyle}
        style={{ borderRadius: `${borderRadius}rem` }}
        onClick={onClick}
        disabled={disabled}
      >
        <span className={textStyle} style={{ fontSize: `${fontSize}rem` }}>
          {text}
        </span>
      </button>
    </>
  );
};
