import React, { useState } from "react"
import { NavLink, Link } from "react-router-dom"
import fullLogo from "../images/home/fullLogo.png"

export default function Navbar() {
  const [offCanvas, setOffCanvas] = useState(false)

  const openOffCanvas = () => {
    setOffCanvas(true)
  }

  const closeOffCanvas = () => {
    setOffCanvas(false)
  }

  return (
    <nav
      className={`flex justify-center items-center bg-secondary p-3 py-4 md:px-10 lg:px-16`}
    >
      <div className="container flex justify-between items-center">
        <NavLink to="/">
          <img src={fullLogo} alt="Toolicles Full Logo" className="w-48" />
        </NavLink>
        <div
          className={`fixed lg:static duration-300 min-w-[300px] lg:w-auto top-0 h-screen lg:h-auto bg-body lg:bg-transparent z-50 ${
            offCanvas ? "left-0" : "-left-80"
          }`}
        >
          <div className="flex justify-between items-center mb-3 p-5 lg:hidden">
            <img src={fullLogo} alt="Toolicles Full Logo" className="w-28" />
            <i className="fa-solid fa-xmark w-4" onClick={closeOffCanvas} />
          </div>
          <ul className="nav-links flex flex-col lg:flex-row lg:space-x-10">
            <li>
              <NavLink
                to="/"
                className={`px-5 py-3 lg:p-0 flex items-center relative hover:lg:text-white`}
                onClick={() =>
                  window.open("https://nft-marketplace.vrtoken.com/", "_blank")
                }
              >
                NFT Marketplace
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                className={`px-5 py-3 lg:p-0 flex items-center relative hover:lg:text-white active`}
                onClick={() => window.open("/whitepaper.pdf", "_blank")}
              >
                Whitepaper
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                className={`px-5 py-3 lg:p-0 flex items-center relative hover:lg:text-white`}
                onClick={closeOffCanvas}
              >
                Airdrop
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                className={`px-5 py-3 lg:p-0 flex items-center relative hover:lg:text-white`}
                onClick={closeOffCanvas}
              >
                Ai Bot
              </NavLink>
            </li>
            <li>
              {/* <NavLink
                to="/"
                className={`px-5 py-3 lg:p-0 flex items-center relative hover:lg:text-white`}
                onClick={closeOffCanvas}
              > */}
              <a
                href="mailto:support@vrtoken.com"
                style={{ color: "white" }}
                className="px-5 py-3 lg:p-0 flex items-center relative hover:lg:text-white"
              >
                Contact
              </a>
              {/* Contact */}
              {/* </NavLink> */}
            </li>
            <li>
              <Link
                to="/swap"
                className={`btn mx-5 my-3 lg:m-0 inline-block lg:inline`}
                onClick={closeOffCanvas}
              >
                Launch App
              </Link>
            </li>
          </ul>
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
