/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-waffle");
const ALCEMY_API_KEY = "QFtZfoNZ45SnHl7Clt7ax0ElAghN8nlu"
const GOERILI_PRIVATE_KEY= "dd14f3a89cc4d828b2d2bf2049ac911adfdba451ab8f5ef7c443cb5c08946946"
module.exports = {
  solidity: "0.8.9",
  networks: {
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/QFtZfoNZ45SnHl7Clt7ax0ElAghN8nlu`,
      accounts:[`${GOERILI_PRIVATE_KEY}`]
    }
  }
};
