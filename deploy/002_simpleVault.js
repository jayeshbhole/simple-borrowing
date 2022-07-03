module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const laysToken = await deployments.get("LAYsToken");
  const laysTokenAddr = laysToken.address;

  await deploy("SimpleVault", {
    from: deployer,
    // args: [laysTokenAddr, "0x0715A7794a1dc8e42615F059dD6e406A6594651A"], // polygon mumbai
    args: [laysTokenAddr, "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e"], //rinkeby
    log: true,
  });

  // change ownership of LAYs token to SimpleVault
  const simpleVaultAddr = (await deployments.get("SimpleVault")).address;

  const laysTokenContract = await ethers.getContract("LAYsToken", deployer);
  await laysTokenContract.transferOwnership(simpleVaultAddr);
};
module.exports.tags = ["SimpleVault"];
