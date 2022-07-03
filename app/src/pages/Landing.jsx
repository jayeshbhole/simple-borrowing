import { Text, Heading } from '@chakra-ui/react';
import Page from '../components/layouts/Page';
import Borrow from '../components/Borrow';

const Landing = () => {
	return (
		<Page>
			<Heading as='h3' size='md' mt='6' textAlign='center'>
				Turn in your ETHs and get LAYed. A stable coin as airy as LAYs.
			</Heading>

			<Borrow />
		</Page>
	);
};

export default Landing;
