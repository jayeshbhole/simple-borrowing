const getAddr = (chainId, contract) => {
	if (contract === 'vault') {
		switch (chainId) {
			// rinkeby
			case '0x4':
				return '0x712E6550D1Bc727a6c62D579ca5a7956332a7381';

			case '0x89':
				return '0x0';

			case '0x13881':
				return '0x0';

			default:
				return '0x887b1001872aB54EC7E65Dd6D2BC8926b97EC372';
		}
	}
	if (contract === 'LAYs') {
		switch (chainId) {
			// rinkeby
			case '0x4':
				return '0x3ce62C054C04D9433a28eAe1Be6d794a89e11Ace';

			case '0x89':
				return '0x0';

			case '0x13881':
				return '0x0';

			default:
				return '0x3AdeE00c95c3B7700b0dA4fcdE856617c9472515';
		}
	}
};
export default getAddr;
