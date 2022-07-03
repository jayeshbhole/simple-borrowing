const { expectEvent } = require("@openzeppelin/test-helpers");
const { expect, assert } = require("chai");
const { ethers, waffle, deployments } = require("hardhat");
const { constants } = ethers;

describe("Simple Borrower", () => {
  let LAYsToken, SimpleVault, deployer, updatedTokenBalance, receipt;

  before(async () => {
    const { deployer: _deployer } = await getNamedAccounts();
    deployer = _deployer;

    await deployments.fixture(["LAYsToken", "SimpleVault"]);
    // LAYsToken = await deployments.get("LAYsToken");
    LAYsToken = await ethers.getContract("LAYsToken", deployer);
    console.log(LAYsToken.address);

    // SimpleVault = await deployments.get("SimpleVault");
    SimpleVault = await ethers.getContract("SimpleVault", deployer);
    console.log(SimpleVault.address);

    // await LAYsToken.transferOwnership(SimpleVault.address);

    await LAYsToken.balanceOf(deployer);
  });

  context("Use Case 1: user deposits ether and receives stablecoin ", () => {
    // borrow against 1 ether before every test
    before(async () => {
      depositTx = await SimpleVault.deposit(constants.WeiPerEther.toString(), {
        value: constants.WeiPerEther.toString(),
      });
      receipt = await depositTx.wait();

      updatedTokenBalance = await LAYsToken.balanceOf(deployer);
    });

    it("should update user Vault collateral with sent Ether", async () => {
      let userVault = await SimpleVault.getVault(deployer);
      assert.equal(
        constants.WeiPerEther.toString(),
        userVault.collateralAmount.toString(),
        "user collateral amount does not match sent ether"
      );
    });

    // it("should fire a 'Deposit' event", () => {
    //   expectEvent(receipt, "Deposit");
    // });

    it("should update user token balance", async () => {
      let ethPrice = await SimpleVault.getEthUSDPrice();

      let expectedTokenBalance = ethers.BigNumber.from(constants.WeiPerEther.toString())
        .mul(ethPrice)
        .div(constants.WeiPerEther);

      assert.equal(
        updatedTokenBalance.toString(),
        expectedTokenBalance.toString(),
        "user Token balance not updated with right amount"
      );
    });

    it("should update user Vault debt", async () => {
      let userVault = await SimpleVault.getVault(deployer);
      assert.equal(
        updatedTokenBalance.toString(),
        userVault.debtAmount.toString(),
        "user Vault debt not updated with right amount"
      );
    });
  });

  context("Use Case 2: user repays ALL tokens and withdraws ether ", () => {
    before(async () => {
      withdrawTx = await SimpleVault.withdraw(updatedTokenBalance.toString());
      receipt = await withdrawTx.wait();

      deployerSigner = await ethers.getSigner(deployer);

      finalEthBalance = await deployerSigner.getBalance();

      finalTokenBalance = await LAYsToken.balanceOf(deployer);
    });

    // it("should fire a 'Withdraw' event", async () => {
    //   expectEvent(receipt, "Withdraw");
    // });

    it("user token balance should be zero", async () => {
      assert.equal(
        finalTokenBalance.toString(),
        "0",
        "user Token balance should be zero after repayment"
      );
    });

    it("user vault debt should be zero", async () => {
      let userVault = await SimpleVault.getVault(deployer);
      assert.equal(
        "0",
        userVault.debtAmount.toString(),
        "user Vault debt is not zero after repayment"
      );
    });
  });
});
