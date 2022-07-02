const getVaultAddr = (chainId, contract) => {
	if (contract === 'vault') {
		switch (chainId) {
			case '0x89':
				return '0x0';
			case '0x13881':
				return '0x0';
			default:
				return '0x7D59FadDf81c42560D912F46500e24472B9912D4';
		}
	}
	if (contract === 'LAYs') {
		switch (chainId) {
			case '0x89':
				return '0x0';
			case '0x13881':
				return '0x0';
			default:
				return '0x58fE191055b9Cf793aD82B3D1A9ce07eBadf090d';
		}
	}
};
export default getVaultAddr;
