import App from "layouts/App"
import Network from "layouts/Network"
import ScrollToTop from "layouts/ScrollToTop"
import WalletConnectProvider from "layouts/WalletConnectProvider"

const Previous = () => {
  return (
    <WalletConnectProvider>
      <Network>
        <ScrollToTop />
        <App />
      </Network>
    </WalletConnectProvider>
  )
}

export default Previous
