import {
	Box,
	Flex,
	Input,
	InputGroup,
	InputLeftAddon,
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	Slider,
	SliderFilledTrack,
	SliderMark,
	SliderThumb,
	SliderTrack,
} from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import {
	useChain,
	useMoralis,
	useNativeBalance,
	useWeb3ExecuteFunction,
} from 'react-moralis';
import { simpleVaultAbi } from '../abi/simpleVaultAbi';
import getVaultAddr from '../utils/getAddr';

const Borrow = () => {
	const { chain } = useChain();
	const {
		account,
		Moralis,
		Moralis: { Units, web3 },
	} = useMoralis();
	const BigNumber = Moralis.web3Library.BigNumber;
	const nativeBalance = useMemo(
		async () => (account ? (await web3.getBalance(account)).toString() : '0'),
		[account]
	);

	const [collateral, setCollateral] = useState('0');
	// const [sliderPercent, setSliderPercent] = useState(0);
	const handleChange = (value = 0) => {
		setCollateral(value.toString());
		// set slider percent
		// setSliderPercent(
		// 	BigNumber.from(Units.ETH(value))
		// 		.div(BigNumber.from(nativeBalance))
		// 		.mul(100)
		// 		.toString()
		// );
	};
	// const handleSliderChange = (percent = 0) => {
	// 	// setSliderPercent(percent);
	// 	setCollateral(BigNumber.from(nativeBalance).mul(percent / 100));
	// };

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
		{
			autoFetch: false,
		}
	);
	useEffect(() => {
		fetchVault();
	}, []);
	useEffect(() => {
		if (vaultData?.collateral)
			setCollateral(vaultData.collateralAmount.toString());
	}, [vaultData]);

	return (
		<Flex maxW='60ch' alignSelf={'center'} direction='column' py='10' gap='6'>
			<>
				{/* Number Input */}
				<label htmlFor='collateral'>Collateral Amount</label>
				<NumberInput w='100%' value={collateral} onChange={handleChange}>
					<NumberInputField />
					<NumberInputStepper>
						<NumberIncrementStepper />
						<NumberDecrementStepper />
					</NumberInputStepper>
				</NumberInput>
				{/* <Slider
					flex='1'
					focusThumbOnChange={false}
					value={sliderPercent}
					onChange={handleSliderChange}
				>
					<SliderMark value={25} {...labelStyles}>
						25%
					</SliderMark>
					<SliderMark value={50} {...labelStyles}>
						50%
					</SliderMark>
					<SliderMark value={75} {...labelStyles}>
						75%
					</SliderMark>
					<SliderTrack>
						<SliderFilledTrack />
					</SliderTrack>
					<SliderThumb fontSize='sm' boxSize='32px' />
				</Slider> */}
			</>

			{/* Eligible loan */}
			<InputGroup>
				<InputLeftAddon>$</InputLeftAddon>
				<Input
					type='number'
					placeholder='ETH AMount'
					onChange={() => {}}
					value={'0'}
				/>
			</InputGroup>
		</Flex>
	);
};

const labelStyles = {
	mt: '2',
	ml: '-2.5',
	fontSize: 'sm',
};

export default Borrow;
