import Head from 'next/head'
import { useState, useEffect, useRef } from "react";
import Image from 'next/image'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import { getScreenNameAR, getScreenNameEN } from '../lib/apiGet';
import Router from "next/dist/next-server/lib/router/router";
export const siteTitle = 'National Acquarium'
import { useRouter } from "next/router";
// import touchicon from "./../public/images/touchIcon.gif"

/*
Layout screen is the parent for [screen].js and [post].js renders. It has the home and language switch buttons as well as sets the background and rights recieved footer
*/

export default function Layout({ children, lang, screenName, roomName, postTitle, screenNames, postTitles }) {
  var homeUrl = '/' + lang + "/post/" + encodeURIComponent(roomName) + "/" + encodeURIComponent(screenName) + "/";
  const router = useRouter();

  if (postTitle) {//Means url to be set for post screen
    var englishUrl = '/' + 'EN' + "/post/" + encodeURIComponent(roomName) + "/" + encodeURIComponent(screenNames.EN) + "/" + encodeURIComponent(postTitles.EN);
    var arabicUrl = '/' + 'AR' + "/post/" + encodeURIComponent(roomName) + "/" + encodeURIComponent(screenNames.AR) + "/" + encodeURIComponent(postTitles.AR);
  } else {//Means url to be set for screens screen
    var englishUrl = '/' + 'EN' + "/post/" + encodeURIComponent(roomName) + "/" + encodeURIComponent(screenNames.EN) + "/";
    var arabicUrl = '/' + 'AR' + "/post/" + encodeURIComponent(roomName) + "/" + encodeURIComponent(screenNames.AR) + "/";
  }
  if (lang.toUpperCase() == 'EN') {
    if (typeof window !== 'undefined') {
      document.documentElement.dir = 'ltr'
      document.addEventListener("click",hideGlove)
    }
  } else {
    if (typeof window !== 'undefined') {
      document.documentElement.dir = 'rtl'
      document.addEventListener("click",hideGlove)
    }
  }
  const [hasClicked, setClick] = useState(false);
   function hideGlove() {
     setClick(true);
   }
   function home(){
    // router.push(`/${lang}/post/${decodeURIComponent(roomName)}/${decodeURIComponent(screenName)}`)
    router.push(`/${lang}/post/${roomName}/${screenName}`)
  }
  

  return (
    <div>
      <div className={styles.container}>
        <header className={styles.backToHome}>
          <div style={{display:"flex",justifyContent:"space-between"}}>

                     <a className={styles.urlNoDecoration} href={"/"+lang+"/post/"+roomName+"/"+screenName}>
             <img 
               className={styles.homebtn}
               src={require("./../../nextjs/public/icons/HomeIcon.svg")
              }
              />{" "}
           </a>
        &nbsp;
        <div className={lang.toUpperCase() == 'EN'?styles.roundedCornersBox:styles.roundedCornersBoxAR}>
            <a className={styles.urlNoDecoration} href={englishUrl}><span className={styles.engname}>English</span></a>
            &nbsp;<span className={styles.barcolor}>|</span>            &nbsp;
            <a className={styles.urlNoDecoration} href={arabicUrl}><span className={styles.arname}>العربية</span> </a>
          </div>
           </div>
        </header>
        <div style={{paddingTop:"40px"}}></div>
        <main>{children}</main>
      </div >
      <footer className={styles.rightsRecievedDiv}>© 2021 National Aquarium. All rights reserved</footer>
    </div>
  )
}
