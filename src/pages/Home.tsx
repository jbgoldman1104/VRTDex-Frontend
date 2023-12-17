import React, { useState } from "react"
import headerImg from "../images/home/headerImg.png"
import img1 from "../images/home/img1.png"
import img2 from "../images/home/img2.png"
import img3 from "../images/home/img3.png"
import btc from "../images/home/btc.svg"
import ltc from "../images/home/ltc.svg"
import eth from "../images/home/eth.svg"
import graph1 from "../images/home/graphs1.png"
import graph2 from "../images/home/graphs2.png"
import buyBtnImg from "../images/home/buy-coin.png"
import buyBtnHoverImg from "../images/home/buy-coin-hover.png"
import discord from "../images/home/discord.svg"
import twitter from "../images/home/twitter.svg"
import github from "../images/home/github.svg"
import youtube from "../images/home/youtube.svg"

export default function Home() {
  const [buyBtnHover, setBuyBtnHover] = useState(false)
  return (
    <>
      <div className="container flex flex-wrap justify-between items-center px-5 md:px-32 py-10 md:py-16">
        <div className="h-1/2 w-1/2 blur-[270px] rounded-full absolute bg-[#cb479f] -left-1/4 -top-1/4 -z-10"></div>
        <div className="h-full w-1/2 blur-[370px] rounded-full absolute bg-[#cb479f] -right-1/4 -top-1/2 -z-10"></div>
        <div className="md:w-2/5 mb-10 md:mb-0">
          <h1 className="text-6xl font-bold">BUY SELL OR SWAP INSTANTLY</h1>
          <p className="pt-6 text-4xl font-normal">
            Unlock the world of cryptocurrency trading
          </p>
        </div>
        <div className="md:w-2/5 flex justify-center items-center">
          <img
            src={headerImg}
            alt="Header Bitcoin"
            className="object-cover animate-[float_3s_ease-in-out_infinite]"
          />
        </div>
      </div>
      <div className="bg-[linear-gradient(90deg,#cb47a080_0%,#4a46c480_49.48%,#44b8f680_100%)] text-center py-10 px-5 md:px-0 md:py-20 relative">
        <div className="h-screen w-1/2 blur-[370px] rounded-full absolute bg-[#cb479f] -left-1/4 -top-1/4 -z-10"></div>
        <h3 className="text-3xl md:text-5xl font-medium">
          Experience the freedom to trade over{" "}
          <span className="text-sec">250</span> tokens fast!
        </h3>
      </div>
      <div className="container p-10 md:p-32">
        <div className="flex flex-wrap-reverse justify-between items-center mb-16 md:mb-32">
          <div className="md:w-1/2">
            <img src={img1} alt="" />
          </div>
          <div className="md:w-1/3 mb-10 md:mb-0">
            <h5 className="text-4xl md:text-5xl font-bold">
              We are a totally <span className="text-sec">decentralized</span>{" "}
              exchange
            </h5>
            <p className="text-2xl md:text-4xl mt-5 md:mt-10">
              Your keys - Your coins
            </p>
          </div>
        </div>
        <div className="flex flex-wrap justify-between items-center mb-16 md:mb-32">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h5 className="text-4xl md:text-5xl font-bold">
              Own your own <span className="text-sec">crypto</span> , just like
              cash, in your wallet
            </h5>
            <p className="text-2xl md:text-4xl mt-5 md:mt-10 mb-10 md:w-5/6">
              Self custody of your funds, as it should be
            </p>
            <button className="btn">Learn More</button>
          </div>
          <div className="md:w-1/2">
            <img src={img2} alt="" />
          </div>
        </div>
        <div className="flex flex-wrap-reverse justify-between items-center mb-16 md:mb-32">
          <div className="md:w-1/2">
            <img src={img3} alt="" />
          </div>
          <div className="md:w-2/5 mb-10 md:mb-0">
            <h5 className="text-4xl md:text-5xl font-bold">
              <span className="text-sec">MOVE ASSETS</span> ACROSS NETWORKS IN
              SECONDS !
            </h5>
          </div>
        </div>
      </div>
      <div className="container px-5 md:px-32 mb-24 md:mb-44">
        <div className="relative">
          <div className="h-[50vh] w-1/2 blur-[370px] rounded-full absolute bg-[#cb479f] -left-1/2 -top-2/3 -z-10"></div>
          <h3 className="text-3xl md:text-5xl text-center font-bold mb-16">
            We will always find you the{" "}
            <span className="text-sec">best rate</span>, <br />{" "}
            <span className="text-[#b2b0bb] text-2xl md:text-4xl">
              no matter which network you are on
            </span>{" "}
            <br /> at <span className="text-sec">no additional cost</span> to
            you
          </h3>
          <div className="h-[50vh] w-1/2 blur-[370px] rounded-full absolute bg-[#00FF85] -right-1/2 -top-2/3 -z-10"></div>
        </div>
        <div className="flex flex-wrap justify-center md:justify-between items-start space-y-10 md:space-y-0">
          <div className="border1-section3 group duration-300">
            <div className="flex items-center mb-7 px-8 pt-8">
              <img src={btc} alt="" />
              <p className="font-[Roboto] ml-5">
                <span className="text-white font-bold font-[Roboto]">BTC</span>{" "}
                (Bitcoin)
              </p>
            </div>
            <p className="text-xl text-white font-[Roboto] font-semibold mb-2 px-8">
              $20.000
            </p>
            <div className="flex items-center mb-7 px-8">
              <p className="text-[#ff52f1] font-[Roboto] mr-3">(-7.25%)</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="13"
                viewBox="0 0 13 13"
                fill="none"
              >
                <path
                  id="Vector"
                  d="M8.607 10.021L-3.8147e-06 1.414L1.414 -3.8147e-06L10.021 8.607V1.021H12.021V12.021H1.021V10.021H8.607Z"
                  fill="#FF52F1"
                />
              </svg>
            </div>
            <img
              src={graph1}
              width={240}
              className="mx-8 mb-8 group-hover:mb-0 duration-300"
              alt=""
            />
            <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] duration-300">
              <div className="overflow-hidden">
                <img
                  src={buyBtnHover ? buyBtnHoverImg : buyBtnImg}
                  className="float-right cursor-pointer"
                  alt=""
                  onMouseOver={() => setBuyBtnHover(true)}
                  onMouseOut={() => setBuyBtnHover(false)}
                />
              </div>
            </div>
          </div>
          <div className="border1-section3 group duration-300">
            <div className="flex items-center mb-7 px-8 pt-8">
              <img src={ltc} alt="" />
              <p className="font-[Roboto] ml-5">
                <span className="text-white font-bold font-[Roboto]">LTC</span>{" "}
                (Litecoin)
              </p>
            </div>
            <p className="text-xl text-white font-[Roboto] font-semibold mb-2 px-8">
              $2.100
            </p>
            <div className="flex items-center mb-7 px-8">
              <p className="text-[#15D465] font-[Roboto] mr-3">(+15.25%)</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="13"
                viewBox="0 0 13 13"
                fill="none"
              >
                <path
                  id="buyBtn"
                  d="M8.607 2L-3.8147e-06 10.607L1.414 12.021L10.021 3.414V11H12.021V0H1.021V2H8.607Z"
                  fill="#15D465"
                />
              </svg>
            </div>
            <img
              src={graph2}
              width={240}
              className="mx-8 mb-8 group-hover:mb-0 duration-300"
              alt=""
            />
            <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] duration-300">
              <div className="overflow-hidden">
                <img
                  src={buyBtnHover ? buyBtnHoverImg : buyBtnImg}
                  className="float-right cursor-pointer"
                  alt=""
                  onMouseOver={() => setBuyBtnHover(true)}
                  onMouseOut={() => setBuyBtnHover(false)}
                />
              </div>
            </div>
          </div>
          <div className="border2-section3 group duration-300">
            <div className="flex items-center mb-7 px-8 pt-8">
              <img src={eth} alt="" />
              <p className="font-[Roboto] ml-5">
                <span className="text-white font-bold font-[Roboto]">ETH</span>{" "}
                (Ethereum)
              </p>
            </div>
            <p className="text-xl text-white font-[Roboto] font-semibold mb-2 px-8">
              $5.124
            </p>
            <div className="flex items-center mb-7 px-8">
              <p className="text-[#15D465] font-[Roboto] mr-3">(+12.25%)</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="13"
                viewBox="0 0 13 13"
                fill="none"
              >
                <path
                  id="buyBtn"
                  d="M8.607 2L-3.8147e-06 10.607L1.414 12.021L10.021 3.414V11H12.021V0H1.021V2H8.607Z"
                  fill="#15D465"
                />
              </svg>
            </div>
            <img
              src={graph2}
              width={240}
              className="mx-8 mb-8 group-hover:mb-0 duration-300"
              alt=""
            />
            <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] duration-300">
              <div className="overflow-hidden">
                <img
                  src={buyBtnHover ? buyBtnHoverImg : buyBtnImg}
                  className="float-right cursor-pointer"
                  alt=""
                  onMouseOver={() => setBuyBtnHover(true)}
                  onMouseOut={() => setBuyBtnHover(false)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[linear-gradient(90deg,#cb47a080_0%,#4a46c480_49.48%,#44b8f680_100%)] text-center py-11 relative">
        <div className="h-full w-1/2 blur-[370px] rounded-full absolute bg-[#00FF85] left-1/2 -translate-x-1/2 -top-2/3 -z-10"></div>
        <h3 className="text-3xl md:text-5xl font-medium">Community</h3>
        <div className="flex flex-col md:flex-row items-center justify-center mt-7 space-y-5 md:space-y-0 md:space-x-24">
          <div className="flex items-center">
            <img src={discord} alt="" />
            <p className="text-2xl text-white">&nbsp;Discord</p>
          </div>
          <div className="flex items-center">
            <img src={twitter} alt="" />
            <p className="text-2xl text-white">&nbsp;Twitter</p>
          </div>
          <div className="flex items-center">
            <img src={github} alt="" />
            <p className="text-2xl text-white">&nbsp;GitHub</p>
          </div>
          <div className="flex items-center">
            <img src={youtube} alt="" />
            <p className="text-2xl text-white">&nbsp;YouTube</p>
          </div>
        </div>
      </div>
      <div className="container flex justify-between items-center px-5 md:px-0 mt-16 md:mt-32 mb-7 md:mb-14">
        <p className="font-[Urbanist] text-[#acadac]">© 2023, Crypto</p>
        <p className="font-[Urbanist] text-[#acadac]">All rights reserved</p>
      </div>
    </>
  )
}
