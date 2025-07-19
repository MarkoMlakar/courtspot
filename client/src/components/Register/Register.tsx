import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { InputField } from '../../shared/components/InputField/InputField';
import { RoundedButton } from '../../shared/components/RoundedButton/RoundedButton';
import styles from './Register.module.scss';
import { useStores } from '../../stores';
import { ModalType } from '../../models/modal';
import { RegisterRequest } from '../../services';
import { useModalCleanup } from '../../shared/hooks/useModalCleanup';

const Register = observer(() => {
  const { modalStore, authStore } = useStores();

  // Form state
  const [formData, setFormData] = useState<RegisterRequest>({
    email: '',
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    date_of_birth: '',
  });

  // Form validation state
  const [errors, setErrors] = useState<Partial<RegisterRequest>>({});

  const cleanup = () => {
    setFormData({
      email: '',
      username: '',
      password: '',
      first_name: '',
      last_name: '',
      date_of_birth: '',
    });
    setErrors({});
    authStore.clearError();
  };

  useModalCleanup(ModalType.REGISTER, cleanup);

  const handleRegisterClose = () => {
    modalStore.closeModal(ModalType.REGISTER);
  };

  // Handle input changes
  const handleInputChange =
    (field: keyof RegisterRequest) =>
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
    const user = await authStore.register(formData);

    if (user) {
      handleRegisterClose();
    }
  };

  return (
    <div className={styles.register}>
      <div className={styles.register__container}>
        <span className={styles.register__title}>Create an Account</span>
        {authStore.hasError && (
          <div className={styles.register__error}>{authStore.error}</div>
        )}

        <div className={styles.register__form}>
          <div className={styles.register__nameFields}>
            <InputField
              type="text"
              fieldTitle="First Name"
              placeholder="Enter your first name"
              required={true}
              onChange={handleInputChange('first_name')}
            />
            <InputField
              type="text"
              fieldTitle="Last Name"
              placeholder="Enter your last name"
              required={true}
              onChange={handleInputChange('last_name')}
            />
          </div>
          <InputField
            type="date"
            fieldTitle="Date of Birth"
            inputClassName={styles.register__dateOfBirth}
            required={true}
            onChange={handleInputChange('date_of_birth')}
          />
          <InputField
            type="email"
            fieldTitle="Email Address"
            placeholder="example@email.com"
            required={true}
            onChange={handleInputChange('email')}
          />
          <InputField
            type="text"
            fieldTitle="Username"
            placeholder="Enter your username"
            required={true}
            onChange={handleInputChange('username')}
          />
          <InputField
            type="password"
            fieldTitle="Password"
            required={true}
            onChange={handleInputChange('password')}
          />
        </div>
        <div className={styles.register__button}>
          <RoundedButton
            text={
              authStore.isLoading ? 'Creating Account...' : 'Create Account'
            }
            fontSize={0.88}
            borderRadius={0.19}
            onClick={handleSubmit}
            disabled={authStore.isLoading}
          />
        </div>
        <button
          className={styles.noRegister__text}
          onClick={handleRegisterClose}
          type="button"
        >
          I don't want to register
        </button>
      </div>
    </div>
  );
});

export default Register;
