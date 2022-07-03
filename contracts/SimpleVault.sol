// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import "./PriceConsumerV3.sol";
import "./IStable.sol";
import "./ISimpleVault.sol";
import "hardhat/console.sol";

contract SimpleVault is PriceConsumerV3, ISimpleVault {
    IStable stableCoin;
    // collateralisation ratio
    uint256 collRatio = 100;

    // store the account information of each user
    mapping(address => Vault) vaults;

    constructor(IStable _stableCoin, address _priceFeed) PriceConsumerV3(_priceFeed) {
        stableCoin = _stableCoin;
    }

    /**
    @notice Mints the stable coin to the borrower for supplied collateral.
    @param _collAmount The amount of collateral to be borrowed against.
     */
    function borrow(uint256 _collAmount) public payable override {
        require(_collAmount == msg.value);

        // calculate amount of LAY to be minted
        uint256 borrowAmount = estimateTokenAmount(_collAmount);

        // mint LAY to borrowers account
        stableCoin.mint(msg.sender, borrowAmount);

        vaults[msg.sender].collateralAmount += _collAmount;
        vaults[msg.sender].debtAmount += borrowAmount;

        emit Deposit(_collAmount, borrowAmount);
    }

    function deposit(uint256 _amount) public payable override {
        borrow(_amount);
    }

    /**
    @notice Withdraws the collateral worth the amount of LAYs borrowed.
    @param _collAmount The amount of collateral to be withdrawn.
     */
    function withdraw(uint256 _collAmount) public override {
        require(_collAmount <= vaults[msg.sender].debtAmount, "withdraw limit exceeded");
        require(stableCoin.balanceOf(msg.sender) >= _collAmount, "not enough LAYs");

        uint256 amountToWithdraw = (_collAmount / getEthUSDPrice()) * (10**18);
        stableCoin.burn(msg.sender, _collAmount);

        vaults[msg.sender].collateralAmount -= amountToWithdraw;
        vaults[msg.sender].debtAmount -= _collAmount;

        payable(msg.sender).transfer(amountToWithdraw);

        emit Withdraw(amountToWithdraw, _collAmount);
    }

    /**
    @notice Returns the details of a vault
    @param _address  the address of the vault owner
    @return vault the vault details for account
     */
    function getVault(address _address) external view override returns (Vault memory vault) {
        return vaults[_address];
    }

    /**
    @notice Returns estimate of collateral amount that can be withdrawn for a given amount of stablecoin
    @param _stableCoinAmount  the amount of stable coin that would be repaid
    @return collateralAmount the estimated amount of a vault's collateral that would be returned 
     */
    function estimateCollateralAmount(uint256 _stableCoinAmount)
        external
        view
        override
        returns (uint256 collateralAmount)
    {
        return ((_stableCoinAmount * (10**18)) / getEthUSDPrice());
    }

    /**
    @notice Returns an estimate on how much stable coin could be minted at the current rate
    @param _depositAmount the amount of ETH that would be deposited
    @return tokenAmount  the estimated amount of stablecoin that would be minted
     */
    function estimateTokenAmount(uint256 _depositAmount)
        public
        view
        override
        returns (uint256 tokenAmount)
    {
        uint256 tokens = (_depositAmount * getEthUSDPrice()) / (10**18);
        return tokens;
    }

    // convert ETH/USD price from 8 decimals to 18
    function getEthUSDPrice() public view returns (uint256) {
        uint price8 = uint(getLatestPrice());
        return price8 * (10**10);
    }
}
