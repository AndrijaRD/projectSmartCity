import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Weather from './Components/Weather/Weather';
import Home from './Components/Home/Home';
import NotFound from './Components/404/404';

import './colors.css'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/weather' element={<Weather />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
}
