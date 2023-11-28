import styled from "styled-components"
// import styles from "./Footer.module.scss"

// import SocialMediaAnchor from "components/SocialMediaAnchor"
// import { socialMediaList } from "constants/constants"
// import ChangeVersionButton from "components/ChangeVersionButton"

import discord from "../images/home/discord.svg"
import twitter from "../images/home/twitter.svg"
import github from "../images/home/github.svg"
import youtube from "../images/home/youtube.svg"

// const SocialMediaAnchorList = styled.div`
//   width: 100%;
//   height: auto;
//   position: relative;
//   text-align: center;
//   padding: 30px;
//   display: flex;
//   gap: 25px;
//   align-items: center;
//   justify-content: center;
// `

const Footer = () => {
  return (
    <footer>
      <div className="bg-[linear-gradient(90deg,#cb47a080_0%,#4a46c480_49.48%,#44b8f680_100%)] text-center py-4 mt-10 relative">
        <div className="h-full w-1/2 blur-[370px] rounded-full absolute bg-[#00FF85] left-1/2 -translate-x-1/2 -top-2/3 -z-10"></div>
        <h3 className="text-3xl md:text-5xl font-medium">Contact support</h3>
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
    </footer>

    // <footer className={styles.footer}>
    //   <div
    //     className="mobile-only"
    //     style={{ textAlign: "center", marginTop: 20 }}
    //   >
    //     <div style={{ display: "inline-block", maxWidth: 155, width: "100%" }}>
    //       <ChangeVersionButton />
    //     </div>
    //   </div>
    //   <SocialMediaAnchorList className="mobile-only">
    //     {socialMediaList.map((item) => (
    //       <SocialMediaAnchor
    //         key={item.href}
    //         href={item.href}
    //         target="_blank"
    //         rel="noopener noreferrer"
    //         title={item.title}
    //         iconSrc={item.icon}
    //       />
    //     ))}
    //   </SocialMediaAnchorList>
    // </footer>
  )
}

export default Footer
