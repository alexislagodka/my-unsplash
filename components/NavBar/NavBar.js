import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import logo from '../../public/my_unsplash_logo.svg'
import Modal from '../Modal/Modal'
import Admin from '../Admin/Admin'
import AddForm from '../Forms/AddForm'
import LoginForm from '../Forms/LoginForm'
import ButtonAdmin from '../Buttons/ButtonAdmin'

import { useRouter } from 'next/router'

import {
  getAuth,
  onAuthStateChanged
} from 'firebase/auth'

export default function NavBar () {
  const [text, setText] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [showAdmin, setShowAdmin] = useState(false)
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
      }
    }
  }

  return (
    <nav className='w-full pt-6 max-w-7xl mx-auto pt-12 pb-6 px-4 sm:px-6 lg:px-8'>
      {user && <ButtonAdmin handleClick={() => setShowAdmin(true)}>&#xE853; Profile</ButtonAdmin>}
      <div className='md:flex justify-between items-center'>
        <div className='md:flex justify-center items-center md:justify-start w-full'>
          <div className='p-6'>
            <div className='relative h-8 md:w-40'>
              <Link href='/' className='h-8'>
                <a>
                  <Image src={logo} alt='logo' layout='fill' />
                </a>
              </Link>
            </div>
          </div>
          <div className='py-2 w-full md:max-w-lg'>
            <input
              className='w-full'
              type='text'
              placeholder='&#xE8B6; Search by name'
              onChange={(e) => setText(e.target.value)}
              onKeyUp={handleKeyUp}
            />
          </div>
        </div>
        <div className='flex w-full md:w-40 justify-center align-center py-2'>
          <button className='addButton' onClick={() => setShowForm(true)}>Add a photo</button>
        </div>
      </div>
      {
        showForm &&
          <Modal handleClose={() => setShowForm(false)}>
            {user
              ? <AddForm handleCancel={() => setShowForm(false)} />
              : <LoginForm handleCancel={() => setShowForm(false)} />}
          </Modal>

      }
      {
        showAdmin &&
          <Modal show={showAdmin} handleClose={() => setShowAdmin(false)} admin>
            <Admin handleCancel={() => setShowAdmin(false)} />
          </Modal>
      }
    </nav>
  )
}
