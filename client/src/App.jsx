import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { getAuthenticatedUser } from './utils/authenticate';

import Header from './components/header/header';
import LandingPage from './pages/landing/landing-page';
import SignupPage from './pages/signup/signup';
import LoginPage from './pages/login/login';
import HeaderAfterLogin from './components/header/header-after-login';
import ProtectedRoute from './components/protected-route/protected-route';

const App = () => {
	const [authenticatedUser, setAuthenticatedUser] = useState(null);
	let location = useLocation();

	useEffect(() => {
		const handleUserAuthStatus = async () => {
			getAuthenticatedUser().then((user) => {
				setAuthenticatedUser(user);
			});
		};
		handleUserAuthStatus();
	}, [location]);

	const commonRoutes = (
		<>
			<Route path='/' element={<LandingPage />} />
			<Route path='/login' element={<LoginPage />} />
			<Route path='/signup' element={<SignupPage />} />
		</>
	);

	// TODO: Use this again.
	const protectedRoutes = <Route path='/home' element={<h1>HOME</h1>} />;

	// TODO: Protected route is not protected.... Header and Header after login dont switch when authenticated.
	return (
		<>
			{/* {authenticatedUser ? <HeaderAfterLogin /> : <Header />} */} {/** !SLC scope lowered comment */}
			<Routes>
				{commonRoutes}
				<Route element={<ProtectedRoute />}>
					<Route path='/home' element={<h1>HOME</h1>} />
				</Route>
				<Route path='*' element={<h1>404 Page Not Found.</h1>} />
			</Routes>
		</>
	);
};

export default App;
