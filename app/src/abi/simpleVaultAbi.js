export const simpleVaultAbi = [
	{
		inputs: [
			{
				internalType: 'contract IStable',
				name: '_stableCoin',
				type: 'address',
			},
			{
				internalType: 'address',
				name: '_priceFeed',
				type: 'address',
			},
		],
		stateMutability: 'nonpayable',
		type: 'constructor',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'uint256',
				name: 'collateralDeposited',
				type: 'uint256',
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'amountMinted',
				type: 'uint256',
			},
		],
		name: 'Deposit',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'uint256',
				name: 'collateralWithdrawn',
				type: 'uint256',
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'amountBurned',
				type: 'uint256',
			},
		],
		name: 'Withdraw',
		type: 'event',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '_collAmount',
				type: 'uint256',
			},
		],
		name: 'borrow',
		outputs: [],
		stateMutability: 'payable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '_amount',
				type: 'uint256',
			},
		],
		name: 'deposit',
		outputs: [],
		stateMutability: 'payable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '_stableCoinAmount',
				type: 'uint256',
			},
		],
		name: 'estimateCollateralAmount',
		outputs: [
			{
				internalType: 'uint256',
				name: 'collateralAmount',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '_depositAmount',
				type: 'uint256',
			},
		],
		name: 'estimateTokenAmount',
		outputs: [
			{
				internalType: 'uint256',
				name: 'tokenAmount',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'getEthUSDPrice',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'getLatestPrice',
		outputs: [
			{
				internalType: 'int256',
				name: '',
				type: 'int256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_address',
				type: 'address',
			},
		],
		name: 'getVault',
		outputs: [
			{
				components: [
					{
						internalType: 'uint256',
						name: 'debtAmount',
						type: 'uint256',
					},
					{
						internalType: 'uint256',
						name: 'collateralAmount',
						type: 'uint256',
					},
				],
				internalType: 'struct ISimpleVault.Vault',
				name: 'vault',
				type: 'tuple',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '_collAmount',
				type: 'uint256',
			},
		],
		name: 'withdraw',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
];
