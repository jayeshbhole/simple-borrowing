// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./IStable.sol";

// LAY is an ERC20 stable coin for demonstration purposes of this project.
// LAY can be burned and minted by liquidators and borrowers.

contract LAY is ERC20, Ownable, IStable {
    constructor() ERC20("LAYs", "LAY") {
        _mint(msg.sender, 1000000000 * 10**decimals());
    }

    function mint(address _to, uint256 _amount) external override onlyOwner returns (bool) {
        _mint(_to, _amount);
        return true;
    }

    function burn(address account, uint256 amount) external override onlyOwner returns (bool) {
        _burn(account, amount);
        return true;
    }
}
