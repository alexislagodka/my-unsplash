import React, { useEffect, useRef, useState } from 'react'

export default function Modal ({ children, handleClose, admin }) {
  // const showHideStyle = show ? 'block' : 'hidden'
  const ref = useRef()
  const [isMenuOpen, setIsMenuOpen] = useState(true)

  useEffect(() => {
    const checkIfClickedOutside = e => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
        setIsMenuOpen(false)
        handleClose()
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)

    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside)
    }
  }, [isMenuOpen])

  return (
    <div className='modal'>
      <section ref={ref} className={`modalMain ${admin && 'adminZone'}`}>
        {children}
      </section>
    </div>
  )
}
