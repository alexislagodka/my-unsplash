import React from 'react'
import styles from './imageCard.module.scss'
import Img from 'next/image'
import Link from 'next/link'

export default function ImageCard ({ id, src, title, href, width, height }) {
  const h = height * (385 / width)

  return (
    <div className={styles.imageCardContainer}>
      <Link href={`/picture/${id}`}>
        <a
          style={{
            position: 'relative',
            borderRadius: '16px',
            marginTop: '10px',
            marginBottom: '10px'
          }}
        >
          <Img
            className={styles.image}
            src={src}
            alt={title}
            placeholder='blur'
            blurDataURL={src}
            width={385}
            height={h}
          />
        </a>
      </Link>
    </div>
  )
}
