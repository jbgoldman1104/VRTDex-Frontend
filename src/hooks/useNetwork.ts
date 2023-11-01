// import { useWallet } from "@terra-money/wallet-provider"
import { useWallet } from "@sei-js/react"
import { FINDER } from "constants/constants"
import terraswapNetworks from "constants/networks"

const useNetwork = () => {
  const { chainId, restUrl, rpcUrl } = useWallet()
  const name = "testnet"
  const getFinderUrl = (address: string, path: string = "accounts") =>
    `${FINDER}/${chainId}/${path}/${address}`

  return {
    ...terraswapNetworks[name],
    restUrl,
    rpcUrl,
    lcd: restUrl,
    name,
    chainID: chainId,
    getFinderUrl,
  }
}

export default useNetwork
