import React from 'react'
import styles from './Modal.module.scss'

export default function Modal ({ show, children }) {
  const showHideStyle = show ? 'block' : 'none'

  return (
    <div className={styles.modal} style={{ display: showHideStyle }}>
      <section className={styles.modalMain}>
        {children}
      </section>
    </div>
  )
}
