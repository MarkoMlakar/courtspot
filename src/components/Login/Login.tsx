import { InputField } from '../../shared/components/InputField/InputField';
import { RoundedButton } from '../../shared/components/RoundedButton/RoundedButton';
import styles from './Login.module.scss';
const Login = ({
  setIsLoginModalOpen,
}: {
  setIsLoginModalOpen: () => void;
}) => {
  return (
    <div className={styles.login}>
      <div className={styles.login__container}>
        <span className={styles.login__title}>Welcome Back!</span>
        <div className={styles.login__form}>
          <InputField
            type="email"
            fieldTitle="Email Address"
            placeholder="example@email.com"
            required={true}
          />
          <InputField type="password" fieldTitle="Password" required={true} />
        </div>
        <div className={styles.login__btn}>
          <RoundedButton
            text="Login to your Account"
            fontSize={0.88}
            borderRadius={0.19}
          />
        </div>
        <span className={styles.noLogin__text} onClick={setIsLoginModalOpen}>
          I don't want to login
        </span>
      </div>
    </div>
  );
};

export default Login;
