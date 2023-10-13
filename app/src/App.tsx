import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Home from './Components/Home/Home';
import Weather from './Components/Weather/Weather';
import NotFound from './Components/NotFound/NotFound';

export default function App(): JSX.Element {
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