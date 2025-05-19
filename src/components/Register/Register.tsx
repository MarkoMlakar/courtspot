import { useState } from 'react';
import { InputField } from '../../shared/components/InputField/InputField';
import { RoundedButton } from '../../shared/components/RoundedButton/RoundedButton';
import styles from './Register.module.scss';
import { useStores } from '../../stores';
import { ModalType } from '../../models/modal';
import { observer } from 'mobx-react-lite';

const Register = observer(function Register() {
  const { modalStore, authStore } = useStores();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());

  const handleRegisterClose = () => modalStore.closeModal(ModalType.REGISTER);
  const onSignUp = async() => {
    await authStore.register({email, password, firstName, lastName, userName, dateOfBirth});
    if (!authStore.error) {
      handleRegisterClose();
    }

  }

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
              onChange={e => setFirstName(e.target.value)}
            />
            <InputField
              type="text"
              fieldTitle="Last Name"
              placeholder="Enter your last name"
              required={true}
              onChange={e => setLastName(e.target.value)}
            />
          </div>
          <InputField
            type="date"
            fieldTitle="Date of Birth"
            inputClassName={styles.register__dateOfBirth}
            required={true}
            onChange={e => setDateOfBirth(new Date(e.target.value))}
          />
          <InputField
            type="email"
            fieldTitle="Email Address"
            placeholder="example@email.com"
            required={true}
            onChange={e => setEmail(e.target.value)}
          />
          <InputField type="password" fieldTitle="Password" required={true} onChange={e => setPassword(e.target.value)}/>
        </div>
        <div className={styles.register__button}>
          <RoundedButton
            text={authStore.isLoading ? "Loading... " : "Create Account"}
            fontSize={0.88}
            borderRadius={0.19}
            onClick={onSignUp}
          />
        </div>
        <button className={styles.noRegister__text} onClick={handleRegisterClose}>
          I don't want to register
        </button>
      </div>
    </div>
  );
});

export default Register;
