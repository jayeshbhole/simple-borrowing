import { useMoralis } from 'react-moralis';

const useNumConversions = () => {
	const { Moralis } = useMoralis();

	const fromWei = (number = 0, decimals = 18, fixedPlaces = 0) => {
		if (fixedPlaces)
			return Number(Moralis.Units.FromWei(number, decimals)).toFixed(
				fixedPlaces
			);
		return Number(Moralis.Units.FromWei(number, decimals));
	};

	const flowInSeconds = (flowInMonth = '0') => {
		return Moralis.web3Library.BigNumber.from(
			Moralis.Units.ETH(flowInMonth)
		).div(30 * 86400);
	};

	const flowInMonth = (flowInSeconds = '0') => {
		return Number(
			Moralis.Units.FromWei(
				Moralis.web3Library.BigNumber.from(flowInSeconds)
					.mul(30 * 86400)
					.toString()
			)
		);
	};

	const weiToFixed = (bigNum) => {
		return bigNum.toFixed(2);
	};

	return { fromWei, flowInSeconds };
};
