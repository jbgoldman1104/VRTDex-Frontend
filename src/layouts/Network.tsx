import { PropsWithChildren, useEffect } from "react"
// import { useWallet, WalletStatus } from "@terra-money/wallet-provider"
import { useWallet } from "@sei-js/react"
import { DefaultOptions } from "@apollo/client"
import Loading from "components/Loading"
import { useModal } from "components/Modal"
import UnsupportedNetworkModal from "components/UnsupportedNetworkModal"
import { AVAILABLE_CHAIN_ID_LIST } from "constants/networks"

export const DefaultApolloClientOptions: DefaultOptions = {
  watchQuery: { notifyOnNetworkStatusChange: true },
  query: { errorPolicy: "all" },
}

const Network: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const { connectedWallet, chainId } = useWallet()
  const unsupportedNetworkModal = useModal()
  useEffect(() => {
    const timerId = setTimeout(() => {
      if (connectedWallet && !AVAILABLE_CHAIN_ID_LIST.includes(chainId)) {
        unsupportedNetworkModal.open()
      }
    }, 10)

    return () => {
      clearTimeout(timerId)
    }
  }, [connectedWallet, chainId, unsupportedNetworkModal])

  return (
    <>
      {!unsupportedNetworkModal.isOpen && children}
      <UnsupportedNetworkModal isOpen={unsupportedNetworkModal.isOpen} />
    </>
  )
}

export default Network
