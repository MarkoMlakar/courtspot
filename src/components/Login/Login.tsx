import { InputField } from '../../shared/components/InputField/InputField';
import { RoundedButton } from '../../shared/components/RoundedButton/RoundedButton';
import styles from './Login.module.scss';
import { useStores } from '../../stores';
import { ModalType } from '../../models/modal';

const Login = () => {
  const { modalStore } = useStores();

  const handleLoginClose = () => modalStore.closeModal(ModalType.LOGIN);

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
        <button className={styles.noLogin__text} onClick={handleLoginClose}>
          I don't want to login
        </button>
      </div>
    </div>
  );
};

export default Login;
