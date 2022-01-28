import React, { useEffect, useState } from 'react'
import styles from './picturePage.module.scss'
import Layout from '../../components/Layout/Layout'
import db from '../../utils/firebase'
import { get, ref, child } from 'firebase/database'

export default function PicturePage ({ picture }) {
  return (
    <Layout>
      <main className={styles.main}>
        <div className={styles.imageContainer}>
          <img src={picture.src} className={styles.image} alt={picture.description} />
        </div>
      </main>
    </Layout>
  )
}

export async function getServerSideProps ({ params }) { // Pré-rendu avec récupération de données côté serveur
  const res = await get(child(ref(db), `${params.id}`))
  const picture = await res.val()

  return {
    props: {
      picture
    }
  }
}
