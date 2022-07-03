import {
	Text,
	Heading,
	Tabs,
	TabList,
	Tab,
	TabPanels,
	TabPanel,
	Flex,
	useColorModeValue,
	Code,
} from '@chakra-ui/react';
import Page from '../components/layouts/Page';
import Borrow from '../components/Borrow';
import Repay from '../components/Repay';
import getAddr from '../utils/getAddr';
import { useChain, useMoralis, useWeb3ExecuteFunction } from 'react-moralis';
import getAbi from '../utils/getAbi';

const Landing = () => {
	const {
		isWeb3Enabled,
		account,
		Moralis,
		Moralis: { Units, web3 },
	} = useMoralis();
	const { chainId } = useChain();
	// LAYs balance
	const {
		data: laysBalance,
		error,
		fetch: fetchLaysBalance,
	} = useWeb3ExecuteFunction(
		{
			functionName: 'balanceOf',
			abi: getAbi('LAYs'),
			contractAddress: getAddr(chainId, 'LAYs'),
			params: {
				account: account,
			},
		},
		{
			autoFetch: true,
		}
	);

	return (
		<Page>
			<Heading as='h3' size='md' my='10' textAlign='center'>
				Turn in your ETHs and get LAYed. A stable coin as airy as LAYs.
			</Heading>

			<Code p='2' colorScheme='teal' maxW='40ch' alignSelf='center'>
				Lays Balance: {Units.FromWei(laysBalance ?? '0')}
			</Code>
			<Tabs variant='enclosed' as={Flex} {...tabFlexProps()}>
				<TabList>
					<Tab>Borrow</Tab>
					<Tab>Repay</Tab>
				</TabList>
				<TabPanels
					backgroundColor={useColorModeValue('bg.white.50', 'bg.dark.800')}
					border='1px solid'
					borderColor={useColorModeValue('gray.200', 'gray.700')}
				>
					<TabPanel>
						<Borrow fetchLaysBalance={fetchLaysBalance} />
					</TabPanel>

					<TabPanel>
						<Repay fetchLaysBalance={fetchLaysBalance} />
					</TabPanel>
				</TabPanels>
			</Tabs>
		</Page>
	);
};
const tabFlexProps = () => ({
	maxW: '60ch',
	alignSelf: 'center',
	direction: 'column',
	mt: '10',
	py: '10',
	px: '10',
	gap: '6',
	borderRadius: '6',
});

export default Landing;
