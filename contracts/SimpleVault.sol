// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import "./PriceConsumerV3.sol";
import "./IStable.sol";
import "./ISimpleVault.sol";

contract SimpleVault is PriceConsumerV3, ISimpleVault {}
