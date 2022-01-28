import Layout from '../components/Layout/Layout'
import Head from 'next/head'
import CardList from '../components/CardList/CardList'
import styles from '../styles/Home.module.scss'
import db from '../utils/firebase'
import {
  get,
  query,
  orderByKey,
  ref
} from 'firebase/database'

export default function Home ({ pictures }) {
  // const defaultImages = require('../public/images')

  // const ajouterImage = () => {
  //   Object.keys(defaultImages).forEach(key => {
  //     const pic = {
  //       src: defaultImages[key].urls.full,
  //       title: defaultImages[key].alt_description,
  //       width: defaultImages[key].width,
  //       height: defaultImages[key].height
  //     }
  //     const newPicRef = push(ref(db))
  //     set(newPicRef, pic)
  //       .catch((error) => {
  //         console.log(error)
  //       })
  //   })
  // }

  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>My unsplash</title>
          <meta name='description' content='My unsplash app' />
          <link rel='icon' href='/favicon.ico' />
          <link rel='stylesheet' href='https://pro.fontawesome.com/releases/v5.10.0/css/all.css' integrity='sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p' crossorigin='anonymous' />
        </Head>

        <main className={styles.main}>
          {
          pictures && <CardList pictures={pictures} />
        }
        </main>
      </div>
    </Layout>
  )
}

export async function getStaticProps () {
  const query1 = await query(ref(db), orderByKey())
  const res = await get(query1)
  const picturesData = await res.val()

  let pictures = Object.entries(picturesData).map(pics => {
    return pics
  })

  pictures = pictures.reverse()

  return {
    props: {
      pictures
    },
    revalidate: 5
  }
}
