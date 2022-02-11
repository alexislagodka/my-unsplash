import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import Image from 'next/image'
import Modal from '../../components/Modal/Modal'
import DeleteForm from '../../components/Forms/DeleteForm'
import db from '../../utils/firebase'
import { get, ref, child } from 'firebase/database'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Link from 'next/link'

export default function PicturePage ({ picture }) {
  const pictureId = Object.keys(picture)[0]
  const { src, title, uidowner, width, height } = picture[pictureId].pictureData
  const [isOwner, setIsOwner] = useState(false)
  const [show, setShow] = useState(false)
  const [user, setUser] = useState(null)

  // Handle Auth
  const auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user)
      if (user.uid === uidowner) {
        setIsOwner(true)
      } else {
        setIsOwner(false)
      }
    } else {
      setUser(null)
      setIsOwner(false)
    }
  })

  return (
    <Layout>
      <main className='w-full h-full flex flex-col items-center'>
        {
        Object.keys(picture).length === 0
          ? <h3>This pictures does not exist</h3>
          : <div className='w-full px-2 max-w-7xl'>
            <Link href='/'>
              <a className='text-green-600'>&#xE5C4; Back</a>
            </Link>
            <div className='flex justify-center items-center py-3'>
              <Image
                src={src}
                alt={title}
                width={width / 2}
                height={height / 2}
              />
            </div>
            </div>
      }
        {
        isOwner && <div className='flex justify-center items-center h-24'>
          <button className='deleteButton' onClick={() => setShow(true)}>Delete this picture</button>
        </div>

      }
        {
        (show && isOwner) &&
          <Modal show={show} handleClose={() => setShow(false)}>
            <DeleteForm handleCancel={() => setShow(false)} idPicture={pictureId} />
          </Modal>
      }
      </main>
    </Layout>
  )
}

export async function getStaticProps ({ params }) { // Pré-rendu avec récupération de données côté serveur
  const res = await get(child(ref(db), `pictures/${params.id}`))
  let picture = {}
  if (res.exists()) {
    const pictureData = await res.val()
    picture = {
      [params.id]: {
        pictureData
      }
    }
  }

  return {
    props: {
      picture
    }
  }
}

export async function getStaticPaths () {
  const res = await get(child(ref(db), 'pictures'))
  const data = await res.val()

  const paths = Object.entries(data).map(pic => ({
    params: { id: pic[0] }
  }))

  return {
    paths,
    fallback: false
  }
}
