import Layout from "../../../../../components/layout";
import {
  getScreen,
  getPrevPostFromTitle,
  getNextPostFromTitle,
  getPostFromTitle,
  getScreenNameAR,
  getScreenNameEN,
  getPostTitleAR,
  getPostTitleEN,
} from "../../../../../lib/apiGet";
import { getPostSlideshowArray } from "../../../../../lib/utils";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "video-react/dist/video-react.css";
import ReactTooltip from "react-tooltip";
import ReactPlayer from "react-player";
import Head from "next/head";
import ReactMarkdown from "react-markdown";
import Grid from "@material-ui/core/Grid";
import React, { useState, useEffect, useRef } from "react";
import Router,{ useRouter } from "next/router";
import { redirect } from "next/dist/next-server/server/api-utils";

const Post = (props) => {
  const router = useRouter();
  const [width, setWidth] = React.useState(0);
  React.useEffect(() => {
    setWidth(window.innerWidth);
  });
  const [isTooltipVisible, setTooltipVisibility] = React.useState(false);

  React.useEffect(() => {
    setTooltipVisibility(true);
  }, []);

  if (typeof window !== "undefined") {
    document.documentElement.dir = "ltr";
    var time = new Date().getTime();
    document.addEventListener("click", function (e) {
      time = new Date().getTime();
    });
    var myinterval = null;
    myinterval = setInterval(function () {
      if (new Date().getTime() - time >= 180000) {
        var home_url = ("/" + props.lang + "/post/" + props.roomName + "/" + props.screenName)
        window.location.href = home_url
        clearInterval(myinterval)
      }
    }, 180000);
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
        postTitle={props.postTitle}
        screenNames={props.screenNames}
        postTitles={props.postTitles}
      >
        <Head>
          <title>
            {props.postObject[
              "Title (" + props.lang.toUpperCase() + ")"
            ].toUpperCase()}{" "}
            — National Acquarium
          </title>
          <meta property="og:title" content="National Acquarium" key="title" />
        </Head>
        {width < 2190 && (
          <>
            {props.imageArr.length > 1 && (
              <>
                <div
                  style={{
                    width: "100%",
                    height: "238px",
                    textAlign: "center",

                    position: "relative",
                  }}
                >
                  <center>
                    <ImageGallery
                      items={props.imageArr}
                      autoPlay={false}
                      showBullets={true}
                      showPlayButton={false}
                      showNav={false}
                      showFullscreenButton={false}
                    />
                  </center>
                </div>
              </>
            )}

            {props.imageArr.length == 1 && (
              <div
                style={{
                  width: "898px",
                  height: "283px",
                  margin: "auto",
                  textAlign: "center",
                  position: "relative",
                }}
              >
                <img
                  style={{
                    maxWidth: "898px",
                    maxHeight: "283px",
                    textAlign: "center",
                    position: "absolute",
                    bottom: "0%",
                    left: "50%",
                    filter: "drop-shadow(0px 16px 4px rgba(0, 0, 0, 0.1))",
                    transform: "translate(-50%, 0%)",
                  }}
                  src={props.imageArr[0].original}
                />
              </div>
            )}
            <div className="extraspacepg1"></div>
            <PostTitle props={props}></PostTitle>
            <div className="extraspace"></div>
            <PostDetailsTable props={props}></PostDetailsTable>
            <div className="extraspace"></div>
            <FunFactsBox props={props}></FunFactsBox>
            <div className="extraspace"></div>
            <PostVideoAndGeographicLocation
              props={props}
            ></PostVideoAndGeographicLocation>
            {props.postObject.Video && (
              <PostConvservationStatus props={props}></PostConvservationStatus>
            )}
            <PostNextPrevArrows props={props}></PostNextPrevArrows>
            <div className="extraspace"></div>
          </>
        )}
        {width > 3830 && (
          <>
            {console.log(width)}
            {props.imageArr.length > 1 && (
              <>
                <div
                  style={{
                    width: "100%",
                    height: "465px",
                    textAlign: "center",

                    position: "relative",
                  }}
                >
                  <center>
                    <ImageGallery
                      items={props.imageArr}
                      autoPlay={true}
                      showBullets={true}
                      showPlayButton={false}
                      showNav={false}
                      showFullscreenButton={false}
                    />
                  </center>
                </div>
              </>
            )}

            {props.imageArr.length == 1 && (
              <div
                style={{
                  width: "1377px",
                  height: "465px",
                  textAlign: "center",
                  position: "relative",
                  margin: "auto",
                }}
              >
                <div className="imgbg"></div>
                <img
                  style={{
                    maxWidth: "1377px",
                    maxHeight: "465px",
                    textAlign: "center",
                    position: "absolute",
                    bottom: "0%",
                    left: "50%",
                    filter: "drop-shadow(0px 16px 4px rgba(0, 0, 0, 0.1))",

                    transform: "translate(-50%, 0%)",
                  }}
                  src={props.imageArr[0].original}
                />
              </div>
            )}
            <div className="extraspacepg1"></div>
            <div className="titleblock">
              <PostTitle props={props}></PostTitle>
            </div>

            <div className="extraspace"></div>

            <div className="flex">
              <div className="innerdiv">
                <PostDetailsTable props={props}></PostDetailsTable>
                <div className="extraspace"></div>
                <FunFactsBox props={props}></FunFactsBox>
              </div>

              <div className="innerdiv">
                <PostGeographicLocation props={props}></PostGeographicLocation>
              </div>

              <div className="innerdiv">
                <PostConvservationStatus props={props}
                ></PostConvservationStatus>

                {props.postObject.Video ? (
                  <div className="videoplayer">
                    <ReactPlayer
                      url={props.api_base_url + props.postObject.Video.url}
                      className="postVideoBox"
                      controls={true}
                      width="100%"
                    ></ReactPlayer>
                  </div>
                ) : <div style={{ height: "500px" }}></div>}

              </div>
            </div>
            <PostNextPrevArrows props={props}></PostNextPrevArrows>
            <div className="extraspace"></div>
          </>
        )}
      </Layout>
    </>
  );
};

