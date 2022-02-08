import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import Image from 'next/image'
import Modal from '../../components/Modal/Modal'
import DeleteForm from '../../components/Forms/DeleteForm'
import db from '../../utils/firebase'
import { get, ref, child } from 'firebase/database'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

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
      <main className='w-full h-full'>
        {
        Object.keys(picture).length === 0
          ? <h3>This pictures does not exist</h3>
          : <div className='flex justify-center items-center py-3'>
            <Image
              className=''
              src={src}
              alt={title}
              width={width / 2}
              height={height / 2}
            />
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

export async function getServerSideProps ({ params }) { // Pré-rendu avec récupération de données côté serveur
  const res = await get(child(ref(db), `pictures/${params.id}`))
  let picture = {}
  if (res.exists()) {
    const pictureData = await res.val()
    // picture = pictureData
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
