import React from 'react'
import Img from 'next/image'
import Link from 'next/link'

export default function ImageCard ({ id, src, title, href, width, height, displayWidth }) {
  const h = height * (385 / width)

  return (
    <div className='flex justify-center pt-10 w-full'>
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
            className='rounded-xl'
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
