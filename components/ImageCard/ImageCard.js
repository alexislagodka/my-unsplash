import React from 'react'
import Img from 'next/image'
import Link from 'next/link'

export default function ImageCard ({ id, src, title, href, width, height, displayWidth }) {
  const h = height * (385 / width)

  return (
    <div className='relative flex justify-center pt-3 sm:pt-10 w-full'>
      <Link href={`/picture/${id}`}>
        <a>
          <Img
            className='rounded-xl transform transition duration-500 hover:scale-95'
            src={src}
            alt={title}
            placeholder='blur'
            blurDataURL={src}
            width={385}
            height={h}
            quality={50}
            priority
          />
        </a>
      </Link>
    </div>
  )
}
