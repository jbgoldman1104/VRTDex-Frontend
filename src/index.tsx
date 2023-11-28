import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
// import "./index.scss"
import "./index.css"
// import ScrollToTop from "./layouts/ScrollToTop"
// import Network from "./layouts/Network"
// import App from "./layouts/App"
// import WalletConnectProvider from "./layouts/WalletConnectProvider"
import Home from "pages/Home"
import Layout from "pages/Layout"
import Previous from "pages/Previous"
import "./App.css"
import reportWebVitals from "reportWebVitals"
const container = document.getElementById("root")
const root = createRoot(container!)
root.render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="*" element={<Previous />}></Route>
      </Routes>
      {/* <WalletConnectProvider>
        <Network>
          <ScrollToTop />
          <App />
        </Network>
      </WalletConnectProvider> */}
    </Router>
  </StrictMode>
)
reportWebVitals()
