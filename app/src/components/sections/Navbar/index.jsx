import {
	Flex,
	useColorModeValue,
	HStack,
	useDisclosure,
	IconButton,
	VStack,
	Text,
	Button,
} from '@chakra-ui/react';
import UserMenu from './UserMenu';
import { ExternalLink, NavLink } from './Links';
import { VscClose } from 'react-icons/vsc';
import { RiMenu5Fill } from 'react-icons/ri';
import { motion, AnimatePresence } from 'framer-motion';
import { useChain, useMoralis, useWeb3ExecuteFunction } from 'react-moralis';
import getAbi from '../../../utils/getAbi';
import getVaultAddr from '../../../utils/getAddr';
import { useMemo } from 'react';

const Navbar = (props) => {
	const bgColor = useColorModeValue('whiteAlpha.800', 'blackAlpha.700');
	const { isOpen, onToggle } = useDisclosure();
	const { switchNetwork, chain } = useChain();
	const {
		user,
		isWeb3Enabled,
		account,
		Moralis,
		Moralis: { Units, web3 },
	} = useMoralis();
	const nativeBalance = useMemo(async () => {
		isWeb3Enabled && account
			? (await web3.getBalance(account)).toString()
			: '0';
	}, [account, chain, isWeb3Enabled]);
	console.log(nativeBalance);

	const { data: laysBalance } = useWeb3ExecuteFunction(
		{
			functionName: 'balanceOf',
			abi: getAbi('LAYs'),
			contractAddress: getVaultAddr(chain?.chainId, 'LAYs'),
			params: {
				_address: account,
			},
		},
		{
			autoFetch: true,
		}
	);

	return (
		<>
			<Flex
				as='nav'
				align='center'
				justify='space-between'
				w='100%'
				p={2}
				px={4}
				bg={bgColor}
				sx={{
					backdropFilter: 'blur( 20px )',
				}}
				pos={'sticky'}
				top={0}
				wrap='wrap'
				zIndex={999}
			>
				<NavLink to='/'>
					<Text fontSize='lg' fontWeight='bold' as='span'>
						LAYs
					</Text>
				</NavLink>

				<Flex display={{ base: 'none', sm: 'flex' }}>
					{/* <NavLink to='/'>Home</NavLink> */}
				</Flex>
				<HStack spacing='0'>
					{chain && (
						<Button
							size='md'
							mr='4'
							variant={chain?.chainId === '0x89' ? 'ghost' : 'outline'}
							colorScheme={'green'}
							// onClick={() => switchNetwork('0x89')}
						>
							{chain?.chainId === '0x89' ? 'Polygon' : chain.name}
						</Button>
					)}

					<Button size='md' mr='4'>
						{/* {Units.ETH(nativeBalance || '0')} */}
						{nativeBalance.toString()}
					</Button>

					<UserMenu />

					<IconButton
						onClick={onToggle}
						icon={isOpen ? null : <RiMenu5Fill />}
						variant={'ghost'}
						aria-label={'Toggle Navigation'}
						display={{ base: 'flex', sm: 'none' }}
					/>
				</HStack>
			</Flex>
			<AnimatePresence>
				{isOpen && <MobileNav onToggle={onToggle} />}
			</AnimatePresence>
		</>
	);
};
const MotionVStack = motion(VStack);

const MobileNav = ({ onToggle }) => {
	return (
		<>
			<MotionVStack
				display={{ base: 'flex', sm: 'none' }}
				bg={useColorModeValue('blue.50', 'gray.900')}
				p={4}
				justify='center'
				sx={{
					width: '100vw',
					position: 'fixed',
					left: 0,
					top: 0,
					height: '100vh',
					zIndex: 999,
				}}
				duration={0.1}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
			>
				{/* <NavLink
					to='/'
					display='block'
					textAlign='center'
					width='100%'
					onClick={onToggle}
				>
					Home
				</NavLink> */}
			</MotionVStack>
			<IconButton
				onClick={onToggle}
				icon={<VscClose />}
				variant={'ghost'}
				aria-label={'Toggle Navigation'}
				display={{ base: 'flex', md: 'none' }}
				position='fixed'
				right={4}
				top={3}
				zIndex='1001'
			/>
		</>
	);
};

export default Navbar;
