import React, { useState, useEffect } from 'react'

export default function ButtonAdmin ({ handleClick }) {
  const [show, setShow] = useState(true)
  let lastScrollY = 0

  const controlNavbar = () => {
    if (window.scrollY >= lastScrollY) {
      setShow(false)
    } else {
      setShow(true)
    }
    lastScrollY = window.scrollY
  }

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar)
    return () => {
      window.removeEventListener('scroll', controlNavbar)
    }
  })

  const fadeInClass = 'translate-y duration-300'
  const fadeOutClass = '-translate-y-12 duration-300'

  return (
    <button
      className={`
  adminZone
  rounded-none
  fixed
  top-0
  left-0
  right-0
  z-10
  h-12
  opacity-75
  ${show ? fadeInClass : fadeOutClass}
  `}
      onClick={handleClick}
    >&#xE853; Profile
    </button>
  )
}
