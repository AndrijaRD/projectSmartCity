import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Weather from './Components/Weather/Weather';
import Home from './Components/Home/Home';

import './colors.css'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/weather' element={<Weather />} />
      </Routes>
    </Router>
  );
}
