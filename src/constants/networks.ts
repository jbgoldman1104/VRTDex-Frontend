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

export const AVAILABLE_CHAIN_ID_LIST = ["pacific-1"]
// export const AVAILABLE_CHAIN_ID_LIST = ["atlantic-2"]

const terraswapNetworks: Record<string, TerraswapNetwork> = {
  "pacific-1": {
    factory: "sei1azv6k99zpynf3s7vts62p4asfppc4se8x0073gz3wagqx4ypr55sn7artn",
    service:
      process.env.REACT_APP_MAINNET_SERVICE_URL || "https://api.terraswap.io/",
    dashboard: process.env.REACT_APP_MAINNET_DASHBOARD_URL,
    router: "sei1sqzzv42479yyjrtjlezxk6u3dmx8qjha44mkqs5tha20g6dxp8cqw0nsjz",
    fee: { gasPrice: "0.1", amount: "1518", gas: "1000000" },
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
