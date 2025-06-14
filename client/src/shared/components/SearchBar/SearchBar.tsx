import styles from './SearchBar.module.scss';
import searchIcon from '../../../assets/pl-icon-search.svg';

export const SearchBar = () => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.currentTarget.blur(); // Close the keyboard by blurring the input
    }
  };
  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        className={styles.searchBar__input}
        placeholder="Looking for something specific?"
        onKeyDown={handleKeyDown}
      ></input>
      <button className={styles.searchBar__icon} type="submit">
        <img src={searchIcon} alt="Search Icon"></img>
      </button>
    </div>
  );
};
