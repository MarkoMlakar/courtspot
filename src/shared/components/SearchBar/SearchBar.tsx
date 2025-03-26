import styles from './SearchBar.module.scss';
import searchIcon from '../../../assets/pl-icon-search.svg';

export const SearchBar = () => {
  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      event.target.blur(); // Close the keyboard by blurring the input
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
        <img src={searchIcon}></img>
      </button>
    </div>
  );
};
