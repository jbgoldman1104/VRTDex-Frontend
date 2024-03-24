// import {
//   WalletProvider,
//   WalletControllerChainOptions,
// } from "@terra-money/wallet-provider"
import { PropsWithChildren, useEffect, useState } from "react"
// import { useModal } from "components/Modal"
// import ConnectListModal from "./ConnectListModal"
// import { ConnectModalProvider } from "hooks/useConnectModal"
// import { getChainOptions } from "libs/getChainOptions"

import { SeiWalletProvider } from "@sei-js/react"

const WalletConnectProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const rpcUrl = "https://rpc.sei-apis.com"
  const restUrl = "https://rest.sei-apis.com"
  const chainId = "pacific-1"
  // const rpcUrl = "https://rpc.atlantic-2.seinetwork.io"
  // const restUrl = "https://rest.atlantic-2.seinetwork.io"
  // const chainId = "atlantic-2"

  return (
    //Alternatively you can define your own custom wallet (see Keplr tab)
    <SeiWalletProvider
      chainConfiguration={{ chainId, restUrl, rpcUrl }}
      wallets={["compass", "fin", "keplr", "leap"]}
    >
      {children}
    </SeiWalletProvider>
  )

  // const modal = useModal()

  // const [chainOptions, setChainOptions] =
  //   useState<WalletControllerChainOptions>()

  // useEffect(() => {
  //   getChainOptions().then((chainOptions) => setChainOptions(chainOptions))
  // }, [])

  // return chainOptions ? (
  //   <WalletProvider {...chainOptions}>
  //     <ConnectModalProvider value={modal}>
  //       <ConnectListModal {...modal} isCloseBtn />
  //       {children}
  //     </ConnectModalProvider>
  //   </WalletProvider>
  // ) : (
  //   <></>
  // )
}
export default WalletConnectProvider
