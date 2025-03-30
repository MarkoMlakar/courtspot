import styles from './InputField.module.scss';

interface InputFieldProps {
  fieldTitle: string;
  placeholder?: string;
  type: string;
  required?: boolean;
  min?: string;
  max?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputClassName?: string;
}

export const InputField = ({
  fieldTitle,
  placeholder,
  type,
  required,
  onChange,
  min,
  max,
  inputClassName,
}: InputFieldProps) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.currentTarget.blur(); // Close the keyboard by blurring the input
    }
  };
  return (
    <div className={styles.inputField}>
      <label className={styles.inputField__title}>{fieldTitle}</label>
      <input
        className={`${styles.inputField__input} ${inputClassName || ''}`}
        type={type}
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
        onChange={onChange}
        min={min}
        max={max}
        required={required}
      />
    </div>
  );
};
