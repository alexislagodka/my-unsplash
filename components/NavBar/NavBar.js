import React, { useState } from 'react'
import withFirebase from '../../hoc/withFirebase'
import Image from 'next/image'
import Link from 'next/link'
import logo from '../../public/my_unsplash_logo.svg'
import Modal from '../Modal/Modal'
import Admin from '../Admin/Admin'
import AddForm from '../Forms/AddForm'
import LoginForm from '../Forms/LoginForm'
import ButtonAdmin from '../Buttons/ButtonAdmin'

import { useRouter } from 'next/router'

const NavBar = ({ user }) => {
  const [text, setText] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [showAdmin, setShowAdmin] = useState(false)

  const router = useRouter()

  const handleKeyUp = event => {
    if (event.key === 'Enter') {
      if (text !== '') {
        router.push(`/search?name=${text}`)
      }
    }
  }

  let renderAddForm
  if (user) {
    if (user.emailVerified) {
      renderAddForm = <AddForm handleCancel={() => setShowForm(false)} />
    } else {
      renderAddForm = <div>A email was send to {user.email}. Please verify your email to add pictures.</div>
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
            {
              user
                ? renderAddForm
                : <LoginForm handleCancel={() => setShowForm(false)} />
            }
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

const WrappedComponent = withFirebase(NavBar)

export default WrappedComponent
