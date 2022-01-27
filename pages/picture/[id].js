import React from 'react'
import Image from 'next/image'
import db from '../../utils/firebase'
import { get, ref, child } from 'firebase/database'
import Link from 'next/link'

export default function Picture({picture}) {
  return <>
    <main>
      <Link href='/'>
        <a>Revenir à l'accueil</a>
      </Link>
      <div>
        <Image
          src={picture.src}
          layout='fill'
          alt={picture.title}
          placeholder='blur'
          blurDataURL={picture.src}
        />
      </div>
      
    </main>
  </>;
}

export async function getServerSideProps ({params}) { // Pré-rendu avec récupération de données côté serveur
  const res = await get(child(ref(db), `${params.id}`))
  const picture = await res.val()

  return {
    props: {
      picture
    }
  }
}
