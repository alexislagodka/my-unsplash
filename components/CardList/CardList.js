import React, { useState, useEffect } from 'react'
import styles from './CardList.module.scss'
import Masonry from 'react-masonry-css'

import ImageCard from '../ImageCard/ImageCard'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export default function CardList ({ pictures }) {
  const [pics, setPics] = useState(pictures) // Initial pictures
  const [displayedPics, setDisplayedPics] = useState(pics.slice(0, 10)) // Displayed pictures
  const [activeFilter, setActiveFilter] = useState('All') // Initial pictures
  const [hasMore, setHasMore] = useState(true)
  const [user, setUser] = useState(null)

  // Handle auth
  const auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user)
    } else {
      setUser(null)
    }
  })

  useEffect(() => {
    setDisplayedPics(pics.slice(0, 30))
    setHasMore(true)
  }, [pics])

  useEffect(() => { // Handle filter
    switch (activeFilter) {
      case 'All':
        setPics(pictures)
        break
      case 'MyPictures': {
        const uid = auth.currentUser.uid
        const myPics = pictures.filter(pic => pic[1].uidowner === uid)
        setPics(myPics)
        break
      }
      default:
        setPics(pictures)
    }
  }, [activeFilter, auth, pictures])

  const getMorePics = () => {
    if (pics.length > displayedPics.length) {
      const newDisplayedPics = pics.slice(displayedPics.length, displayedPics.length + 30)
      setDisplayedPics((displayedPics) => [...displayedPics, ...newDisplayedPics])
    } else {
      setHasMore(false)
    }
  }

  const breakpointColumnsObj = {
    default: 3,
    1200: 2,
    800: 1
  }

  return (
    <div className={styles.cardList}>
      <div className={styles.listHeader}>
        <div className={styles.buttonsContainer}>
          <button className={activeFilter === 'All' ? styles.active : null} onClick={() => setActiveFilter('All')}>All</button>
          {
            user && <button className={activeFilter === 'MyPictures' ? styles.active : null} onClick={() => setActiveFilter('MyPictures')}>My pictures</button>
          }
        </div>
        <h3>{pics.length} pictures</h3>
      </div>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={styles.masonryGrid}
        columnClassName={styles.masonryColumn}
      >
        {
          displayedPics.map(displayedPic => {
            return (
              <ImageCard
                key={displayedPic[0]}
                id={displayedPic[0]}
                src={displayedPic[1].src}
                width={displayedPic[1].width}
                height={displayedPic[1].height}
              />
            )
          })

        }
      </Masonry>
      <div className={styles.listFooter}>
        {
          hasMore
            ? <button onClick={getMorePics} className={styles.moreButton}>More</button>
            : <div>
              There is nothing more to load
            </div>
        }
      </div>
    </div>
  )
}
