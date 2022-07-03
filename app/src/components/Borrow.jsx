import {
	Box,
	Button,
	Code,
	Divider,
	Flex,
	Input,
	InputGroup,
	InputLeftAddon,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import {
	useChain,
	useMoralis,
	useNativeBalance,
	useWeb3ExecuteFunction,
} from 'react-moralis';
import { simpleVaultAbi } from '../abi/simpleVaultAbi';
import getAbi from '../utils/getAbi';
import getVaultAddr from '../utils/getAddr';

const Borrow = () => {
	const { chain } = useChain();
	const {
		isWeb3Enabled,
		account,
		Moralis,
		Moralis: { Units, web3 },
	} = useMoralis();
	const BigNumber = Moralis.web3Library.BigNumber;
	const [nativeBalance, setNativeBalance] = useState('0');
	useEffect(async () => {
		if (isWeb3Enabled && account) {
			const bal = await web3.getBalance(account);
			setNativeBalance(bal.toString());
		}
	}, [account, chain, isWeb3Enabled]);

	const [collateral, setCollateral] = useState('0');
	const handleChange = (e) => {
		setCollateral(e.target.value.toString());
	};
	// estimate estimateTokenAmount
	const { data: estimatedLoanAmount } = useWeb3ExecuteFunction(
		{
			functionName: 'estimateTokenAmount',
			abi: simpleVaultAbi,
			contractAddress: getVaultAddr(chain?.chainId, 'vault'),
			params: {
				_depositAmount: Units.ETH(collateral ?? '0'),
			},
		},
		{ autoFetch: true }
	);

	// fetch vault details
	const { data: vaultData, fetch: fetchVault } = useWeb3ExecuteFunction(
		{
			functionName: 'getVault',
			abi: simpleVaultAbi,
			contractAddress: getVaultAddr(chain?.chainId, 'vault'),
			params: {
				_address: account,
			},
		},
		{ autoFetch: false }
	);
	useEffect(() => {
		fetchVault();
	}, []);
	useEffect(() => {
		if (vaultData?.collateral)
			setCollateral(vaultData.collateralAmount.toString());
	}, [vaultData]);

	// LAYs balance
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
		<Flex
			maxW='60ch'
			alignSelf={'center'}
			direction='column'
			py='10'
			px='10'
			gap='6'
			backgroundColor={useColorModeValue('bg.white.50', 'bg.dark.800')}
			borderRadius='6'
		>
			<Box>
				<label htmlFor='collateral'>Current Collateral</label>
				<InputGroup>
					<InputLeftAddon>ETH</InputLeftAddon>
					<Input type='number' value={collateral} onChange={handleChange} />
				</InputGroup>
			</Box>

			<Box>
				{/* Eligible loan */}
				<label htmlFor='loanAmount'>
					Loan (in LAYs)
					<InputGroup>
						<InputLeftAddon>$</InputLeftAddon>
						<Input
							type='number'
							placeholder='ETH AMount'
							onChange={() => {}}
							value={Units.FromWei(estimatedLoanAmount ?? '0')}
						/>
					</InputGroup>
				</label>
			</Box>

			<Button
				disabled={collateral === vaultData?.collateralAmount.toString()}
				variant='solid'
				colorScheme={
					collateral > vaultData?.collateralAmount.toString()
						? 'green'
						: 'orange'
				}
			>
				{collateral > vaultData?.collateralAmount.toString()
					? 'Deposit'
					: 'Withdraw'}
			</Button>

			<Divider />

			<Code p='2' colorScheme='teal'>
				Lays Balance: {Units.FromWei(laysBalance ?? '0')}
			</Code>
		</Flex>
	);
};

export default Borrow;
