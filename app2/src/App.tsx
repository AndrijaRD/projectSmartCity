import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import './colors.css'

import Home from './Components/Home/Home';
import Weather from './Components/Weather/Weather';
import NotFound from './Components/NotFound/NotFound';

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