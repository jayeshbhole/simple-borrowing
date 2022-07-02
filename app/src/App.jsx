import { Suspense, lazy, createElement, useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Routes, Route, Navigate } from 'react-router';
import extendedTheme from './theme';
import DefaultLayout from './components/layouts/DefaultLayout';
import Loader from './components/Loader';
import { BrowserRouter } from 'react-router-dom';
import { Web3ContextProvider } from './context/Web3Context';
import { useMoralis } from 'react-moralis';

const App = () => {
	const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } =
		useMoralis();

	useEffect(() => {
		const connectorId = window.localStorage.getItem('connectorId');
		if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
			enableWeb3({ provider: connectorId });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAuthenticated, isWeb3Enabled]);

	return (
		<Web3ContextProvider>
			<ChakraProvider theme={extendedTheme}>
				<BrowserRouter>
					<DefaultLayout>
						<Routes>
							<Route path='/'>
								{paths.map(({ path, component }) => (
									<Route
										key={path}
										path={path}
										element={
											<Suspense fallback={<Loader />}>
												{createElement(component)}
											</Suspense>
										}
									></Route>
								))}
								{/* <Route path='*' element={<>Not Found</>} /> */}
								<Route path='*' element={<Navigate to='/404' />} />
							</Route>
						</Routes>
					</DefaultLayout>
				</BrowserRouter>
			</ChakraProvider>
		</Web3ContextProvider>
	);
};

const paths = [
	{
		path: '/',
		component: lazy(() => import('./pages/Landing')),
	},
	{
		path: '404',
		component: lazy(() => import('./pages/NotFound')),
	},
];

export default App;
