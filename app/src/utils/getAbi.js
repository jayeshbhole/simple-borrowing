import { simpleVaultAbi } from '../abi/simpleVaultAbi';
import { laysAbi } from '../abi/LAYsAbi';
const getAbi = (contract) => {
	if (contract === 'vault') {
		return simpleVaultAbi;
	}
	if (contract === 'LAYs') {
		return laysAbi;
	}
};
export default getAbi;
