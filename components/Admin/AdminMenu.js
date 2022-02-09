import React from 'react'

export default function AdminMenu ({ user, logout, changeEmail, changePassword, deleteAccount, handleCancel }) {
  return (
    <div className='grid'>
      <div className='flex justify-between items-center pb-2 overflow-auto'>
        <h2>Hello {user && user.email}</h2>
      </div>
      <div className='grid gap-2'>
        <button className='adminActionButton' onClick={logout}>&#xE9BA; Log out</button>
        <button className='adminActionButton' onClick={changeEmail}>&#xE0BE; Change email</button>
        <button className='adminActionButton' onClick={changePassword}>&#xF042; Change password</button>
        <button className='adminActionButton' onClick={deleteAccount}>&#xE510; Delete account</button>
      </div>
    </div>
  )
}
