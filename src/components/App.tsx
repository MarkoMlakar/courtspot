import Courts from '../pages/Courts/Courts';
import Favorites from '../pages/Favorites/Favorites';
import Home from '../pages/Home/Home';
import LatestVisits from '../pages/LatestVisits/LatestVisits';
import Navbar from './Navbar/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router';
import styles from './App.module.scss';

export const App = () => {
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <Navbar />
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path="/courts" element={<Courts />}></Route>
          <Route path="/favorites" element={<Favorites />}></Route>
          <Route path="/latest-visits" element={<LatestVisits />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};
