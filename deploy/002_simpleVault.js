module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const laysTokenAddr = (await deployments.get("LAYsToken")).address;

  await deploy("SimpleVault", {
    from: deployer,
    args: [laysTokenAddr, "0x0715A7794a1dc8e42615F059dD6e406A6594651A"],
    log: true,
  });
};
module.exports.tags = ["SimpleVault"];
