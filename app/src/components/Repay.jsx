import {
	Box,
	Button,
	Divider,
	Flex,
	Input,
	InputGroup,
	InputLeftAddon,
	useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useChain, useMoralis, useWeb3ExecuteFunction } from 'react-moralis';
import { simpleVaultAbi } from '../abi/simpleVaultAbi';
import getAbi from '../utils/getAbi';
import getAddr from '../utils/getAddr';

const Repay = ({ fetchLaysBalance }) => {
	const { chain } = useChain();
	const {
		isWeb3Enabled,
		account,
		Moralis,
		Moralis: { Units, web3 },
	} = useMoralis();
	const BigNumber = Moralis.web3Library.BigNumber;

	const [tokenAmount, setTokenAmount] = useState('0');
	const handleChange = (e) => {
		setTokenAmount(Number((e.target.value || '0').toString()));
	};
	// estimate estimateCollateralAmount
	const {
		data: estimatedCollateralAmount,
		isLoading: isEstimateLoading,
		isFetching: isEstimateFetching,
		error,
	} = useWeb3ExecuteFunction(
		{
			functionName: 'estimateCollateralAmount',
			abi: simpleVaultAbi,
			contractAddress: getAddr(chain?.chainId, 'vault'),
			params: {
				_stableCoinAmount: Units.ETH(tokenAmount ?? '0'),
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
		setTokenAmount(
			Units.FromWei(vaultData?.collateralAmount.toString() ?? '0')
		);
	}, [vaultData]);

	const toast = useToast();
	// withdraw/repay
	const { fetch: withdraw } = useWeb3ExecuteFunction(
		{
			functionName: 'withdraw',
			abi: getAbi('vault'),
			contractAddress: getAddr(chain?.chainId, 'vault'),
			params: {
				_collAmount: Units.ETH(tokenAmount ?? '0'),
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

		withdraw({
			onSuccess: () => {
				toast({
					...toastOptions,
					title: 'Repayed Loan',
					description: 'Your collateral has been withdrawn. ',
				});
				fetchLaysBalance();
			},
			onError: (err) => {
				toast({
					...toastOptions,
					title: 'Error',
					status: 'error',
					description: err.message,
				});
			},
			params: {
				_collAmount: Units.ETH(tokenAmount ?? '0'),
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
				<label htmlFor='collateral'>Repay Amount</label>
				<InputGroup>
					<InputLeftAddon>LAYs</InputLeftAddon>
					<Input
						type='number'
						value={tokenAmount}
						onChange={handleChange}
						min='0'
					/>
				</InputGroup>
			</Box>

			<Box>
				{/* Eligible loan */}
				<label htmlFor='loanAmount'>
					Collateral Estimate
					<InputGroup>
						<InputLeftAddon>$</InputLeftAddon>
						<Input
							type='number'
							placeholder='ETH AMount'
							onChange={() => {}}
							value={Units.FromWei(estimatedCollateralAmount ?? '0')}
						/>
					</InputGroup>
				</label>
			</Box>

			<Button
				onClick={handleClick}
				disabled={
					isEstimateLoading ||
					isEstimateFetching ||
					tokenAmount === (vaultData?.debtAmount ?? 0).toString()
				}
				variant='solid'
				colorScheme={'green'}
			>
				Repay
			</Button>

			<Divider />
		</Flex>
	);
};

export default Repay;
