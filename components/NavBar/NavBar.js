import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './NavBar.module.scss'
import logo from '../../public/my_unsplash_logo.svg'
import Modal from '../Modal/Modal'
import AddForm from '../Forms/AddForm'
import LoginForm from '../Forms/LoginForm'

import { useRouter } from 'next/router'

import {
  getAuth,
  onAuthStateChanged
} from 'firebase/auth'

export default function NavBar () {
  const [text, setText] = useState('')
  const [show, setShow] = useState(false)
  const [user, setUser] = useState(null)

  const router = useRouter()

  // Handle Auth
  const auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user)
    } else {
      setUser(null)
    }
  })

  const handleKeyUp = event => {
    if (event.key === 'Enter') {
      if (text !== '') {
        router.push(`/search?name=${text}`)
        router.reload()
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
        <button className={styles.button} onClick={() => setShow(true)}>Add photo</button>
      </div>
      <Modal show={show} handleClose={() => setShow(false)}>
        {
          user
            ? <AddForm handleCancel={() => setShow(false)} />
            : <LoginForm handleCancel={() => setShow(false)} />
        }

      </Modal>
    </div>
  )
}