Post.getInitialProps = async ({ query }) => {
  const lang = query.lang.toUpperCase();
  const roomName = query.room;
  const screenName = query.screen;
  const post = query.post;
  const api_base_url = process.env.API_BASE_URL;
  let screenObject = JSON.parse(
    JSON.stringify(
      await getScreen(
        decodeURIComponent(screenName),
        lang,
        decodeURIComponent(roomName)
      )
    )
  );

  var postObject = null;
  var prevPostObject = null;
  var nextPostObject = null;

  for (var i = 0; i < screenObject.posts.length; i++) {

    if (screenObject.posts[i]["Title (EN)"] == post || screenObject.posts[i]["Title (AR)"] == post) {
      postObject = screenObject.posts[i];
      if (i > 0)
        prevPostObject = screenObject.posts[i - 1];
      if (i < screenObject.posts.length - 1)
        nextPostObject = screenObject.posts[i + 1];
    }
  }

  var imageArr = getPostSlideshowArray(postObject);

  var names = null;
  if (lang.toUpperCase() == "EN") {
    //get arabic screen name if current lang is in english
    names = JSON.parse(
      JSON.stringify(await getScreenNameAR(roomName, screenName))
    );
  } else {
    //get english screen name if current lang is in arabic
    names = JSON.parse(
      JSON.stringify(await getScreenNameEN(roomName, screenName))
    );
  }

  var titles = { AR: postObject["Title (AR)"], EN: postObject["Title (AR)"] };


  return {
    screenObject: screenObject,
    postObject: postObject,
    imageArr: imageArr,
    lang: lang,
    api_base_url: api_base_url,
    prevPostObject: prevPostObject,
    nextPostObject: nextPostObject,
    roomName: roomName,
    screenName: screenName,
    postTitle: post,
    screenNames: names,
    postTitles: titles,
  };
};

