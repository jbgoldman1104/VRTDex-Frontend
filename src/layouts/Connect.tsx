import MESSAGE from "../lang/MESSAGE.json"
import Icon from "../components/Icon"
import Connected from "./Connected"
import styles from "./Connect.module.scss"
// import { useAddress, useConnectModal } from "hooks"
import { useWallet, WalletConnectButton } from "@sei-js/react"

const Connect = () => {
  // const connectModal = useConnectModal()
  // const address = useAddress()
  // const icon = <Icon name="account_balance_wallet" size={16} />
  // const handleClick = () => connectModal.open()

  // return !address ? (
  //   <>
  //     <button className={styles.button} onClick={handleClick}>
  //       {icon}
  //       <span className={styles.msg}>{MESSAGE.Wallet.Connect}</span>
  //     </button>
  //   </>
  // ) : (
  //   <Connected className={styles.button} icon={icon} />
  // )

  const { offlineSigner, connectedWallet, accounts } = useWallet()
  return (
    <div>
      {!connectedWallet ? (
        <WalletConnectButton />
      ) : (
        <p>connected to: {accounts[0].address}</p>
      )}
    </div>
  )
}

export default Connect
