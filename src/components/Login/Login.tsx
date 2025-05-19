import { InputField } from '../../shared/components/InputField/InputField';
import { RoundedButton } from '../../shared/components/RoundedButton/RoundedButton';
import styles from './Login.module.scss';
import { useStores } from '../../stores';
import { ModalType } from '../../models/modal';
import { useState } from 'react';
const Login = () => {
  const { modalStore, authStore } = useStores();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginClose = () => modalStore.closeModal(ModalType.LOGIN);
  const handleLogin = () => {
    if (email && password) {
      authStore.login(email, password);
      handleLoginClose();
    }
  };

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
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            type="password"
            fieldTitle="Password"
            required={true}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles.login__btn}>
          <RoundedButton
            text="Login to your Account"
            fontSize={0.88}
            borderRadius={0.19}
            onClick={handleLogin}
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
