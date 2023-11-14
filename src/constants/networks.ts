export enum NetworkKey {
  MAINNET = "mainnet",
  TESTNET = "testnet",
}

interface TerraswapNetwork {
  factory: string
  service: string
  dashboard: string | undefined
  router: string
  fee: {
    gasPrice: string
    amount: string
    gas: string
  }
}

export const AVAILABLE_CHAIN_ID_LIST = ["atlantic-2"]

const terraswapNetworks: Record<string, TerraswapNetwork> = {
  "pacific-1": {
    factory: "terra1466nf3zuxpya8q9emxukd7vftaf6h4psr0a07srl5zw74zh84yjqxl5qul",
    service:
      process.env.REACT_APP_MAINNET_SERVICE_URL || "https://api.terraswap.io/",
    dashboard: process.env.REACT_APP_MAINNET_DASHBOARD_URL,
    router: "terra13ehuhysn5mqjeaheeuew2gjs785f6k7jm8vfsqg3jhtpkwppcmzqcu7chk",
    fee: { gasPrice: "0.15", amount: "1518", gas: "500000" },
  },
  "atlantic-2": {
    factory: "sei183x2m85wzczclrl5940lscylsufjr7gd346kt6gyes8wzt7p80cqjpmxh7",
    service:
      process.env.REACT_APP_TESTNET_SERVICE_URL || "http://test-atlantic.com",
    dashboard:
      process.env.REACT_APP_TESTNET_DASHBOARD_URL || "http://test-atlantic.com",
    router: "sei1fxp2r5v0xfd79tktjc04rp9punx58wxps9dww2razsm5egad9jssx2zq4t",
    fee: { gasPrice: "0.1", amount: "1518", gas: "1000000" },
  },
}

export default terraswapNetworks
