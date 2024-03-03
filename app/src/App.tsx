import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home/Home';
import AirKeeper from './components/AirKeeper/AirKeeper';

export default function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/air-keeper" element={<AirKeeper />} />
			</Routes>
		</Router>
	);
}
