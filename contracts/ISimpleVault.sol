// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

interface ISimpleVault {
    struct Vault {
        uint256 debtAmount; // in LAYs
        uint256 collateralAmount; // in ETH
    }

    event Deposit(uint256 collateralDeposited, uint256 amountMinted);
    event Withdraw(uint256 collateralWithdrawn, uint256 amountBurned);

    function borrow(uint256 _collAmount) external payable;

    function deposit(uint256 _amount) external payable;

    function withdraw(uint256 _collAmount) external;

    function getVault(address userAddress) external view returns (Vault memory vault);

    function estimateCollateralAmount(uint256 repaymentAmount)
        external
        view
        returns (uint256 collateralAmount);

    function estimateTokenAmount(uint256 depositAmount) external view returns (uint256 tokenAmount);
}
