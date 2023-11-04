import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Account from './Components/Account/Account';
import Home from './Components/Home/Home';
import Air from './Components/Air/Air';

export default function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path='/air' element={<Air />} />
				<Route path='/account/:mode' element={<Account />} />
			</Routes>
		</Router>
	);
}