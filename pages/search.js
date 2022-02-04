import React, { useState, useEffect } from 'react'
import styles from '../styles/Search.module.scss'
import { useRouter } from 'next/router'

import Layout from '../components/Layout/Layout'
import CardList from '../components/CardList/CardList'
import db from '../utils/firebase'
import { orderByKey, ref, get, query } from 'firebase/database'

export default function Search () {
  const [pictures, setPictures] = useState([])

  const name = useRouter().query.name

  useEffect(() => {
    if (name) {
      const picturesWithTitle = query(ref(db, 'pictures'), orderByKey())
      get(picturesWithTitle)
        .then(snapshot => {
          if (snapshot.exists()) {
            const picturesData = snapshot.val()
            const pictures = Object.entries(picturesData).map(pics => {
              return pics
            })
            const result = []
            pictures.forEach(pic => {
              const picTitle = pic[1].name
              if (picTitle) {
                if (picTitle.toLowerCase().includes(name.toLowerCase())) result.push(pic)
              }
            })
            setPictures(result)
          }
        })
    }
  }, [name])

  return (
    <Layout>
      <div className={styles.search}>
        {
          pictures.length !== 0
            ? <CardList pictures={pictures} />
            : <h2>No pictures found.</h2>
        }
      </div>
    </Layout>
  )
}
