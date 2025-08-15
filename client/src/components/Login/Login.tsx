import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { InputField } from '../../shared/components/InputField/InputField';
import { RoundedButton } from '../../shared/components/RoundedButton/RoundedButton';
import styles from './Login.module.scss';
import { useStores } from '../../stores';
import { ModalType } from '../../types/modal';
import { LoginRequest } from '../../services';
import { useModalCleanup } from '../../shared/hooks/useModalCleanup';

const Login = observer(() => {
  const { modalStore, authStore } = useStores();

  // Form state
  const [formData, setFormData] = useState<LoginRequest>({
    email: '',
    password: '',
  });

  // Form validation state
  const [errors, setErrors] = useState<Partial<LoginRequest>>({});

  const cleanup = () => {
    setFormData({
      email: '',
      password: '',
    });
    setErrors({});
    authStore.clearError();
  };

  useModalCleanup(ModalType.LOGIN, cleanup);

  const handleLoginClose = () => {
    modalStore.closeModal(ModalType.LOGIN);
  };

  // Handle input changes
  const handleInputChange =
    (field: keyof LoginRequest) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setFormData(prev => ({ ...prev, [field]: value }));

      // Clear local form errors when user starts typing
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: undefined }));
      }

      // Clear AuthStore error when user starts typing (to show fresh error on next submit)
      if (authStore.hasError) {
        authStore.clearError();
      }
    };

  // Handle form submission
  const handleSubmit = async () => {
    const user = await authStore.login(formData.email, formData.password);

    if (user) {
      handleLoginClose();
    }
  };

  return (
    <div className={styles.login} data-testid="login-modal">
      <div className={styles.login__container}>
        <span className={styles.login__title}>Welcome Back!</span>
        {authStore.hasError && (
          <div className={styles.login__error}>{authStore.error}</div>
        )}
        <div className={styles.login__form}>
          <InputField
            type="email"
            fieldTitle="Email Address"
            placeholder="example@email.com"
            required={true}
            onChange={handleInputChange('email')}
          />
          <InputField
            type="password"
            fieldTitle="Password"
            required={true}
            onChange={handleInputChange('password')}
          />
        </div>
        <div className={styles.login__btn}>
          <RoundedButton
            text={
              authStore.isLoading ? 'Logging in...' : 'Login to your Account'
            }
            fontSize={0.88}
            borderRadius={0.19}
            onClick={handleSubmit}
            disabled={authStore.isLoading}
          />
        </div>
        <button
          className={styles.noLogin__text}
          onClick={handleLoginClose}
          type="button"
        >
          I don't want to login
        </button>
      </div>
    </div>
  );
});

export default Login;