function PostTitle({ props }) {
  let postName = props.postObject[
    "Title (" + props.lang.toUpperCase() + ")"
  ].toUpperCase();
  const namewords = postName.split(" ").length;
  const sec = postName.substr(postName.indexOf(" ") + 1);
  const namelength = sec.length;
  let fontsize = "101px";
  if (namelength < 13 && props.lang.toUpperCase() === "EN") {
    fontsize = "101px";
  } else if (namelength < 15 && props.lang.toUpperCase() === "EN") {
    fontsize = "90px";
  } else if (namelength < 17 && props.lang.toUpperCase() === "EN") {
    fontsize = "80px";
  } else if (namelength < 19 && props.lang.toUpperCase() === "EN") {
    fontsize = "70px";
  } else if (namelength < 24 && props.lang.toUpperCase() === "EN") {
    fontsize = "65px";
  } else if (props.lang.toUpperCase() === "EN") {
    fontsize = "50px";
  }
  if (namelength < 13 && props.lang.toUpperCase() === "AR") {
    fontsize = "101px";
  } else if (namelength < 15 && props.lang.toUpperCase() === "AR") {
    fontsize = "101px";
  } else if (namelength < 17 && props.lang.toUpperCase() === "AR") {
    fontsize = "90px";
  } else if (namelength < 19 && props.lang.toUpperCase() === "AR") {
    fontsize = "85px";
  } else if (namelength < 21 && props.lang.toUpperCase() === "AR") {
    fontsize = "70px";
  } else if (props.lang.toUpperCase() === "AR") {
    fontsize = "50px";
  }
  return (
    <div className={props.lang.toUpperCase() === "AR" ? "namedivar" : "namediv"}>
      <div className="firstnamepg1">
        <div className="screenName">{postName.split(" ")[0]} </div>
      </div>

      <div className="lastnamepg1">
        {" "}
        {namewords > 1 && (
          <div
            className="screenName"
            style={{
              fontSize: fontsize,
            }}
          >
            {postName.substr(postName.indexOf(" ") + 1)}{" "}
          </div>
        )}
      </div>
    </div>
  );
}

function FunFactsBox({ props }) {
  const funFacts =
    props.postObject["Fun Facts (" + props.lang.toUpperCase() + ")"];

  if (funFacts) {
    return (
      <div className="funFactsBox" style={{ height: 325, alignSelf: "center" }}>
        <div className="funFactsTitle">
          {props.lang == "EN" ? "FUN FACTS" : "الحيوانات"}
        </div>
        <div className="underlinepg2" style={{ paddingTop: '3px' }}></div>
        <div className="extraspacepg1"></div>
        <div
          className="funFactsText"
          style={{ height: 225, overflow: "auto" }}
        >
          <ReactMarkdown>{funFacts}</ReactMarkdown>
        </div>
      </div>
    );
  }
  return null;
}

