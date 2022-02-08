import React, { useState } from 'react'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import Loader from '../Loader/Loader'
import AdminMenu from './AdminMenu'
import ChangeEmail from '../Forms/ChangeEmail'
import ChangePassword from '../Forms/ChangePassword'
import DeleteAccount from '../Forms/DeleteAccount'

export default function Admin ({ handleCancel }) {
  const [action, setAction] = useState('')
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)
  const auth = getAuth()

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user)
    } else {
      setUser(null)
    }
  })

  const logout = () => {
    setLoading(true)
    const auth = getAuth()
    signOut(auth).then(() => {
      setLoading(false)
    }).catch((error) => {
      setLoading(false)
      console.log(error)
    })
    handleCancel()
  }
  let component
  switch (action) {
    case 'changeEmail':
      component = <ChangeEmail handleCancel={() => setAction('')} />
      break
    case 'changePassword':
      component = <ChangePassword handleCancel={() => setAction('')} />
      break
    case 'deleteAccount':
      component = <DeleteAccount handleCancel={() => setAction('')} />
      break
    default:
      component = (
        <AdminMenu
          user={user}
          logout={logout}
          changeEmail={() => setAction('changeEmail')}
          changePassword={() => setAction('changePassword')}
          deleteAccount={() => setAction('deleteAccount')}
          handleCancel={() => handleCancel()}
        />
      )
  }
  if (loading) return <div style={{ textAlign: 'center' }}><Loader /></div>
  return (
    <div>
      {
        user
          ? component
          : <h2>Sorry you are not connected.</h2>
    }
    </div>
  )
}
