const ethers = require("ethers");
const fs = require("fs");
require("dotenv").config();

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  // const encryptedjson = fs.readFileSync("./.encryptkey.json", "utf8");
  // let wallet = new ethers.Wallet.fromEncryptedJsonSync(
  //   encryptedjson,
  //   process.env.PRIVATE_KEY_PASSWORD
  // );

  // wallet = await wallet.connect(provider);

  const abi = fs.readFileSync("./simpleStorage_sol_simpleStorage.abi", "utf8");
  const binary = fs.readFileSync(
    "./simpleStorage_sol_simpleStorage.bin",
    "utf8"
  );

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying, please wait...");
  const contract = await contractFactory.deploy();
  await contract.deployTransaction.wait(1);

  const currentfavnum = await contract.retrieve();
  console.log(`current fav num : ${currentfavnum.toString()}`);

  const transactionresponse = await contract.store("10");
  const txReceipt = await transactionresponse.wait(1);
  const newfavnum = await contract.retrieve();
  console.log(`new favourite number: ${newfavnum}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
