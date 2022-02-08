import Layout from '../components/Layout/Layout'
import CardList from '../components/CardList/CardList'
import db from '../utils/firebase'
import {
  get,
  query,
  orderByKey,
  ref
} from 'firebase/database'

export default function Home ({ pictures }) {
  let displayedPics = []
  if (pictures.length !== 0) {
    displayedPics = pictures
  } else {
    const defaultPictures = require('../public/images')
    const defaultpicsArray = Object.entries(defaultPictures).map(pics => {
      return pics
    })
    displayedPics = defaultpicsArray
  }

  return (
    <Layout>
      <div className='w-full flex justify-center'>
        {
        pictures && <CardList pictures={displayedPics} />
      }
      </div>
    </Layout>
  )
}

export async function getStaticProps () {
  const query1 = await query(ref(db, 'pictures/'), orderByKey())
  const res = await get(query1)
  const picturesData = await res.val()

  let pictures = []
  if (picturesData) {
    pictures = Object.entries(picturesData).map(pics => {
      return pics
    })
  }

  pictures = pictures.reverse()

  return {
    props: {
      pictures
    },
    revalidate: 5
  }
}
