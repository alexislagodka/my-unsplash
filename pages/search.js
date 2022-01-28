import React from 'react'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import CardList from '../components/CardList/CardList'
import db from '../utils/firebase'
import { orderByKey, ref, get, query } from 'firebase/database'

export default function search() {

  const [pictures, setPictures] = useState([])

  const title = useRouter().query.title

  useEffect(() => {
    if (title) {
        console.log('Search : '+ title)
        
        const picturesWithTitle = query(ref(db), orderByKey())
        get(picturesWithTitle)
        .then(snapshot => {
            const picturesData = snapshot.val()
            const pictures = Object.entries(picturesData).map( pics => {
                return pics
              })
            let result = []
            pictures.forEach(pic => {
                const picTitle = pic[1].title
                if(picTitle){
                    if(picTitle.toLowerCase().includes(title.toLowerCase())) result.push(pic)
                }
            })
            console.log(result)
            
            setPictures(result)
        })
    }
  }, [title])




  return <Layout>
  {console.log(pictures)}
    <main>
        {
          pictures.length !== 0 ? <CardList pictures={pictures} />
          :
          <h2>No pictures found.</h2>
        }
        </main>
  </Layout>
}
