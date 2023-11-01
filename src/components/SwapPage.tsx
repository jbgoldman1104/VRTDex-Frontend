// import { NetworkInfo, useWallet } from "@terra-money/wallet-provider"
import { useWallet, WalletConnectButton } from "@sei-js/react"
import {
  FC,
  PropsWithChildren,
  ReactNode,
  useLayoutEffect,
  useRef,
} from "react"
import { useSearchParams } from "react-router-dom"
import Container from "./Container"
import styles from "./SwapPage.module.scss"

interface Props {
  title?: ReactNode
  description?: ReactNode
  sm?: boolean
}

const Page: FC<PropsWithChildren<Props>> = ({
  title,
  description,
  children,
  ...props
}) => {
  const { sm } = props
  const { offlineSigner, connectedWallet, accounts, chainId } = useWallet()
  const lastNetworkChainId = useRef<string>()
  // const lastNetworkRef = useRef<NetworkInfo>()
  // const { network } = useWallet()
  const [searchParams, setSearchParams] = useSearchParams()

  useLayoutEffect(() => {
    const timerId = setTimeout(() => {
      if (
        chainId &&
        lastNetworkChainId.current !== chainId &&
        window.location.pathname.includes("/swap") &&
        searchParams &&
        setSearchParams
      ) {
        searchParams.set("from", "")
        searchParams.set("to", "")
        setSearchParams(searchParams, { replace: true })
      }
      lastNetworkChainId.current = chainId
    }, 10)

    return () => {
      clearTimeout(timerId)
    }
    // #112: Do not add searchParams, setSearchParams to deps for performance reasons.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectedWallet, chainId])

  return (
    <article className={styles.article}>
      {sm ? <Container sm>{children}</Container> : children}
    </article>
  )
}

export default Page
