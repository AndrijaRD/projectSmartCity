import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './Components/Home/Home';
import Air from './Components/Air/Air';
import NotFound from './Components/NotFound/NotFound';
import Account from './Components/Account/Account';

export default function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/account/:mode" element={<Account />} />
				<Route path="/air" element={<Air />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Router>
	);
}
