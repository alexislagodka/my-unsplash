import React from 'react'
import styles from './Admin.module.scss'

export default function AdminMenu ({ user, logout, changeEmail, changePassword, deleteAccount }) {
  return (
    <div className={styles.adminMain}>
      <h2>Hello '{user && user.email}'</h2>
      <div className={styles.adminActions}>
        <button className={styles.actionButton} onClick={logout}>Log out</button>
        <button className={styles.actionButton} onClick={changeEmail}>Change email</button>
        <button className={styles.actionButton} onClick={changePassword}>Change password</button>
        <button className={styles.actionButton} onClick={deleteAccount}>Delete account</button>
      </div>
    </div>
  )
}
