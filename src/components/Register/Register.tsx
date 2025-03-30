import { InputField } from '../../shared/components/InputField/InputField';
import { RoundedButton } from '../../shared/components/RoundedButton/RoundedButton';
import styles from './Register.module.scss';

const Register = ({
  setIsRegisterModalOpen,
}: {
  setIsRegisterModalOpen: () => void;
}) => {
  return (
    <div className={styles.register}>
      <div className={styles.register__container}>
        <span className={styles.register__title}>Create an Account</span>
        <div className={styles.register__form}>
          <div className={styles.register__nameFields}>
            <InputField
              type="text"
              fieldTitle="First Name"
              placeholder="Enter your first name"
              required={true}
            />
            <InputField
              type="text"
              fieldTitle="Last Name"
              placeholder="Enter your last name"
              required={true}
            />
          </div>
          <InputField
            type="date"
            fieldTitle="Date of Birth"
            inputClassName={styles.register__dateOfBirth}
            required={true}
          />
          <InputField
            type="email"
            fieldTitle="Email Address"
            placeholder="example@email.com"
            required={true}
          />
          <InputField type="password" fieldTitle="Password" required={true} />
        </div>
        <div className={styles.register__button}>
          <RoundedButton
            text="Create Account"
            fontSize={0.88}
            borderRadius={0.19}
          />
        </div>
        <span
          className={styles.noRegister__text}
          onClick={setIsRegisterModalOpen}
        >
          I don't want to register
        </span>
      </div>
    </div>
  );
};

export default Register;
