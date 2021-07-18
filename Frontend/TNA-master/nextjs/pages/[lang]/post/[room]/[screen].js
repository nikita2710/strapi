import Layout from "../../../../components/layout";
import Head from "next/head";
import {
    getScreen,
    getScreenNameAR,
    getScreenNameEN,
} from "../../../../lib/apiGet";
import { getScreenPostsImages } from "../../../../lib/utils";
import Grid from "@material-ui/core/Grid";
import React, { useState, useEffect, useRef } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";

const Screen = (props) => {

    const imglength = props.images.length;
    const [load, Setload] = useState(true);
    const [postsToShow, setPostsToShow] = useState([])
    const postsPerPage = 6;
    const postsafter = 2;
    let arrayForHoldingPosts = []
    const ref = useRef(postsPerPage);
    const [hasClicked, setClick] = useState(false);
   function hideGlove() {
     setClick(true);
   }

    const loopWithSlice = (start, end) => {
        const slicedPosts = props.images.slice(start, end)
        arrayForHoldingPosts = arrayForHoldingPosts.concat(slicedPosts);
        setTimeout(() => {
        arrayForHoldingPosts.map((item) => {
            setPostsToShow(state => [...state, item])
        });
    }, 2000);
   
        // arrayForHoldingPosts.map((item) => {
        //     setPostsToShow(state => [...state, item])
        // });

    }
    useEffect(() => {
        const slicedPosts = props.images.slice(0, postsPerPage)
        arrayForHoldingPosts = arrayForHoldingPosts.concat(slicedPosts);
      
        arrayForHoldingPosts.map((item) => {
            setPostsToShow(state => [...state, item])
        });
  
    }, [])

    const handleShowMorePosts = () => {
        loopWithSlice(ref.current, ref.current + postsafter)
        ref.current += postsafter;
        ref.current >= imglength ? Setload(false) : Setload(true);
    }



    
    return (

        <>
            <Layout
                homeUrl={
                    "/" + props.lang + "/post/" + props.roomName + "/" + props.screenName
                }
                lang={props.lang}
                screenName={props.screenName}
                roomName={props.roomName}
                screenNames={props.screenNames}
            >
                <div>
                {hasClicked ? null : (
          <div id="touchIcon  " style={{marginTop:"-80px",marginLeft:"40vw"}}>
               <img
                 src={require("./../../../../public/images/touchIcon.gif")}
                 style={{ height: "8rem" }}
                 onClick={hideGlove}
                 ></img>
             </div>
           )}
                </div>
                <Head>
                    <title>National Acquarium</title>
                    <meta property="og:title" content="National Acquarium" key="title" />
                </Head>
                <div id="scrollableDiv" style={{ height:'1575px', overflow: "auto" }}>
                <div className="extraspace"></div>
                <div className="screentitle">{props.screenName}</div>
                <div className="underlinetitle" style={{ paddingTop:props.lang.toUpperCase()==="EN"?"2px":"13px"}}></div>
                <div className="extraspace"></div>
                <InfiniteScroll
            dataLength={postsToShow.length}
            next={handleShowMorePosts}
            hasMore={true}
          
            scrollableTarget="scrollableDiv"
          > 

<div >
                         <Grid container spacing={2}>
                        {postsToShow.map((image, index) => (
                            <>

                                <Grid item xs={6} container spacing={3}>
                                    <Grid container justify="flex-start" >
                                        <a
                                            style={{
                                                textDecoration: "none",
                                                fontWeight: "bold",
                                                color: "white",
                                            }}
                                            replace="true"
                                            href={
                                                "/" +
                                                props.lang.toUpperCase() +
                                                "/post/" +
                                                encodeURIComponent(props.roomName) +
                                                "/" +
                                                encodeURIComponent(props.screenName) +
                                                "/" +
                                                encodeURIComponent(image.caption)
                                            }
                                        >
                                            <figure style={{ flexDirection: "column" }}>
                                                <div
                                                    style={{
                                                        width: "418px",
                                                        height: "196px",
                                                        textAlign: "center",
                                                        position: "relative",
                                                    }}
                                                >
                                                    <img
                                                        style={{
                                                            maxWidth: "95%",
                                                            textAlign: "center",
                                                            position: "absolute",
                                                            top: "50%",
                                                            left: "50%",
                                                            transform: "translate(-50%, -50%)",
                                                        }}
                                                        src={image.src}
                                                    />
                                                </div>
                                                <figcaption>
                                                    <ScreenToPostLink
                                                        lang={props.lang}
                                                        roomName={props.roomName}
                                                        screenName={props.screenName}
                                                        postName={image.caption}
                                                    >
                                                        {" "}
                                                    </ScreenToPostLink>{" "}
                                                </figcaption>
                                            </figure>
                                        </a>
                                    </Grid>
                                </Grid>
                                <div className="extraspace"></div>
                            </>
                        ))}
                    </Grid>
                </div>
                         
                </InfiniteScroll>
          <div className="extraspace"></div>
                {load && <center><div>
                    <div className="scrolmore" onClick={handleShowMorePosts}>Scroll for more</div>
                    <div style={{ paddingTop: '15px' }} onClick={handleShowMorePosts}><svg width="33" height="16" viewBox="0 0 35 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.03887 3.78388C5.98184 7.67994 10.9248 11.5604 15.8842 15.4565C16.8038 16.1734 17.8713 16.1889 18.7909 15.4565C23.7339 11.5604 28.6768 7.67994 33.6362 3.78388C35.6726 2.1787 32.7495 -0.564133 30.7296 1.02546C26.2628 4.53192 21.8125 8.03838 17.3458 11.5448C12.879 8.03838 8.4287 4.53192 3.96196 1.02546C1.92565 -0.564133 -0.997445 2.1787 1.03887 3.78388Z" fill="white" />
                    </svg>
                    </div>
                </div></center>}
              
              
                </div>
            </Layout>
        </>
    );
};

