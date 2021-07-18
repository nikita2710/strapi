import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getRoomsFromAPI } from '../lib/apiGet'
import Link from 'next/link';

export async function getStaticProps() {
  const allRooms = JSON.parse(JSON.stringify(await getRoomsFromAPI()));
  //Parse and Stringify done since nextJs was having weird errors accepting the standard json from API
  return {
    props: {
      allRooms
    }
  }
}


export default function Home({ allRooms }) {
  console.log(allRooms)
  var homeTitle = "National Acquarium";
  return (
    <div>
      <Head>
        <title>{homeTitle}</title>
      </Head>
      <body>
        <ul>
          {allRooms.map(rooms => (
            <h1><u>
              {rooms.Title}
            </u>
            </h1>
          ))}
        </ul>
      </body>
    </div>
  );
}
