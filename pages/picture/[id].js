import React, { useEffect, useState } from 'react'
import styles from './picturePage.module.scss'
import Layout from '../../components/Layout/Layout'
import Modal from '../../components/Modal/Modal'
import DeleteForm from '../../components/Forms/DeleteForm'
import db from '../../utils/firebase'
import { get, ref, child } from 'firebase/database'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export default function PicturePage ({ picture }) {
  const pictureId = Object.keys(picture)[0]
  const { src, title, uidowner } = picture[pictureId].pictureData
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
      <main className={styles.main}>
        {
        isOwner && <button className={styles.deleteButton} onClick={() => setShow(true)}>Delete this picture</button>
      }
        {
        Object.keys(picture).length === 0
          ? <h3>This pictures does not exist</h3>
          : <div className={styles.imageContainer}>
            <img src={src} className={styles.image} alt={title} />
            </div>
      }

        <Modal show={show} handleClose={() => setShow(false)}>
          <DeleteForm handleCancel={() => setShow(false)} idPicture={pictureId} />
        </Modal>

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
