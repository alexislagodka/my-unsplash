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
        <meta http-equiv='X-UA-Compatible' content='IE=edge' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <link rel='icon' href='/my_unsplash_logo.svg' />
        <link rel='stylesheet' href='https://pro.fontawesome.com/releases/v5.10.0/css/all.css' integrity='sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p' />
      </Head>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
