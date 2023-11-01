import { useWallet } from "@sei-js/react"

const useAddress = () => {
  const { connectedWallet, accounts } = useWallet()
  // const connectedWallet = useConnectedWallet()
  return accounts[0]?.address ?? ""
}

export default useAddress
