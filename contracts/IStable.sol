// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// LAY is an ERC20 stable coin for demonstration purposes of this project.
// LAY can be burned and minted by liquidators and borrowers.

interface IStable is IERC20 {
    function mint(address _to, uint256 _amount) external returns (bool);

    function burn(address account, uint256 amount) external returns (bool);
}
