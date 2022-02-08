import React from 'react'
import Head from 'next/head'
import Navbar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'

export default function Layout ({ children }) {
  return (
    <div className='w-full h-full'>
      <Head>
        <title>My unsplash</title>
        <meta name='description' content='My unsplash app' />
        <link rel='icon' href='/favicon.ico' />
        <link rel='stylesheet' href='https://pro.fontawesome.com/releases/v5.10.0/css/all.css' integrity='sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p' />
      </Head>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
