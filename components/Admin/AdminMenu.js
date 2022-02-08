import React from 'react'

export default function AdminMenu ({ user, logout, changeEmail, changePassword, deleteAccount, handleCancel }) {
  return (
    <div className='grid'>
      <div className='flex justify-between items-center pb-2 overflow-auto'>
        <h2>Hello &apos;{user && user.email}&apos;</h2>
        <button className='closeAdminButton' onClick={() => handleCancel()}>X</button>
      </div>
      <div className='grid gap-2'>
        <button className='adminActionButton' onClick={logout}>Log out</button>
        <button className='adminActionButton' onClick={changeEmail}>Change email</button>
        <button className='adminActionButton' onClick={changePassword}>Change password</button>
        <button className='adminActionButton' onClick={deleteAccount}>Delete account</button>
      </div>
    </div>
  )
}
