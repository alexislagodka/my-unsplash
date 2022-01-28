import React, { useState, useEffect } from 'react'
import styles from './CardList.module.scss'
import Masonry from 'react-masonry-css'

import ImageCard from '../ImageCard/ImageCard'
import InfiniteScroll from 'react-infinite-scroll-component'

export default function CardList ({ pictures }) {
  const [pics, setPics] = useState(pictures.slice(0, 10))
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    setPics(pictures.slice(0, 10))
  }, [pictures])

  const getMorePics = () => {
    if (pictures.length > pics.length) {
      const newPics = pictures.slice(pics.length, pics.length + 10)
      setPics((pics) => [...pics, ...newPics])
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
      <InfiniteScroll
        dataLength={pics.length}
        next={getMorePics}
        hasMore={hasMore}
        loader={<h3> ...</h3>}
        endMessage={<h4>Nothing more to show</h4>}
      >
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className={styles.masonryGrid}
          columnClassName={styles.masonryColumn}
        >
          {
          pics.map(pic => {
            return (
              <ImageCard
                key={pic[0]}
                id={pic[0]}
                src={pic[1].src}
                width={pic[1].width}
                height={pic[1].height}
              />
            )
          })

        }
        </Masonry>
      </InfiniteScroll>
    </div>
  )
}
