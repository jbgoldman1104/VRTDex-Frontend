import { useEffect, useState } from "react"
import styles from "./Header.module.scss"
import { NavLink } from "react-router-dom"
import fullLogo from "../images/home/fullLogo.png"

import { useWallet, WalletConnectButton } from "@sei-js/react"

const Header = () => {
  const { offlineSigner, connectedWallet, accounts } = useWallet()

  const [isScrolled, setIsScrolled] = useState(false)
  useEffect(() => {
    let timerId: any
    const showConnectButtonAfter1Sec = () => {
      if (timerId) {
        clearTimeout(timerId)
      }

      timerId = setTimeout(() => {
        setIsScrolled(false)
      }, 875)
    }
    const handleWheel = () => {
      setIsScrolled(true)
      showConnectButtonAfter1Sec()
    }

    window.addEventListener("wheel", handleWheel)
    window.addEventListener("touchmove", handleWheel)
    return () => {
      window.removeEventListener("wheel", handleWheel)
      window.removeEventListener("touchmove", handleWheel)
    }
  }, [])

  useEffect(() => {
    if (isScrolled) {
      document.body.classList.add("scrolled", styles.scrolled)
      return
    }
    document.body.classList.remove("scrolled", styles.scrolled)
  }, [isScrolled])

  const [offCanvas, setOffCanvas] = useState(false)

  const openOffCanvas = () => {
    setOffCanvas(true)
  }

  const closeOffCanvas = () => {
    setOffCanvas(false)
  }

  const convertWalletAddress = (address: string) => {
    if (address && address.length >= 11)
      return (
        address.substring(0, 7) + "..." + address.substring(address.length - 4)
      )
    return address
  }

  return (
    <nav
      className={`flex justify-center items-center bg-secondary p-3 py-10 mb-10 md:px-10 lg:px-16`}
    >
      <div className="container flex justify-between items-center">
        <NavLink to="/">
          <img src={fullLogo} alt="Toolicles Full Logo" className="w-48" />
        </NavLink>
        <div
          className={`fixed lg:static duration-300 min-w-auto lg:w-auto top-0 h-screen lg:h-auto bg-body lg:bg-transparent z-50 ${
            offCanvas ? "left-0" : "-left-80"
          }`}
        >
          <div className="flex justify-between items-center mb-3 p-5 lg:hidden">
            <img src={fullLogo} alt="Toolicles Full Logo" className="w-28" />
            <i className="fa-solid fa-xmark w-4" onClick={closeOffCanvas} />
          </div>
          <button className="btn mx-5 lg:m-0 inline-block lg:inline">
            {connectedWallet ? (
              convertWalletAddress(accounts[0].address)
            ) : (
              <WalletConnectButton />
            )}
          </button>
        </div>
        <i
          onClick={openOffCanvas}
          className="fa-solid fa-bars mr-3 text-xl lg:hidden"
        />
      </div>
      <div
        className={`fixed top-0 left-0 h-screen w-screen duration-500 bg-black z-40 ${
          offCanvas ? "opacity-50" : "opacity-0 invisible"
        }`}
        onClick={closeOffCanvas}
      ></div>
    </nav>
  )
}

export default Header
