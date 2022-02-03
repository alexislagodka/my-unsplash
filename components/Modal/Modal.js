import React from 'react'
import styles from './Modal.module.scss'

export default function Modal ({ show, children, admin }) {
  const showHideStyle = show ? 'block' : 'none'

  return (
    <div className={styles.modal} style={{ display: showHideStyle }}>
      <section className={styles.modalMain} style={{ backgroundColor: admin && '#ab61ff' }}>
        {children}
      </section>
    </div>
  )
}
