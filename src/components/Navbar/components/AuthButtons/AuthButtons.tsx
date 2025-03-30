import styles from './AuthButtons.module.scss';
import cx from 'classnames';
import { RoundedButton } from '../../../../shared/components/RoundedButton/RoundedButton';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../../../stores';
import { ModalType } from '../../../../models/modal';

interface AuthButtonsProps {
  flexDirection?: 'row' | 'column';
  onCloseMenu?: () => void;
}

const AuthButtons = observer(
  ({ flexDirection = 'row', onCloseMenu }: AuthButtonsProps) => {
    const { modalStore } = useStores();
    const isMobileOrTablet = flexDirection === 'column';
    const isDesktop = flexDirection === 'row';

    const onOpenModal = (modalType: ModalType) => {
      modalStore.openModal(modalType);
      onCloseMenu?.();
    };

    const baseClassStyle = cx(styles.base, {
      [styles.base__column]: isMobileOrTablet,
      [styles.base__row]: isDesktop,
    });

    return (
      <div className={baseClassStyle}>
        <button
          className={styles.button}
          aria-label="Log in to your account"
          onClick={() => onOpenModal(ModalType.LOGIN)}
        >
          <span className={styles.button__text_highlighted}>Login</span>
        </button>
        <div
          className={styles.register__container}
          onClick={() => onOpenModal(ModalType.REGISTER)}
        >
          <RoundedButton text={'New Account'} />
        </div>
      </div>
    );
  }
);

export default AuthButtons;