Screen.getInitialProps = async ({ query }) => {
    const lang = query.lang;
    const roomName = query.room;
    const screenName = query.screen;
    var names = null;
    if (lang == "EN") {
        names = JSON.parse(
            JSON.stringify(await getScreenNameAR(roomName, screenName))
        );
    } else {
        names = JSON.parse(
            JSON.stringify(await getScreenNameEN(roomName, screenName))
        );
    }
    let screenObject = JSON.parse(
        JSON.stringify(
            await getScreen(
                names[lang],
                lang,
                decodeURIComponent(roomName)
            )
        )
    );
    let images = getScreenPostsImages(screenObject.posts, lang);
    return {
        screenObject: screenObject,
        roomName: roomName,
        screenName: screenName,
        lang: lang,
        images: images,
        screenNames: names,
    };
};

function ScreenToPostLink({ lang, roomName, screenName, postName }) {
    const namewords = postName.split(" ").length;
    const sec = postName.substr(postName.indexOf(" ") + 1);
    const namelength = sec.length;
    let fontsize='55px';
    if( namelength < 13 && lang.toUpperCase() === "EN"){
        fontsize="55px";
    }else if(namelength < 15 && lang.toUpperCase() === "EN"){
        fontsize="45px";
    }
    else if(namelength < 17 && lang.toUpperCase() === "EN"){
        fontsize="40px";
    }
    else if(namelength < 19 && lang.toUpperCase() === "EN"){
        fontsize="35px";
    }
    else if(namelength < 21 && lang.toUpperCase() === "EN"){
        fontsize="30px";
    }
    else if(lang.toUpperCase() === "EN"){
        fontsize="20px";
    }
    if( namelength < 13 && lang.toUpperCase() === "AR"){
        fontsize="55px";
    }else if(namelength < 15 && lang.toUpperCase() === "AR"){
        fontsize="45px";
    }
    else if(namelength < 17 && lang.toUpperCase() === "AR"){
        fontsize="40px";
    }
    else if(namelength < 19 && lang.toUpperCase() === "AR"){
        fontsize="35px";
    }
    else if(namelength < 21 && lang.toUpperCase() === "AR"){
        fontsize="30px";
    }
    else if(lang.toUpperCase() === "AR"){
        fontsize="30px";
    }
  
    return (
        <>
            <div className="firstname">
                <div className="screenName">{postName.split(" ")[0]} </div>
            </div>

            <div className="lastname">
              
                {namewords > 1 && (
                    <div
                        className="screenName"
                        style={{
                            fontSize:
                            fontsize,
                        }}
                    >
                       <span className="trylength ">{postName.substr(postName.indexOf(" ") + 1)}</span> 
                    </div>
                )}
            </div>
        </>
    );
}


export default Screen;