function PostDetailsTable({ props }) {
  var scientificName = props.postObject[
    "Scientific Name (" + props.lang.toUpperCase() + ")"
  ]
    ? props.postObject["Scientific Name (" + props.lang.toUpperCase() + ")"]
    : "";
  var diet = props.postObject["Diet (" + props.lang.toUpperCase() + ")"]
    ? props.postObject["Diet (" + props.lang.toUpperCase() + ")"]
    : "";
  var maxSize = props.postObject["Max Size (" + props.lang.toUpperCase() + ")"]
    ? props.postObject["Max Size (" + props.lang.toUpperCase() + ")"]
    : "";

  if (scientificName || diet || maxSize) {
    return (
      <table width="100%" className="postdetails">
        <thead>
          <tr>
            {props.lang == "EN" ? (
              <th
                className="postDetailsHeaderEN"
                style={{ paddingBottom: "5px" }}
              >
                {scientificName ? "SCIENTIFIC NAME" : ""}
                {scientificName && <div className="underlinepg2 extrabottomspace"></div>}
              </th>
            ) : (
              <th
                className="postDetailsHeaderAR"
                style={{ paddingBottom: "5px" }}
              >
                {scientificName ? "الاسم العلمي" : ""}
                {scientificName && <div className="underlinepg2 extrabottomspace"></div>}
              </th>
            )}
            {props.lang == "EN" ? (
              <th
                className="postDetailsHeaderEN"
                style={{ paddingBottom: "5px" }}
              >
                {diet ? "DIET" : ""}
                {diet && <div className="underlinepg2 extrabottomspace"></div>}
              </th>
            ) : (
              <th
                className="postDetailsHeaderAR"
                style={{ paddingBottom: "5px" }}
              >
                {diet ? "الغذاء" : ""}
                {diet && <div className="underlinepg2 extrabottomspace"></div>}
              </th>
            )}
            {props.lang == "EN" ? (
              <th
                className="postDetailsHeaderEN"
                style={{ paddingBottom: "5px" }}
              >
                {maxSize ? "MAX SIZE" : ""}
                {maxSize && <div className="underlinepg2 extrabottomspace"></div>}
              </th>
            ) : (
              <th
                className="postDetailsHeaderAR"
                style={{ paddingBottom: "5px" }}
              >
                {maxSize ? "الحد الأقصى للطول" : ""}
                {maxSize && <div className="underlinepg2 extrabottomspace"></div>}
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          <tr style={{ height: "30px" }}></tr>
          <tr>
            {props.lang == "EN" ? (
              <td className="postDetailsHeaderEN notbold">
                {" "}
                <ScientificNameImage
                  lang={props.lang}
                  name={scientificName}
                ></ScientificNameImage>
                {scientificName}
              </td>
            ) : (
              <td className="postDetailsHeaderAR notbold">
                {" "}
                <ScientificNameImage
                  lang={props.lang}
                  name={scientificName}
                ></ScientificNameImage>
                {scientificName}
              </td>
            )}
            {props.lang == "EN" ? (
              <td className="postDetailsHeaderEN notbold">
                {" "}
                <DietImage lang={props.lang} diet={diet}></DietImage>
                {diet}
              </td>
            ) : (
              <td className="postDetailsHeaderAR notbold">
                {" "}
                <DietImage lang={props.lang} diet={diet}></DietImage>
                {diet}
              </td>
            )}
            {props.lang == "EN" ? (
              <td className="postDetailsHeaderEN notbold">
                {" "}
                <SizeImage lang={props.lang} size={maxSize}></SizeImage>
                {maxSize}
              </td>
            ) : (
              <td className="postDetailsHeaderAR notbold">
                {" "}
                <SizeImage lang={props.lang} size={maxSize}></SizeImage>
                {maxSize}
              </td>
            )}
          </tr>
        </tbody>
      </table>
    );
  } else {
    return null;
  }
}

export function PostVideoAndGeographicLocation({ props }) {
  if (props.postObject.Video || props.postObject.Location)
    return (
      <>
        <div>
          <Grid container spacing={2}>
            <Grid item xs={5}>
              <Grid container justify="flex-start" spacing={2}>
                {props.postObject.Video ? (
                  <>
                    <ReactPlayer
                      url={props.api_base_url + props.postObject.Video.url}
                      className="postVideoBox"
                      controls={true}
                      width="100%"
                    ></ReactPlayer>
                  </>
                ) : (
                  <div className="verticallalign">
                    {" "}
                    <PostConvservationStatus
                      props={props}
                    ></PostConvservationStatus>
                  </div>
                )}
              </Grid>
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={6}>
              <Grid container justify="flex-start" spacing={2}>
                {props.postObject.Location ? (
                  <PostGeographicLocation
                    props={props}
                  ></PostGeographicLocation>
                ) : null}
              </Grid>
            </Grid>
          </Grid>
        </div>
      </>
    );
  else return null;
}

function PostGeographicLocation({ props }) {
  if (props.postObject.Location) {
    return (
      <>
        <div className="conservationTitle">
          {" "}
          {props.lang == "EN" ? "GEOGRAPHICAL LOCATION" : "النطاق الجغرافي"}
        </div>
        <div style={{ height: "4px" }} className="underlinepg2"></div>
        <div style={{ paddingTop: "25px" }}></div>
        <figure style={{ width: "100%" }}>
          <img
            src={props.api_base_url + props.postObject.Location.Image.url}
            alt={
              props.postObject.Location[
              "Geographical Range (" + props.lang.toUpperCase() + ")"
              ]
            }
          />
          <figcaption>
            <div className="geo">
              <ExtantCircle lang={props.lang}></ExtantCircle>
              <div className="location">
                <img
                  className="locationpin"
                  src="/images/locationpin.png"
                  alt={
                    props.postObject.Location[
                    "Geographical Range (" + props.lang.toUpperCase() + ")"
                    ]
                  }
                />
                <div className=" geotext" style={{ color: "white" }}>
                  {
                    props.postObject.Location[
                    "Geographical Range (" + props.lang.toUpperCase() + ")"
                    ]
                  }
                </div>
              </div>
            </div>
          </figcaption>
        </figure>
      </>
    );
  } else {
    return null;
  }
}

function PostConvservationStatus({ props }) {
  const [isTooltipVisible, setTooltipVisibility] = React.useState(false);

  React.useEffect(() => {
    setTooltipVisibility(true);
  }, []);

  if (props.postObject["Conservation Status"]) {
    let conservationCircleArr = [
      {
        symbol: "NE",
        title: "Not Evaluated",
      },
      {
        symbol: "DD",
        title: "Data Deficient",
      },
      {
        symbol: "LC",
        title: "Least Concern",
      },
      {
        symbol: "NT",
        title: "Near Threatend",
      },
      {
        symbol: "VU",
        title: "Vulnerable",
      },
      {
        symbol: "EN",
        title: "Endangered",
      },
      {
        symbol: "CR",
        title: "Critically Endangered",
      },
      {
        symbol: "EW",
        title: "Extinct in the Wild",
      },
      {
        symbol: "EX",
        title: "Extinct",
      },
    ];
    return (
      <div>
        <div className="conservationTitle">
          {props.lang == "EN" ? "CONSERVATION STATUS" : "حالة الحفظ"}
        </div>
        <div className="underlinepg2"></div>
        <div style={{ paddingTop: "25px" }}></div>
        <table className="circletable">
          <thead>
            <tr>
              {conservationCircleArr.map((arr, index) => (
                <th className="conservationStatusTH" key={arr.symbol}>
                  <PostConservationStatusCircle
                    status={props.postObject["Conservation Status"]}
                    title={arr.title}
                    symbol={arr.symbol}
                  ></PostConservationStatusCircle>
                  {isTooltipVisible &&
                    <ReactTooltip
                      effect="solid"
                      textColor="white"
                      className="tooltip"
                      backgroundColor="transparent"
                    />}
                </th>
              ))}
            </tr>
          </thead>
        </table>
      </div>
    );
  } else {
    return null;
  }
}

function PostConservationStatusCircle({ status, title, symbol }) {
  if (status == title) {
    return (
      <div className="circ circ-on">
        {" "}
        <div
          className="conservationStatusTitle circletext"
          style={{ color: "white" }}
          data-tip={title}
        >
          {" "}
          {symbol}{" "}
        </div>{" "}
      </div>
    );
  } else {
    return (
      <div className="circ">
        {" "}
        <div
          className="conservationStatusTitle circletext"
          style={{ color: "#0C3B62" }}
          data-tip={title}
        >
          {" "}
          {symbol}{" "}
        </div>{" "}
      </div>
    );
  }
}

function PostNextPrevArrows({ props }) {
  const prev = "<";
  const next = ">";
  return (
    <div style={{ margin: "2rem" }}>
      <center>
        {props.prevPostObject ? (
          <BuildPrevPageUrl props={props}></BuildPrevPageUrl>
        ) : null}
        {props.nextPostObject ? (
          <BuildNextPageUrl props={props}></BuildNextPageUrl>
        ) : null}
      </center>
    </div>
  );
}

function BuildPrevPageUrl({ props }) {
  if (props.prevPostObject) {
    const prev = "<";
    return (
      <a
        replace="true"
        style={{ textDecoration: "none", fontWeight: "bold" }}
        className="pagination"
        href={
          "/" +
          props.lang.toUpperCase() +
          "/post/" +
          encodeURIComponent(props.roomName) +
          "/" +
          encodeURIComponent(
            props.screenName
          ) +
          "/" +
          encodeURIComponent(
            props.prevPostObject["Title (" + props.lang.toUpperCase() + ")"]
          )
        }
      >
        <span className="arrow">{prev}</span>{" "}
      </a>
    );
  } else {
    return null;
  }
}

function BuildNextPageUrl({ props }) {
  if (props.nextPostObject) {
    const next = ">";
    return (
      <a
        style={{ textDecoration: "none", fontWeight: "bold" }}
        replace="true"
        className="pagination"
        href={
          "/" +
          props.lang.toUpperCase() +
          "/post/" +
          encodeURIComponent(props.roomName) +
          "/" +
          encodeURIComponent(
            props.screenName
          ) +
          "/" +
          encodeURIComponent(
            props.nextPostObject["Title (" + props.lang.toUpperCase() + ")"]
          )
        }
      >
        <span className="arrow">{next}</span>{" "}
      </a>
    );
  } else {
    return null;
  }
}

function ScientificNameImage({ lang, name }) {
  if (!name) {
    return null;
  }
  if (lang == "EN") {
    return (
      <img
        className="postDetailsHeaderImageEN"
        src={require("./../../../../../public/icons/ScientificNameIcon.svg")}
      />
    );
  } else {
    return (
      <img
        className="postDetailsHeaderImageAR"
        src={require("./../../../../../public/icons/ScientificNameIcon.svg")}
      />
    );
  }
}

function DietImage({ lang, diet }) {
  if (!diet) {
    return null;
  }
  if (lang == "EN") {
    return (
      <img
        className="postDetailsHeaderImageEN"
        src={require("./../../../../../public/icons/DietIcon.svg")}
      />
    );
  } else {
    return (
      <img
        className="postDetailsHeaderImageAR"
        src={require("./../../../../../public/icons/DietIcon.svg")}
      />
    );
  }
}

function SizeImage({ lang, size }) {
  if (!size) {
    return null;
  }
  if (lang == "EN") {
    return (
      <img
        className="postDetailsHeaderImageEN"
        src={require("./../../../../../public/icons/MaxSizeIcon.svg")}
      />
    );
  } else {
    return (
      <img
        className="postDetailsHeaderImageAR"
        src={require("./../../../../../public/icons/MaxSizeIcon.svg")}
      />
    );
  }
}

function ExtantCircle({ lang }) {
  if (lang.toUpperCase() == "EN") {
    return (
      <div className="col-sm-2" style={{ paddingTop: "13px" }}>
        {" "}
        <span>
          <div className="circle"></div>
        </span>
        <p>
          &nbsp;&nbsp;<span className="geotext">Extant (Resident)</span>
        </p>
      </div>
    );
  } else {
    //TODO Get Arabic text for this
    return (
      <div className="col-sm-2" style={{ paddingTop: "13px" }}>
        {" "}
        <span>
          <div className="circle"></div>
        </span>
        <p>
          &nbsp;&nbsp;<span className="geotext">موجود</span>
        </p>
      </div>
    );
  }
}
export default Post;
