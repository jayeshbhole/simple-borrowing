import { Text, Heading } from '@chakra-ui/react';
import Page from '../components/layouts/Page';
import Borrow from '../components/Borrow';

const Landing = () => {
	return (
		<Page>
			<Heading as='h1' size='2xl' textAlign='center'>
				LAYs
			</Heading>
			<Heading as='h3' size='md' textAlign='center'>
				A Simple Borrowing DApp
			</Heading>

			<Borrow />
		</Page>
	);
};

export default Landing;
