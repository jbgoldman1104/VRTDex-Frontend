import { ConnectType, useWallet } from "@terra-money/wallet-provider"

import { ReactNode } from "react"
import styles from "./ConnectList.module.scss"
import { useConnectModal } from "hooks"
import SupportModal from "./SupportModal"
import { useModal } from "components/Modal"
import classNames from "classnames"

declare global {
  interface Window {
    xfi: {
      terra: any
    }
  }
}

const size = { width: 30, height: "auto" }
type Button = {
  label: string
  image: ReactNode
  onClick: () => void
  isInstalled?: boolean
}

const denyWalletList = ["C2X Station Wallet"]

const ConnectList = () => {
  const { availableConnections, availableInstallations, connect } = useWallet()
  const connectModal = useConnectModal()
  const supportModal = useModal()

  const handleConnectClick = (type: ConnectType, identifier?: string) => {
    connect(type, identifier)
    connectModal.close()
  }

  const buttons: Button[] = [
    ...availableConnections
      .filter(({ type }) => type !== ConnectType.READONLY)
      .filter(({ name }) => !denyWalletList.includes(name))
      .map(({ type, icon, name, identifier }) => ({
        label: name,
        image: (
          <img
            src={icon.replace("assets.terra.money", "assets.terra.dev")}
            {...size}
            alt={name}
          />
        ),
        isInstalled: true,
        onClick: () => {
          handleConnectClick(type, identifier)
        },
      })),
    ...availableInstallations
      .filter(({ type }) => type !== ConnectType.READONLY)
      .filter(({ name }) => !denyWalletList.includes(name))
      .map(({ icon, name, url }) => ({
        label: "Install " + name,
        image: (
          <img
            src={icon.replace("assets.terra.money", "assets.terra.dev")}
            {...size}
            alt={name}
          />
        ),
        onClick: () => {
          supportModal.setInfo(url, name)
          supportModal.open()
        },
      })),
  ]

  return (
    <article className={styles.component}>
      <SupportModal {...supportModal} />
      <section>
        {Object.entries(buttons).map(
          ([key, { label, image, isInstalled, onClick }]) => (
            <button
              className={classNames(
                styles.button,
                isInstalled && styles["button--installed"]
              )}
              onClick={onClick}
              key={key}
            >
              {image}
              &nbsp;&nbsp;
              {label}
            </button>
          )
        )}
      </section>
    </article>
  )
}

export default ConnectList
