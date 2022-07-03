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
import { NavLink } from './Links';
import { VscClose } from 'react-icons/vsc';
import { RiMenu5Fill } from 'react-icons/ri';
import { motion, AnimatePresence } from 'framer-motion';
import { useChain, useMoralis } from 'react-moralis';
import { useEffect, useState } from 'react';
import numberFormatter from '../../../utils/numberFormatter';

const Navbar = (props) => {
	const bgColor = useColorModeValue('whiteAlpha.800', 'blackAlpha.700');
	const { isOpen, onToggle } = useDisclosure();
	const { switchNetwork, chain } = useChain();
	const {
		isWeb3Enabled,
		account,
		Moralis: { Units, web3 },
	} = useMoralis();
	const [nativeBalance, setNativeBalance] = useState('0');
	useEffect(async () => {
		if (isWeb3Enabled && account) {
			const bal = await web3.getBalance(account);
			setNativeBalance(bal.toString());
		}
	}, [account, chain, isWeb3Enabled]);

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
						{numberFormatter(Units.FromWei(nativeBalance || '0'), 4)}
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
