import React, { useState, useEffect } from 'react'
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
    1200: 2
  }

  return (
    <div className='w-full px-2 max-w-7xl'>
      <div className='flex justify-between items-center'>
        <div className=''>
          <button className={`filterButton ${activeFilter === 'All' ? 'activeFilterButton' : null}`} onClick={() => setActiveFilter('All')}>All</button>
          {
            user && <button className={`filterButton ${activeFilter === 'MyPictures' ? 'activeFilterButton' : null}`} onClick={() => setActiveFilter('MyPictures')}>My pictures</button>
          }
        </div>
        <div>{pics.length} pictures</div>
      </div>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className='flex -ml-3 w-auto'
        columnClassName='pl-3'
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
      <div className='w-full flex justify-center py-6'>
        {
          hasMore
            ? <button onClick={getMorePics}>More ...</button>
            : <div>
              There is nothing more to load
            </div>
        }
      </div>
    </div>
  )
}
