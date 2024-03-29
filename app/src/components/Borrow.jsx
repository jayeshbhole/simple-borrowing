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
	useToast,
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
import getAddr from '../utils/getAddr';

const Borrow = ({ fetchLaysBalance }) => {
	const { chain } = useChain();
	const {
		isWeb3Enabled,
		account,
		Moralis,
		Moralis: { Units, web3 },
	} = useMoralis();
	const BigNumber = Moralis.web3Library.BigNumber;

	const [collateral, setCollateral] = useState('0');
	const handleChange = (e) => {
		setCollateral(Number((e.target.value || 0).toString()));
	};
	// estimate estimateTokenAmount
	const {
		data: estimatedLoanAmount,
		isLoading: isEstimateLoading,
		isFetching: isEstimateFetching,
	} = useWeb3ExecuteFunction(
		{
			functionName: 'estimateTokenAmount',
			abi: simpleVaultAbi,
			contractAddress: getAddr(chain?.chainId, 'vault'),
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
			contractAddress: getAddr(chain?.chainId, 'vault'),
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
		if (vaultData?.collateralAmount)
			setCollateral(Units.FromWei(vaultData.collateralAmount.toString()));
	}, [vaultData]);

	const toast = useToast();
	// deposit/borrow
	const { fetch: borrow } = useWeb3ExecuteFunction(
		{
			functionName: 'borrow',
			abi: getAbi('vault'),
			contractAddress: getAddr(chain?.chainId, 'vault'),
			msgValue: Units.ETH(collateral ?? '0'),
			params: {
				_collAmount: Units.ETH(collateral ?? '0'),
			},
		},
		{
			autoFetch: false,
		}
	);

	const handleClick = async () => {
		const toastOptions = {
			status: 'success',
			duration: 5000,
			isClosable: true,
		};

		borrow({
			onSuccess: () => {
				toast({
					...toastOptions,
					title: 'Borrowed Loan',
					description: 'Your collateral has been deposited. ',
				});
				fetchLaysBalance();
			},
			onError: () =>
				toast({
					...toastOptions,
					title: 'Error',
					status: 'error',
				}),
			msgValue: Units.ETH(collateral ?? '0'),
			params: {
				_collAmount: Units.ETH(collateral ?? '0'),
			},
		});
	};

	return (
		<Flex
			maxW='60ch'
			alignSelf={'center'}
			direction='column'
			py='10'
			px='10'
			gap='6'
			borderRadius='6'
		>
			<Box>
				<label htmlFor='collateral'>Collateral</label>
				<InputGroup>
					<InputLeftAddon>ETH</InputLeftAddon>
					<Input
						type='number'
						value={collateral}
						onChange={handleChange}
						min='0'
					/>
				</InputGroup>
			</Box>

			<Box>
				{/* Eligible loan */}
				<label htmlFor='loanAmount'>
					Loan Estimate(in LAYs)
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
				onClick={handleClick}
				disabled={
					isEstimateLoading ||
					isEstimateFetching ||
					collateral === (vaultData?.collateralAmount ?? 0).toString()
				}
				variant='solid'
				colorScheme={'orange'}
			>
				Borrow
			</Button>

			<Divider />
		</Flex>
	);
};

export default Borrow;
