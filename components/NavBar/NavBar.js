import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './NavBar.module.scss'
import logo from '../../public/my_unsplash_logo.svg'

import { useRouter } from 'next/router'

export default function NavBar ({ searchPicture, showModal }) {
  const [text, setText] = useState('')

  const router = useRouter()

  const handleKeyUp = event => {
    if (event.key === 'Enter') {
      if (text !== '') {
        router.push(`/search?title=${text}`)
      }
    }
  }

  return (
    <div className={styles.navBarContainer}>
      <div className={styles.navBar}>
        <Link href='/'>
          <a>
            <Image src={logo} alt='logo' />
          </a>
        </Link>
        <input
          className={styles.searchInput}
          type='text'
          placeholder='&#xE8B6; Search by name'
          onChange={(e) => setText(e.target.value)}
          onKeyUp={handleKeyUp}
        />
        <button className={styles.button}>Add photo</button>
      </div>
    </div>
  )
}
